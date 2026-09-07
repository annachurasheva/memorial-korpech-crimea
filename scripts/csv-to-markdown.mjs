/**
 * ФАЙЛ: scripts/csv-to-markdown.mjs
 * СТАТУС: заглушка (пустышка). Реализуется по заданию Delta-02.
 *
 * Назначение (из Delta-02):
 *  1. Читает ВСЕ файлы *.csv из папки data/csv/.
 *  2. Применяет словари подмены из data/dictionaries/ (звания, части).
 *  3. Генерирует .md файлы в src/content/posts/memorial/.
 *  4. Пишет отчёт в scripts/logs/run.log и scripts/logs/errors.json.
 *
 * Тема: Retypeset (Astro). Правила см. docs/agent-context-retypeset.md.
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DIRS = {
  csv: path.join(ROOT, 'data', 'csv'),
  dictionaries: path.join(ROOT, 'data', 'dictionaries'),
  output: path.join(ROOT, 'src', 'content', 'posts', 'memorial'),
  logs: path.join(ROOT, 'scripts', 'logs'),
};

const FILES = {
  runLog: path.join(DIRS.logs, 'run.log'),
  errorsJson: path.join(DIRS.logs, 'errors.json'),
};

// TODO: реализовать логику конвертации по заданию Delta-02.
console.log('Заглушка scripts/csv-to-markdown.mjs — реализация ожидается.');