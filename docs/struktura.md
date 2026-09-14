РОЛЬ: Ты — исполнитель примитивных задач проекта memorial-korpech-crimea.
Архитектура описана в QWEN.md (раздел 1) и ADR-02 (docs/decisions/02-memorial-architecture.md).

ЗАДАЧА: Создать скелет Второго Слоя (коллекция fallen) БЕЗ бизнес-логики.
Сборку НЕ запускать. Коммиты НЕ делать. Результат — список созданных файлов.

=== ЧАСТЬ 1. СХЕМА КОЛЛЕКЦИИ ===

Добавить в src/content.config.ts схему коллекции fallen:

import { z, defineCollection } from 'astro:content';

const fallenCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    status: z.enum(['inbox', 'processed', 'rejected']),
    admin_word: z.string().optional(),
    description: z.string(),
    person: z.object({
      last_name: z.string(),
      first_name: z.string(),
      middle_name: z.string().optional(),
      birth_year: z.number().nullable(),
      birth_location: z.string().optional(),
      death_date: z.string(),
      cause: z.string()
    }),
    service: z.object({
      rank_raw: z.string(),
      rank_norm: z.string(),
      unit_raw: z.string(),
      unit_norm: z.string(),
      unit_id: z.string()
    }),
    burial: z.object({
      primary_norm: z.string(),
      current_norm: z.string().optional(),
      current_status: z.string().optional()
    }),
    relatives: z.array(z.object({
      name: z.string(),
      address: z.string().optional(),
      relationship: z.string().nullable()
    })).optional(),
    identification: z.object({
      status: z.enum(['named', 'unnamed']),
      source: z.string()
    }),
    memorialization: z.object({
      status: z.enum(['pending', 'in-progress', 'completed', 'not-applicable']),
      type: z.enum(['korpech-grave', 'korpech-plate', 'other-memorial', 'kerch-tribute']).nullable(),
      location: z.string().optional(),
      plate_number: z.string().optional(),
      engraved: z.boolean(),
      engraved_date: z.string().nullable(),
      notes: z.string().optional()
    }),
    awards: z.array(z.object({
      title: z.string(),
      date: z.string().nullable(),
      status: z.enum(['proposed', 'confirmed', 'awarded'])
    })).optional(),
    photo: z.array(z.string()).optional(),
    sources: z.array(z.object({
      org: z.string(),
      url: z.string()
    })),
    supplements: z.array(z.object({
      org: z.string(),
      data: z.string(),
      status: z.enum(['queue', 'approved', 'declined'])
    })).optional()
  })
});

export const collections = {
  posts: postsCollection, // существующая коллекция темы
  fallen: fallenCollection,
  // memorials: memorialsCollection (добавим позднее)
};

=== ЧАСТЬ 2. СТРАНИЦЫ-ЗАГЛУШКИ ===

src/pages/memorial/index.astro
---
title: "Мемориал Корпечь"
layout: ../layouts/BaseLayout.astro
---
<h1>Мемориал павших</h1>
<p>Заглушка. Точка входа во Второй Слой.</p>

src/pages/memorial/card/[slug].astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  return []; // заглушка, бизнес-логика позднее
}

const { slug } = Astro.params;
---
<h1>Карточка {slug}</h1>
<p>Заглушка.</p>

src/pages/memorials/index.astro
---
title: "Справочник мемориалов Крыма"
layout: ../layouts/BaseLayout.astro
---
<h1>Справочник мемориалов</h1>
<p>Заглушка. Три поля вносит Anna-Ch вручную.</p>

=== ЧАСТЬ 3. ПРИМЕРЫ КАРТОЧЕК (3 штуки) ===

src/content/fallen/551267195.md
---
id: "551267195"
slug: "badalov-g-i-551267195"
status: processed
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

src/content/fallen/551267196.md
---
id: "551267196"
slug: "lomanov-i-a-551267196"
status: processed
description: "Герой Ломанов И.А. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно."
person:
  last_name: Ломанов
  first_name: Иван
  middle_name: Алексеевич
  birth_year: null
  birth_location: "Горьковская обл., Муромский р-н, с. Кавардицы"
  death_date: "1942-03-21"
  cause: убит
service:
  rank_raw: лейтенант
  rank_norm: Лейтенант
  unit_raw: скф 398 сд 826 сп
  unit_norm: СКФ 398 сд 826 сп
  unit_id: unit-398-sd-826-sp
burial:
  primary_norm: крымская-асср-ленинский-р-н-ак-монайский-с-с-с-ак-монай
  current_norm: null
  current_status: "уточняется"
relatives: []
identification:
  status: named
  source: ЦАМО
