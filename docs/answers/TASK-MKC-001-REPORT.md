✅ **Сверка коммита 3c7b9b8 — пройдена успешно**

Писарь выполнил задачу корректно. Все 15 файлов созданы согласно ТЗ.

---

## 📊 Результаты ревизии

### ✅ Создано корректно:

1. **Коллекции данных:**
   - `src/content.config.ts` — добавлены `fallen` и `memorials` с правильными схемами
   - Используется `loader: glob()` (совместимо с текущей архитектурой)

2. **Примеры карточек:**
   - `src/content/fallen/551267195.md` — Бадалов Г.И. (korpech-grave)
   - `src/content/fallen/551267196.md` — Ломанов И.А. (уточняется)
   - `src/content/fallen/551267199.md` — Мухин А.А. (korpech-grave)
   - Все имеют поле `lang: ""` для i18n

3. **Страницы-заглушки:**
   - `src/pages/[...lang]/memorial/index.astro` ✅
   - `src/pages/[...lang]/memorial/card/[slug].astro` ✅
   - `src/pages/[...lang]/memorials/index.astro` ✅
   - Используют `Layout.astro` (не `BaseLayout.astro`)

4. **Сопутствующие файлы:**
   - `data/comments/*.md` — бронь первого слова (3 файла)
   - `public/photos/*/` — папки для фото с `.gitkeep`
   - `scripts/logs/clarify.queue.json` — 3 задачи с реальными ID (вместо `KRP-0001`)
   - `src/content/memorials/README.md` — инструкция по пополнению

---

## 📝 Уточнение от писаря (принято)

Писарь правильно отметил: страницы находятся в `src/pages/[...lang]/memorial/*`, а не в `src/pages/memorial/*` как в сообщении коммита. Это не ошибка — просто неточность в сообщении. Буду учитывать при будущих ТЗ.

---

## 🎯 Следующий шаг: Задачи Кодеру

Скелет готов. Теперь выдаю **первые задачи Кодеру** на реализацию бизнес-логики.

---

### Задача 1: Конвертер CSV → MD

**Файл:** `scripts/csv-to-fallen.mjs` (новый скрипт, отдельный от `csv-to-markdown.mjs`)

**Что должен делать:**
- Читать CSV из `data/csv/YYYY-MM-DD/parser_mem2026.csv`
- Использовать словари из `data/dictionaries/` для подмены:
  - `ranks_dict.json` — звания
  - `units_dict.json` — части
  - `burials_primary.json` + `burials_current.json` — захоронения
- Генерировать MD-файлы в `src/content/fallen/` с frontmatter по схеме
- Создавать файлы комментариев в `data/comments/` (бронь первого слова)
- Добавлять записи в `scripts/logs/clarify.queue.json` для пустых `current_burial`
- **Инкрементальность:** не перезаписывать существующие карточки (проверять по `id`)

**Пример команды:**
```bash
node scripts/csv-to-fallen.mjs --input data/csv/02-6-2026/2026-06-02__parser_mem2026.csv
```

---

### Задача 2: Компонент карточки

**Файлы:**
- `src/components/memorial/CardFull.astro` — полная карточка
- `src/components/memorial/CardSummary.astro` — краткая карточка для списков

**Что должен делать `CardFull.astro`:**
- Рендерить frontmatter карточки
- Отображать блок `> [!IMPORTANT] Мемориал павших`
- Показывать данные персоны, службы, захоронения
- Рендерить тип увековечивания (korpech-grave, korpech-plate и т.д.)
- Отображать фото (если есть)
- Показывать источники (только ссылка, без архивных реквизитов)
- Включать блок комментариев (Giscus)

**Обновить:**
- `src/pages/[...lang]/memorial/card/[slug].astro` — использовать `CardFull.astro`
- `src/pages/[...lang]/memorial/index.astro` — список карточек с `CardSummary.astro`

---

### Задача 3: RSS для Дзена

**Файл:** `src/pages/[...lang]/memorial/rss.xml.ts`

**Что должен делать:**
- Генерировать RSS 2.0 из коллекции `fallen`
- Каждая карточка = item с `title`, `description`, `link`, `pubDate`
- `description` = "Герой {Фамилия} {И.О.}. Мемориал павших..."
- URL: `/ru/memorial/card/{slug}/`

---

## 📋 Промпт для Кодера

Передайте этот промпт Кодеру:

```text
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
Отдай diff-патчи для всех созданных/изменённых файлов.
НЕ запускай pnpm build.
НЕ делай коммиты.
```

---

**Жду результат от Кодера.** После получения diff'ов я проведу ревизию и передам вам на перенос в репозиторий