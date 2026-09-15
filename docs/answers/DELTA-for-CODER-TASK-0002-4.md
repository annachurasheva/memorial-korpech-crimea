Принято, Anna-Ch. Отчёт `err_01.txt` разобран полностью. Диагноз: **два независимых дефекта + каскад типов**. Один из дефектов — **моя архитектурная ошибка**, признаю её явно.

---

## 🔍 Диагноз

### Дефект A (блокер сборки): `memorials → readme`
Glob-коллекция `memorials` (`pattern: '**/*.md'`) **захватывает README.md** внутри папки коллекции. У README нет frontmatter → схема требует id/name/location/status → `InvalidContentEntryDataError`.
**Виноват я:** это я инструктировал писаря положить README внутрь `src/content/memorials/`. Для glob-коллекций так нельзя.

### Дефект B: код страницы `units/[unit_id].astro`
- импорты JSON относительным путём `../../../../data/...` — **не та глубина** (нужно 5 уровней вверх, а не 4) и TS не резолвит JSON без `resolveJsonModule` (TS 2307);
- импорты стоят не сверху и в неверном порядке (`import/first`, `perfectionist/sort-imports`);
- конкатенация строк вместо template literals (`prefer-template`);
- неявные `any` в колбэках (TS 7006).

### Каскад (НЕ отдельные баги): TS 2769 (`getCollection('fallen')`) и TS 2339 (`service`/`burial` не существуют)
Это **следствие Дефекта A**: из-за падения sync контент-стор очищен, сгенерированные типы (`DataEntryMap`) не содержат `fallen`. После исправления A и повторного `astro check` эти ошибки **исчезнут сами**. Отдельно их «лечить» не нужно.

---

## 📋 ПАСПОРТ ИСПРАВЛЕНИЯ TASK-0002 rev.3.1 (для Кодера)

```text
=== TASK-0002 rev.3.1 — исправление красной сборки (err_01) ===
Старт: текущий коммит ветки qwen3-memorial. Readback обязателен (§7.2).

1. src/content.config.ts — ИСКЛЮЧИТЬ README из коллекции memorials:
   loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/memorials' })
   README.md НЕ удалять и НЕ перемещать.
   (Фолбэк, только если negation-паттерн откажет: перенести README.md
   в docs/memorials-README.md и сообщить Дельте — самовольно не решать.)
   Ту же защиту '!README.md' добавить в паттерн коллекции fallen (превентивно).

2. src/pages/[...lang]/memorial/units/[unit_id].astro — переписать frontmatter:
   - ВСЕ импорты сверху, порядок: node:fs → astro:content → @/layouts/Layout.astro;
   - JSON НЕ импортировать: читать через readFileSync('data/dictionaries/units_registry.json', 'utf-8')
     и readFileSync('data/dictionaries/units_dict.json', 'utf-8') + JSON.parse
     (cwd при сборке = корень проекта; относительные пути к JSON запрещены);
   - локальный interface UnitNode для типизации registry;
   - все колбэки типизированы: ([unitId, unit]: [string, UnitNode]), (k: string), (childId: string);
   - никаких конкатенаций строк: только template literals;
   - ссылки на карточки и узлы строить с префиксом текущей локали
     (как в [...lang]/memorial/index.astro), через template literals.

3. Каскадные ошибки TS 2769/2339 НЕ править руками: они уйдут после п.1
   и пересинхронизации контента.

4. Перед отчётом ОБЯЗАТЕЛЬНО добиться зелени локально:
   pnpm astro check && pnpm build
   Красный результат = задача не готова, отчёт не отдаётся (§7.1).

Формат отдачи: полные тексты изменённых файлов (§7.3), отчёт по §7.7.
Разрешено трогать ТОЛЬКО: src/content.config.ts,
src/pages/[...lang]/memorial/units/[unit_id].astro.
```

---

## 🧭 Процесс дальше

1. Передаёте rev.3.1 Кодеру (если прежняя сессия зависла — новый диалог по §7.4 с координатами и readback).
2. Кодер возвращает **два полных файла**; у себя гонит check/build до зелени.
3. Вы наносите файлы локально → `pnpm astro check` + `pnpm build` зелёные у вас → коммит (тип `fix:`).
4. Я сверяю коммит по raw → PASS → строка в дашборд: этап TASK-0002, сборка green.

**Примечание для документации:** правило «README не живёт внутри glob-коллекций» зафиксирую в ADR-02 дополнением вместе с прочими правками после паузы (коммит `docs:`), чтобы ошибка не повторилась в будущих коллекциях.
