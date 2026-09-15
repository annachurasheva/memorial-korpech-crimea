РОЛЬ: Ты — Кодер проекта memorial-korpech-crimea.
Архитектура: QWEN.md (раздел 1) + ADR-02 (docs/decisions/02-memorial-architecture.md).
Скелет Второго Слоя создан (коммит 3c7b9b8).

ЗАДАЧА 1: Конвертер CSV → MD

Создай scripts/csv-to-fallen.mjs:
- Читает CSV из data/csv/YYYY-MM-DD/parser_mem2026.csv
- Использует словари: ranks_dict.json, units_dict.json, burials_primary.json, burials_current.json
- Генерирует MD-файлы в src/content/fallen/ с frontmatter по схеме (см. существующие примеры)
- Создаёт файлы комментариев в data/comments/ (шаблон: "Эта карточка создана на основе документа ЦАМО №{id}...")
- Добавляет записи в scripts/logs/clarify.queue.json для пустых current_burial
- Инкрементальность: не перезаписывает существующие карточки (проверка по id)
- Логирование в scripts/logs/processing.log

Пример запуска:
node scripts/csv-to-fallen.mjs --input data/csv/02-6-2026/2026-06-02__parser_mem2026.csv

ЗАДАЧА 2: Компоненты карточек

Создай:
1. src/components/memorial/CardFull.astro — полная карточка
   - Рендерит frontmatter
   - Блок "> [!IMPORTANT] Мемориал павших"
   - Данные персоны, службы, захоронения
   - Тип увековечивания (korpech-grave, korpech-plate, other-memorial, kerch-tribute)
   - Фото (если есть)
   - Источники (только ссылка)
   - Giscus комментарии

2. src/components/memorial/CardSummary.astro — краткая карточка для списков
   - ФИО, звание, дата смерти
   - Ссылка на полную карточку

Обнови:
- src/pages/[...lang]/memorial/card/[slug].astro — использовать CardFull.astro
- src/pages/[...lang]/memorial/index.astro — список карточек с CardSummary.astro

ЗАДАЧА 3: RSS для Дзена

Создай src/pages/[...lang]/memorial/rss.xml.ts:
- RSS 2.0 из коллекции fallen
- Каждая карточка = item с title, description, link, pubDate
- description: "Герой {Фамилия} {И.О.}. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно."
- link: /{lang}/memorial/card/{slug}/

РЕЗУЛЬТАТ:
 
   - Запускает astro check (должен быть зелёный)
   - Запускает pnpm build (должен быть зелёный)
   
Отдай diff-патчи для всех созданных/изменённых файлов.
