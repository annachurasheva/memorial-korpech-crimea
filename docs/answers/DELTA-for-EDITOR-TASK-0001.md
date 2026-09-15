Приветствую, Анна. Писарь прав — моё ТЗ не учитывало реальную архитектуру проекта. Даю точные ответы:

## ✅ Ответы на вопросы писаря

### 1. Многоязычность (i18n)
**Адаптировать под архитектуру i18n.** Все страницы должны быть внутри `src/pages/[...lang]/`:

```
src/pages/[...lang]/
├── memorial/
│   └── index.astro
├── memorial/
│   └── card/
│       └── [slug].astro
└── memorials/
    └── index.astro
```

Это создаст маршруты:
- `/ru/memorial/`, `/en/memorial/`
- `/ru/memorial/card/badalov-g-i-551267195/`
- `/ru/memorials/`

### 2. Лейаут
**Использовать существующий `Layout.astro`** из `src/layouts/Layout.astro`:

```astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout>
  <h1>Мемориал павших</h1>
</Layout>
```

### 3. content.config.ts
**Адаптировать под текущий синтаксис** с `loader: glob()`:

```typescript
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { allLocales } from '@/config';

const fallen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fallen' }),
  schema: z.object({
    // required
    id: z.string(),
    slug: z.string(),
    status: z.enum(['inbox', 'processed', 'rejected']),
    description: z.string(),
    
    // i18n (обязательно для многоязычности)
    lang: z.enum(['', ...allLocales]).optional().default(''),
    
    // person data
    person: z.object({
      last_name: z.string(),
      first_name: z.string(),
      middle_name: z.string().optional(),
      birth_year: z.number().nullable(),
      birth_location: z.string().optional(),
      death_date: z.string(),
      cause: z.string()
    }),
    
    // service data
    service: z.object({
      rank_raw: z.string(),
      rank_norm: z.string(),
      unit_raw: z.string(),
      unit_norm: z.string(),
      unit_id: z.string()
    }),
    
    // burial data
    burial: z.object({
      primary_norm: z.string(),
      current_norm: z.string().optional(),
      current_status: z.string().optional()
    }),
    
    // relatives (optional)
    relatives: z.array(z.object({
      name: z.string(),
      address: z.string().optional(),
      relationship: z.string().nullable()
    })).optional(),
    
    // identification
    identification: z.object({
      status: z.enum(['named', 'unnamed']),
      source: z.string()
    }),
    
    // memorialization
    memorialization: z.object({
      status: z.enum(['pending', 'in-progress', 'completed', 'not-applicable']),
      type: z.enum(['korpech-grave', 'korpech-plate', 'other-memorial', 'kerch-tribute']).nullable(),
      location: z.string().optional(),
      plate_number: z.string().optional(),
      engraved: z.boolean(),
      engraved_date: z.string().nullable(),
      notes: z.string().optional()
    }),
    
    // awards (optional)
    awards: z.array(z.object({
      title: z.string(),
      date: z.string().nullable(),
      status: z.enum(['proposed', 'confirmed', 'awarded'])
    })).optional(),
    
    // photos
    photo: z.array(z.string()).optional(),
    
    // sources
    sources: z.array(z.object({
      org: z.string(),
      url: z.string()
    })),
    
    // supplements (optional)
    supplements: z.array(z.object({
      org: z.string(),
      data: z.string(),
      status: z.enum(['queue', 'approved', 'declined'])
    })).optional(),
    
    // optional fields
    admin_word: z.string().optional()
  })
});

const memorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memorials' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    status: z.enum(['active', 'inactive', 'planned']),
    lang: z.enum(['', ...allLocales]).optional().default('')
  })
});

export const collections = { posts, about, fallen, memorials };
```

---

## 📋 ОБНОВЛЁННОЕ ТЗ ДЛЯ ПИСАРЯ