memorialization:
  status: pending
  type: null
  location: null
  plate_number: null
  engraved: false
  engraved_date: null
  notes: "Требуется уточнение места захоронения"
sources:
  - org: ОБД Мемориал
    url: https://obd-memorial.ru/html/info.htm?id=551267196
---

## Герой Ломанов Иван Алексеевич

> [!IMPORTANT] Мемориал павших
> Восстановим справедливость — высечем его ИМЯ на камне на вечно.

src/content/fallen/551267199.md
---
id: "551267199"
slug: "mukhin-a-a-551267199"
status: processed
description: "Герой Мухин А.А. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно."
person:
  last_name: Мухин
  first_name: Александр
  middle_name: Алексеевич
  birth_year: null
  birth_location: "Ворошиловградская обл., Ровеньковский р-н, д. Покровка"
  death_date: "1942-03-19"
  cause: убит
service:
  rank_raw: лейтенант
  rank_norm: Лейтенант
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
  location: "Мемориал Корпечь, сектор А, ряд 1"
  plate_number: "А-1-23"
  engraved: false
  engraved_date: null
  notes: "Ожидает переиздания мемориала"
sources:
  - org: ОБД Мемориал
    url: https://obd-memorial.ru/html/info.htm?id=551267199
---

## Герой Мухин Александр Алексеевич

> [!IMPORTANT] Мемориал павших
> Восстановим справедливость — высечем его ИМЯ на камне на вечно.

=== ЧАСТЬ 4. ПАПКА ФОТО ===

public/photos/551267195/.gitkeep
public/photos/551267196/.gitkeep
public/photos/551267199/.gitkeep

=== ЧАСТЬ 5. ФАЙЛЫ КОММЕНТАРИЕВ (бронь первого слова) ===

data/comments/551267195.md
---
date: "2026-09-15"
author: admin
status: published
---

Эта карточка создана на основе документа ЦАМО №551267195.

**Призыв к родственникам и поисковикам:**
Если вы располагаете дополнительной информацией об этом человеке (фотографии, письма, сведения о перезахоронении), пожалуйста, оставьте комментарий ниже. Мы верифицируем данные и обновим карточку.

*Источник: ОБД Мемориал*

data/comments/551267196.md
(аналогично, с document_id 551267196)

data/comments/551267199.md
(аналогично, с document_id 551267199)

=== ЧАСТЬ 6. README ДЛЯ СПРАВОЧНИКА МЕМОРИАЛОВ ===

src/content/memorials/README.md
# Справочник мемориалов Крыма

Этот справочник содержит информацию о мемориалах Крыма, связанных с проектом Memorial Korpech Crimea.

## Структура записи

Каждая запись — MD-файл с frontmatter:

---
id: memorial-ak-monai
name: "Мемориал Ак-Монай"
location: "Ленинский район, с. Ак-Монай"
status: active
---

## Описание

Описание мемориала, история, количество захороненных.

## Как пополнить

1. Создайте новый MD-файл в этой папке
2. Заполните frontmatter (обязательные поля: id, name, location, status)
3. Добавьте описание
4. Сделайте коммит с сообщением: `docs: добавлен мемориал [название]`

=== ЧАСТЬ 7. ОЧЕРЕДЬ "РАЗБЕРИТЕСЬ!" ===

scripts/logs/clarify.queue.json
[
  {
    "id": "551267195",
    "slug": "badalov-g-i-551267195",
    "date": "2026-09-15",
    "issue": "current_burial is empty",
    "status": "pending"
  },
  {
    "id": "551267196",
    "slug": "lomanov-i-a-551267196",
    "date": "2026-09-15",
    "issue": "current_burial is empty",
    "status": "pending"
  },
  {
    "id": "551267199",
    "slug": "mukhin-a-a-551267199",
    "date": "2026-09-15",
    "issue": "current_burial is empty",
    "status": "pending"
  }
]

=== ЗАПРЕТЫ ===

- НЕ изменять существующие файлы темы Retypeset
- НЕ добавлять зависимости в package.json
- НЕ запускать pnpm build / dev
- НЕ создавать конвертер (это задача Кодера позднее)

=== КРИТЕРИИ ПРИЁМКИ ===

1. Схема коллекции fallen добавлена в src/content.config.ts
2. Страницы-заглушки созданы (memorial/index.astro, memorial/card/[slug].astro, memorials/index.astro)
3. Три примера карточек созданы в src/content/fallen/
4. Папки для фото созданы (public/photos/{id}/.gitkeep)
5. Файлы комментариев созданы (data/comments/{id}.md)
6. README для справочника мемориалов создан
7. Очередь clarify.queue.json создана с тремя записями

=== РЕЗУЛЬТАТ ===

Отчёт со списком созданных файлов и их путями.