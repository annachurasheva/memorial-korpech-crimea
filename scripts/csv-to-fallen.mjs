--- scripts/csv-to-fallen.mjs (原始)


+++ scripts/csv-to-fallen.mjs (修改后)
/**
 * ФАЙЛ: scripts/csv-to-fallen.mjs
 * СТАТУС: реализация TASK-0002 rev.3
 *
 * Назначение:
 *  1. Читает ВСЕ файлы *.csv из папки data/csv/
 *  2. Извлекает номер части из unit_raw (паттерн: \d{1,4}\s*(сп|сд|ап|...))
 *  3. Формирует unit_id = "unit-{номер}-{тип}" (например, unit-826-сп)
 *  4. При отсутствии ключа в units_dict.json: unit_norm = raw, unit_id = транслит-slug
 *  5. Логирует не-войсковые записи в scripts/logs/processing.log с пометкой "needs_manual_review"
 *  6. Использует units_registry.json для unit_url
 *  7. Батч: не более 20 новых карточек за прогон
 */
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DIRS = {
  csv: path.join(ROOT, 'data', 'csv'),
  dictionaries: path.join(ROOT, 'data', 'dictionaries'),
  output: path.join(ROOT, 'src', 'content', 'fallen'),
  logs: path.join(ROOT, 'scripts', 'logs'),
};

const FILES = {
  unitsDict: path.join(DIRS.dictionaries, 'units_dict.json'),
  unitsRegistry: path.join(DIRS.dictionaries, 'units_registry.json'),
  ranksDict: path.join(DIRS.dictionaries, 'ranks_dict.json'),
  processingLog: path.join(DIRS.logs, 'processing.log'),
  errorsJson: path.join(DIRS.logs, 'errors.json'),
};

// Паттерн для извлечения номера и типа части
const UNIT_PATTERN = /(\d{1,4})\s*(сп|сд|ап|тп|тап|гап|сап|мсп|мсб|тбр|сбр|абр|оп|об|ор|рота|батальон|полк|дивизия|бригада|бао|оад|озад|минп|пулеметн|броне|мото|танковый|арт|минбатр|пб|сапбатр|отд|отдельный|иптад|птап|зенап|зад|пао|шао|бао|уак|укр|ур|отд\. броне\. рота|отд\. мото\. мех\. полк|отд\. сап\. бат\.|отд\. бат\. связи|отд\. рота связи|лбс|олбс|опс|ппс|в/ч|эр|тб|аб|минд|гсп|гсд|пс|омсб|мсбр|тд|мд|ад|сд|гв\.|гвардейский)/i;