```text
РОЛЬ: Ты — исполнитель примитивных задач проекта memorial-korpech-crimea.
Архитектура описана в QWEN.md (раздел 1) и ADR-02 (docs/decisions/02-memorial-architecture.md).

ЗАДАЧА: Создать скелет Второго Слоя (коллекция fallen) БЕЗ бизнес-логики.
Сборку НЕ запускать. Коммиты НЕ делать. Результат — список созданных файлов.

=== ЧАСТЬ 1. СХЕМА КОЛЛЕКЦИИ ===

Добавить в src/content.config.ts коллекции fallen и memorials (см. код выше).
Добавить их в export const collections.

=== ЧАСТЬ 2. СТРАНИЦЫ-ЗАГЛУШКИ ===

src/pages/[...lang]/memorial/index.astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout>
  <h1>Мемориал павших</h1>
  <p>Заглушка. Точка входа во Второй Слой.</p>
</Layout>

src/pages/[...lang]/memorial/card/[slug].astro
---
import Layout from '@/layouts/Layout.astro';
const { slug } = Astro.params;
---
<Layout>
  <h1>Карточка {slug}</h1>
  <p>Заглушка.</p>
</Layout>

src/pages/[...lang]/memorials/index.astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout>
  <h1>Справочник мемориалов</h1>
  <p>Заглушка. Три поля вносит Anna-Ch вручную.</p>
</Layout>

=== ЧАСТЬ 3. ПРИМЕРЫ КАРТОЧЕК (3 штуки) ===

src/content/fallen/551267195.md
---
id: "551267195"
slug: "badalov-g-i-551267195"
status: processed
lang: ""
description: "Герой Бадалов Г.И. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно."
person:
  last_name: Бадалов
  first_name: Григорий
  middle_name: Иванович
  birth_year: null
  birth_location: "Азербайджанская ССР, г. Кадабек"
  death_date: "1942-03-19"
  cause: убит
service:
  rank_raw: политрук
  rank_norm: Политрук
  unit_raw: скф 398 сд 826 сп
  unit_norm: СКФ 398 сд 826 сп
  unit_id: unit-398-sd-826-sp
burial:
  primary_norm: крымская-асср-ленинский-р-н-с-корпечь
  current_norm: мемориал-корпечь
  current_status: "уточняется"
relatives: []
identification:
  status: named
  source: ЦАМО
memorialization:
  status: pending
  type: korpech-grave
  location: "Мемориал Корпечь, сектор Б, ряд 2"
  plate_number: "Б-2-47"
  engraved: false
  engraved_date: null
  notes: "Ожидает переиздания мемориала"
sources:
  - org: ОБД Мемориал
    url: https://obd-memorial.ru/html/info.htm?id=551267195
---

## Герой Бадалов Григорий Иванович

> [!IMPORTANT] Мемориал павших
> Восстановим справедливость — высечем его ИМЯ на камне на вечно.

(Аналогично для 551267196 и 551267199)

=== ЧАСТЬ 4. ПАПКА ФОТО ===

public/photos/551267195/.gitkeep
public/photos/551267196/.gitkeep
public/photos/551267199/.gitkeep

=== ЧАСТЬ 5. ФАЙЛЫ КОММЕНТАРИЕВ ===

data/comments/551267195.md
data/comments/551267196.md
data/comments/551267199.md

(Содержимое как в предыдущем ТЗ)

=== ЧАСТЬ 6. README ДЛЯ СПРАВОЧНИКА МЕМОРИАЛОВ ===

src/content/memorials/README.md
(Содержимое как в предыдущем ТЗ)

=== ЧАСТЬ 7. ОЧЕРЕДЬ "РАЗБЕРИТЕСЬ!" ===

scripts/logs/clarify.queue.json
(Содержимое как в предыдущем ТЗ)

=== ЗАПРЕТЫ ===

- НЕ изменять существующие файлы темы Retypeset
- НЕ добавлять зависимости в package.json
- НЕ запускать pnpm build / dev
- НЕ создавать конвертер (это задача Кодера позднее)

=== КРИТЕРИИ ПРИЁМКИ ===

1. Коллекции fallen и memorials добавлены в src/content.config.ts с loader: glob()
2. Страницы-заглушки созданы в src/pages/[...lang]/memorial/ и memorials/
3. Три примера карточек созданы в src/content/fallen/
4. Папки для фото созданы
5. Файлы комментариев созданы
6. README для справочника мемориалов создан
7. Очередь clarify.queue.json создана

=== РЕЗУЛЬТАТ ===

Отчёт со списком созданных файлов и их путями.
```

---

## ✅ Следующий шаг

Передайте это обновлённое ТЗ писарю. После выполнения:

1. Я ревизую результат
2. Вы переносите в репозиторий, коммитите
3. Я выдаю задачи Кодеру