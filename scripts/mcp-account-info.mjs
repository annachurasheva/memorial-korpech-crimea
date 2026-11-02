/**
 * Временный скрипт: запускает EdgeOne MCP-сервер (stdio) и вызывает tools/call account_info.
 * Конфиг сервера читается из .vscode/msp.json, токен никуда не выводится.
 * Удалить после проверки.
 */
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const CONFIG_PATH = fileURLToPath(new URL('../.vscode/msp.json', import.meta.url))
const SERVER_KEY = process.argv[2] || 'edgeone-makers-mcp-server'
const TOOL_NAME = process.argv[3] || 'account_info'
const TOOL_ARGS = process.argv[4] ? JSON.parse(process.argv[4]) : {}

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'))
const server = config.servers[SERVER_KEY]
if (!server) {
  console.error(`Сервер "${SERVER_KEY}" не найден в msp.json. Доступны: ${Object.keys(config.servers).join(', ')}`)
  process.exit(1)
}

const child = spawn(server.command, server.args ?? [], {
  shell: process.platform === 'win32',
  env: { ...process.env, ...(server.env ?? {}) },
  stdio: ['pipe', 'pipe', 'pipe'],
})

let buffer = ''
const pending = new Map()
let nextId = 1

child.stdout.on('data', (chunk) => {
  buffer += chunk.toString()
  let idx
  while ((idx = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, idx).trim()
    buffer = buffer.slice(idx + 1)
    if (!line)
      continue
    try {
      handleMessage(JSON.parse(line))
    }
    catch (e) {
      console.error('[не-JSON строка от сервера]', line.slice(0, 200))
    }
  }
})
child.stderr.on('data', chunk => process.stderr.write(chunk))
child.on('exit', code => console.error(`[сервер завершён, код ${code}]`))

function handleMessage(msg) {
  if (msg.id && pending.has(msg.id)) {
    const resolve = pending.get(msg.id)
    pending.delete(msg.id)
    resolve(msg)
  }
}

function send(method, params, timeoutMs = 180000) {
  const id = nextId++
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`)
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id)
      reject(new Error(`Таймаут ожидания ответа на ${method} (${timeoutMs} мс)`))
    }, timeoutMs)
    pending.set(id, (msg) => {
      clearTimeout(timer)
      resolve(msg)
    })
  })
}

function notify(method, params) {
  child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`)
}

try {
  const init = await send('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'account-info-checker', version: '1.0.0' },
  })
  console.log(`Сервер: ${init.result?.serverInfo?.name ?? '?'} v${init.result?.serverInfo?.version ?? '?'}`)
  notify('notifications/initialized', {})

  const tools = await send('tools/list', {})
  const toolNames = (tools.result?.tools ?? []).map(t => t.name)
  console.log(`Доступные инструменты (${toolNames.length}): ${toolNames.join(', ')}`)

  if (!toolNames.includes(TOOL_NAME)) {
    console.error(`Инструмент "${TOOL_NAME}" не найден у сервера.`)
    process.exit(2)
  }

  const call = await send('tools/call', { name: TOOL_NAME, arguments: TOOL_ARGS })
  if (call.error) {
    console.error('Ошибка вызова:', JSON.stringify(call.error, null, 2))
    process.exit(3)
  }
  console.log('=== РЕЗУЛЬТАТ account_info ===')
  for (const item of call.result?.content ?? []) {
    if (item.type === 'text')
      console.log(item.text)
    else console.log(JSON.stringify(item))
  }
}
catch (e) {
  console.error('СБОЙ:', e.message)
  process.exitCode = 1
}
finally {
  child.kill()
  process.exit(process.exitCode ?? 0)
}
