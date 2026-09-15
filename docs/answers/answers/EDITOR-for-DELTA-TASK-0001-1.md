Ревизия выявила существенные несоответствия между ТЗ из `struktura.md` и реальной структурой проекта. Мне нужно задать уточняющие вопросы, прежде чем приступать.

Вот что я обнаружил:

**Расхождения между ТЗ (`struktura.md`) и фактическим репозиторием:**

| В ТЗ | Фактически в репо |
|---|---|
| `src/pages/memorial/index.astro`, `memorials/index.astro` — в корне `src/pages/` | Весь проект построен на **i18n-маршрутах** `src/pages/[...lang]/` (многоязычность), страницы кладутся внутрь `[...lang]/` |
| `layout: ../layouts/BaseLayout.astro` | В проекте нет `BaseLayout.astro` — есть `Layout.astro` и `Head.astro` |
| `src/content.config.ts` использует `glob({...})` loader + `defineCollection` | ТЗ предлагает `type: 'content'` и старый подход `getCollection` в `getStaticPaths`, а также `import { getCollection } from 'astro:content'` — несовместимо с текущей схемой |
| `data/comments/` — новой папки нет | Есть только `data/csv`, `data/dictionaries`, `data/settlements` |
| `scripts/logs/` | Существует папка `scripts/logs`, проверю её содержимое |

У меня также есть замечание к самому ТЗ: в примерах карточек поля `birth_year: null`, `engraved_date: null`, но в схеме `birth_year: z.number().nullable()`, а `engraved_date: z.string().nullable()` — при этом `cause: z.string()` без nullable. Это корректно, просто уточняю.

**Ключевые вопросы перед исполнением:**

1. **Многоязычность**: Проект — i18n (маршруты `[...lang]`). ТЗ указывает пути без локали (`src/pages/memorial/...`). Как поступить — создавать страницы в корне `src/pages/` (как в ТЗ) или внутри `src/pages/[...lang]/`? Следовать ТЗ дословно или адаптировать под архитектуру i18n?

2. **Лейаут**: В ТЗ указан `BaseLayout.astro`, которого нет. Использовать существующий `Layout.astro`?

3. **`content.config.ts`**: ТЗ описывает `type: 'content'` подход, но проект использует новый `loader: glob()` формат Astro. Применять подход из ТЗ (который может не работать) или адаптировать под текущий синтаксис проекта?

Пожалуйста, уточните эти три момента. Как только получу ответы — составлю план и приступлю.