// Транслитерация для slug
function translit(str) {
  const ru = 'А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я-.';
  const en = 'A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-''-Y-y-''-E-e-YU-yu-YA-ya-';
  const arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    const index = ru.indexOf(arr[i]);
    if (index !== -1) {
      arr[i] = en.split('-')[index];
    }
  }
  return arr.join('').toLowerCase().replace(/[^a-z0-9\-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Загрузка JSON файлов
async function loadJSON(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    console.warn(`Не удалось загрузить ${filePath}: ${e.message}`);
    return {};
  }
}

// Извлечение unit_id из unit_raw
function extractUnitId(unitRaw) {
  const match = unitRaw.match(UNIT_PATTERN);
  if (match) {
    const number = match[1];
    const typeRaw = match[2].toLowerCase();

    // Нормализация типа
    const typeMap = {
      'сп': 'sp', 'сд': 'sd', 'ап': 'ap', 'тп': 'tp', 'тап': 'tap',
      'гап': 'gap', 'сап': 'sap', 'мсп': 'msp', 'мсб': 'msb',
      'тбр': 'tbr', 'сбр': 'sbr', 'абр': 'abr', 'оп': 'op',
      'об': 'ob', 'ор': 'or', 'рота': 'rota', 'батальон': 'bat',
      'полк': 'polk', 'дивизия': 'div', 'бригада': 'brig',
      'бао': 'bao', 'оад': 'oad', 'озад': 'ozad', 'минп': 'minp',
      'пулеметн': 'pulem', 'броне': 'brone', 'мото': 'moto',
      'танковый': 'tank', 'арт': 'art', 'минбатр': 'minbatr',
      'пб': 'pb', 'сапбатр': 'sapbatr', 'отд': 'otd', 'отдельный': 'otd',
      'иптад': 'iptad', 'птап': 'ptap', 'зенап': 'zenap', 'зад': 'zad',
      'пао': 'pao', 'шао': 'shao', 'уак': 'uak', 'укр': 'ukr', 'ур': 'ur',
      'гсп': 'gsp', 'гсд': 'gsd', 'пс': 'ps', 'омсб': 'omsb', 'мсбр': 'msbr',
      'тд': 'td', 'мд': 'md', 'ад': 'ad', 'гв.': 'gv', 'гвардейский': 'gv',
      'тб': 'tb', 'аб': 'ab', 'минд': 'mind', 'ера': 'er', 'эр': 'er'
    };

    const type = typeMap[typeRaw] || translit(typeRaw);
    return `unit-${number}-${type}`;
  }
  return null;
}

// Проверка на не-войсковую запись
function isNonMilitaryUnit(unitRaw) {
  const nonMilitaryPatterns = [
    /военюрист/i, /военврач/i, /ветсанитар/i, /переводчик/i,
    /интендант/i, /писарь/i, /повар/i, /шофер/i, /водитель/i,
    /склад/i, /госпиталь/i, /медсанбат/i, /лазарет/i,
    /комендатура/i, /штаб/i, /управление/i, /отдел/i,
    /служба/i, /хозяйство/i, /мастерская/i, /автопарк/i
  ];
  return nonMilitaryPatterns.some(pattern => pattern.test(unitRaw));
}

// Логирование
async function logMessage(logFile, message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  try {
    await mkdir(path.dirname(logFile), { recursive: true });
    await writeFile(logFile, line, { flag: 'a' });
  } catch (e) {
    console.error(`Ошибка записи лога: ${e.message}`);
  }
}

// Парсинг CSV строки
function parseCSVLine(line) {
  // Простой парсер для CSV с кавычками
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

// Основная функция конвертации
async function convert() {
  console.log('Запуск csv-to-fallen.mjs...');

  // Загрузка словарей
  const unitsDict = await loadJSON(FILES.unitsDict);
  const unitsRegistry = await loadJSON(FILES.unitsRegistry);
  const ranksDict = await loadJSON(FILES.ranksDict);

  let processedCount = 0;
  let errorCount = 0;
  const errors = [];

  // Получение списка CSV файлов
  let csvFiles = [];
  try {
    const entries = await readdir(DIRS.csv, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.csv')) {
        csvFiles.push(path.join(DIRS.csv, entry.name));
      } else if (entry.isDirectory()) {
        const subEntries = await readdir(path.join(DIRS.csv, entry.name));
        for (const subEntry of subEntries) {
          if (subEntry.endsWith('.csv')) {
            csvFiles.push(path.join(DIRS.csv, entry.name, subEntry));
          }
        }
      }
    }
  } catch (e) {
    console.error(`Ошибка чтения папки CSV: ${e.message}`);
    return;
  }

  console.log(`Найдено CSV файлов: ${csvFiles.length}`);

  // Обработка каждого файла
  for (const csvFile of csvFiles) {
    console.log(`Обработка файла: ${csvFile}`);

    let content;
    try {
      content = await readFile(csvFile, 'utf-8');
    } catch (e) {
      console.error(`Ошибка чтения ${csvFile}: ${e.message}`);
      continue;
    }

    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('<!--'));
    if (lines.length < 2) continue;

    // Первая строка - заголовок
    const headers = parseCSVLine(lines[0]);
    console.log(`Заголовки: ${headers.join(', ')}`);

    // Обработка строк данных (батч не более 20)
    let batchCount = 0;
    const MAX_BATCH = 20;

    for (let i = 1; i < lines.length && batchCount < MAX_BATCH; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length < headers.length) continue;

      const row = {};
      headers.forEach((header, idx) => {
        row[header.trim()] = values[idx];
      });

      // Извлечение данных
      const lastName = row['last_name'] || row['Заголовок']?.split(' ')[0] || '';
      const firstName = row['first_name'] || row['Заголовок']?.split(' ')[1] || '';
      const middleName = row['middle_name'] || row['Заголовок']?.split(' ')[2] || '';

      if (!lastName) continue;

      const rankRaw = row['rank'] || '';
      const unitRaw = row['warunit'] || '';
      const deathDate = row['date_death'] || '';
      const cause = row['cause_of_death'] || row['cause'] || '';
      const primaryBurial = row['primary_burial'] || '';
      const birthLocation = row['place_birth'] || '';
      const dateBirth = row['date_birth'] || '';
      const sourceUrl = row['primary_url'] || row['source_url'] || '';

      // Нормализация звания
      let rankNorm = ranksDict[rankRaw] || rankRaw;

      // Обработка воинской части
      let unitNorm = unitRaw;
      let unitId = extractUnitId(unitRaw);
      let unitUrl = null;
      let needsReview = false;

      // Проверка на не-войсковую запись
      if (isNonMilitaryUnit(unitRaw)) {
        needsReview = true;
        await logMessage(FILES.processingLog, `needs_manual_review: ${lastName} ${firstName} ${middleName} - ${unitRaw}`);
        console.log(`[needs_manual_review] ${lastName} ${firstName} ${middleName}: ${unitRaw}`);
      }

      // Поиск в units_dict.json
      if (unitsDict[unitRaw]) {
        unitNorm = unitsDict[unitRaw];
      }

      // Если unit_id найден в registry, добавляем unit_url
      if (unitId && unitsRegistry.units && unitsRegistry.units[unitId]) {
        unitUrl = `/memorial/units/${unitId}`;
      } else if (unitRaw && !unitId) {
        // Генерация unit_id транслитом если паттерн не найден
        unitId = translit(unitRaw);
      }

      // Генерация slug и id
      const id = row['document_id'] || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const slugBase = translit(`${lastName} ${firstName}`);
      const slug = `${slugBase}-${id}`;

      // Формирование frontmatter
      const frontmatter = {
        id: id.toString(),
        slug: slug,
        status: 'inbox',
        lang: '',
        description: `Герой ${lastName} ${firstName[0]}.${middleName ? middleName[0]+'.' : ''} Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно.`,
        person: {
          last_name: lastName,
          first_name: firstName,
          middle_name: middleName || null,
          birth_year: dateBirth ? parseInt(dateBirth.substr(0, 4)) : null,
          birth_location: birthLocation || null,
          death_date: deathDate || null,
          cause: cause || 'убит в бою'
        },
        service: {
          rank_raw: rankRaw,
          rank_norm: rankNorm,
          unit_raw: unitRaw,
          unit_norm: unitNorm,
          unit_id: unitId || translit(unitRaw),
          ...(unitUrl && { unit_url: unitUrl })
        },
        burial: {
          primary_norm: translit(primaryBurial) || null,
          current_norm: null,
          current_status: 'уточняется'
        },
        relatives: [],
        identification: {
          status: lastName ? 'named' : 'unnamed',
          source: row['nomer_fonda'] ? 'ЦАМО' : 'ОБД Мемориал'
        },
        memorialization: {
          status: 'pending',
          type: null,
          location: null,
          plate_number: null,
          engraved: false,
          engraved_date: null,
          notes: null
        },
        sources: sourceUrl ? [{ org: 'ОБД Мемориал', url: sourceUrl }] : []
      };

      // YAML форматирование
      function toYaml(obj, indent = 0) {
        const spaces = '  '.repeat(indent);
        let yaml = '';

        for (const [key, value] of Object.entries(obj)) {
          if (value === null || value === undefined) {
            yaml += `${spaces}${key}: null\n`;
          } else if (Array.isArray(value)) {
            if (value.length === 0) {
              yaml += `${spaces}${key}: []\n`;
            } else {
              yaml += `${spaces}${key}:\n`;
              for (const item of value) {
                if (typeof item === 'object') {
                  const itemLines = toYaml(item, indent + 1).trim().split('\n');
                  yaml += `${spaces}  - ${itemLines[0].replace(/^  /, '')}\n`;
                  for (let j = 1; j < itemLines.length; j++) {
                    yaml += `${spaces}    ${itemLines[j]}\n`;
                  }
                } else {
                  yaml += `${spaces}  - ${item}\n`;
                }
              }
            }
          } else if (typeof value === 'object') {
            yaml += `${spaces}${key}:\n`;
            yaml += toYaml(value, indent + 1);
          } else if (typeof value === 'string') {
            if (value.includes('\n') || value.includes(':') || value.includes('#') || value.includes('"')) {
              yaml += `${spaces}${key}: "${value.replace(/"/g, '\\"')}"\n`;
            } else {
              yaml += `${spaces}${key}: ${value}\n`;
            }
          } else {
            yaml += `${spaces}${key}: ${value}\n`;
          }
        }
        return yaml;
      }

      const yamlContent = `---\n${toYaml(frontmatter)}---\n\n## Герой ${lastName} ${firstName} ${middleName}\n\n> [!IMPORTANT] Мемориал павших\n> Восстановим справедливость — высечем его ИМЯ на камне на вечно.\n`;

      // Сохранение файла
      const outputFile = path.join(DIRS.output, `${id}.md`);
      try {
        await mkdir(DIRS.output, { recursive: true });
        await writeFile(outputFile, yamlContent, 'utf-8');
        processedCount++;
        batchCount++;
        console.log(`[OK] Создана карточка: ${outputFile}`);
      } catch (e) {
        errorCount++;
        errors.push({ file: outputFile, error: e.message });
        console.error(`[ERROR] ${outputFile}: ${e.message}`);
      }
    }

    if (batchCount >= MAX_BATCH) {
      console.log(`Достигнут лимит батча (${MAX_BATCH} карточек). Оставшиеся строки будут обработаны в следующем прогоне.`);
      await logMessage(FILES.processingLog, `Batch limit reached (${MAX_BATCH}). Remaining lines deferred.`);
    }
  }

  // Сохранение ошибок
  if (errors.length > 0) {
    try {
      await writeFile(FILES.errorsJson, JSON.stringify(errors, null, 2), 'utf-8');
    } catch (e) {
      console.error(`Ошибка записи errors.json: ${e.message}`);
    }
  }

  console.log(`\n=== Отчёт ===`);
  console.log(`Обработано карточек: ${processedCount}`);
  console.log(`Ошибок: ${errorCount}`);
  await logMessage(FILES.processingLog, `Completed: ${processedCount} processed, ${errorCount} errors`);
}

convert().catch(console.error);
