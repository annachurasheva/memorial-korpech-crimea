=== ПАСПОРТ ЗАДАЧИ TASK-0002 rev.2 ===

Репо: memorial-korpech-crimea
Ветка: qwen3-memorial
Регламент: QWEN.md v0.4 (https://github.com/annachurasheva/memorial-korpech-crimea/blob/qwen3-memorial/QWEN.md)
Архитектура: ADR-02 (docs/decisions/02-memorial-architecture.md)
Стартовый коммит: [указать хэш после пуша a2a31e0]

READBACK (обязательно, §7.2 QWEN.md):
Первая строка твоего ответа — одна фраза своими словами:
что запрещено и в каком формате отдаёшь результат.
Нет readback — работа не начинается.

=== ЗАДАЧА ===

1. Обновить scripts/csv-to-fallen.mjs:
   - Извлекать номер части из unit_raw (паттерн: \d{1,4}\s*(сп|сд|ап|...))
   - Формировать unit_id = "unit-{номер}-{тип}" (например, unit-826-сп)
   - При отсутствии ключа в units_dict.json: unit_norm = raw, unit_id = транслит-slug
   - Логировать не-войсковые записи (Военюрист, и т.д.) в scripts/logs/processing.log с пометкой "needs_manual_review"
   - Использовать units_registry.json для unit_url: если unit_id найден в registry, добавить в карточку service.unit_url = /memorial/units/{unit_id}
   - Батч: не более 20 новых карточек за прогон

2. Создать компоненты:
   - src/components/memorial/CardFull.astro
     * Рендерит frontmatter карточки
     * Блок "> [!IMPORTANT] Мемориал павших"
     * Данные персоны, службы, захоронения
     * Тип увековечивания (korpech-grave, korpech-plate, other-memorial, kerch-tribute)
     * Фото (если есть)
     * Источники (только ссылка, без архивных реквизитов)
     * Ссылка "Последнее место службы" на unit_url (если есть)
     * Giscus комментарии (заглушка, настройки придут отдельно)
   
   - src/components/memorial/CardSummary.astro
     * ФИО, звание, дата смерти
     * Ссылка на полную карточку

3. Обновить страницы:
   - src/pages/[...lang]/memorial/index.astro — список карточек с CardSummary.astro
   - src/pages/[...lang]/memorial/card/[slug].astro — использовать CardFull.astro

4. Создать страницу-узел:
   - src/pages/[...lang]/memorial/units/[unit_id].astro
     * Читает units_registry.json
     * Показывает: norm (из units_dict.json по dict_keys), тип, номер, parent/children
     * Список павших из этой части (фильтр по unit_id)
     * Ссылки на camo_url и reference_url
     * history_note (если есть)

5. Создать RSS для Дзена:
   - src/pages/[...lang]/memorial/rss.xml.ts
     * RSS 2.0 из коллекции fallen
     * Каждая карточка = item с title, description, link, pubDate
     * description: "Герой {Фамилия} {И.О.}. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно."
     * link: /{lang}/memorial/card/{slug}/

=== РАЗРЕШЁННЫЕ ФАЙЛЫ ===

Изменить:
- scripts/csv-to-fallen.mjs (переписать)
- src/content.config.ts (добавить unit_url, unit_review_status в схему)
- src/components/memorial/CardFull.astro (создать)
- src/components/memorial/CardSummary.astro (создать)
- src/pages/[...lang]/memorial/index.astro (обновить)
- src/pages/[...lang]/memorial/card/[slug].astro (обновить)
- src/pages/[...lang]/memorial/units/[unit_id].astro (создать)
- src/pages/[...lang]/memorial/rss.xml.ts (создать)

Из docs/ читать только:
- docs/decisions/02-memorial-architecture.md
- data/dictionaries/README.md
- data/dictionaries/units_registry.json
- data/dictionaries/units_dict.json

=== ФОРМАТ ОТДАЧИ (§7.3 QWEN.md) ===

По каждому изменённому файлу:
Файл: [путь]
[ПОЛНЫЙ текст файла через Code Tool Record → Diff → Copy]

Без фрагментов, без скриншотов, без перепечатки руками.
Массовые данные (карточки MD) — батчами не более 20 файлов.
Файл кода содержит ТОЛЬКО код: без строк «Файл:», без ограждений ```.

=== КРИТЕРИИ ГОТОВНОСТИ (§7.1 QWEN.md) ===

1. Кодер отдал материалы по формату §7.3
2. Анна внесла их в GitHub своим коммитом
3. Дельта сверил коммит по raw и подтвердил PASS

До шага 3 задача «в работе». «PASS» Кодера — самооценка, не факт.

=== ЗАПРЕТЫ (§7.8 QWEN.md) ===

- Коммитить в GitHub или в песочнице и называть это готовностью
- Публиковать вместо отдачи диффов
- Трогать файлы вне списка «разрешено»
- Изобретать архитектуру: нет решения в паспорте — стоп и вопрос

=== ОТЧЁТ (§7.7 QWEN.md) ===

1. Список файлов
2. Диффы (формат §7.3)
3. Одна строка: «Диффы TASK-0002 rev.2 готовы к передаче Anna-Ch»
4. Статус astro check и pnpm build (должны быть зелёные)