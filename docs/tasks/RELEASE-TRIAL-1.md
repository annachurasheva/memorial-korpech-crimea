=== TASK-0003: RELEASE-TRIAL-1 с эталонным окружением (.devcontainer) ===

КООРДИНАТЫ
Репо: memorial-korpech-crimea
Ветка: qwen3-memorial Регламент: QWEN.md v0.4 (https://github.com/annachurasheva/memorial-korpech-crimea/blob/qwen3-memorial/QWEN.md)
Стартовый хэш: 47a88e3 (формула синхронизации: «возьми обнову по коммиту [хэш] —
читай и делай»; «обнови репо» не использовать)
Регламент: QWEN.md v0.4 §7 + REGLAMENT-CODER v4
Спецификация задачи: docs/tasks/RELEASE-TRIAL-1.md — ЕДИНСТВЕННЫЙ документ
из docs/, который тебе разрешено читать

ШАГ 0. ЭТАЛОННОЕ ОКРУЖЕНИЕ (.devcontainer) — ПОВТОРИТЬ СТРУКТУРУ РУКОВОДИТЕЛЯ
Создай в корне песочницы .devcontainer/devcontainer.json (эталон):
{
  "name": "memorial-korpech-crimea",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
  "postCreateCommand": "corepack enable && corepack prepare pnpm@10.33.0 --activate && pnpm install --frozen-lockfile",
  "customizations": { "vscode": { "extensions": ["astro-build.astro-vscode"] } },
  "forwardPorts": [4321]
}
Смысл: Node 24.5.0 + pnpm 10.33.0 + frozen-lockfile = тот же контур сборки,
что у руководителя. После поднятия контейнера выполни и ПРИЛОЖИ к отчёту:
node -v && pnpm -v

ПРАВИЛО ПРО pnpm-lock.yaml (контекст-защита)
Файл открыт для установки, но ЗАКРЫТ на чтение: не открывать, не цитировать,
не включать фрагменты в отчёт. Единственное использование:
pnpm install --frozen-lockfile внутри postCreateCommand или вручную.

ШАГ 1. READBACK (§7.2 QWEN.md)
Первая строка ответа — одна фраза своими словами: что запрещено
и в каком формате отдаёшь. Нет readback — работа не начинается.

ШАГ 2. ИСПОЛНЕНИЕ
Выполнить docs/tasks/RELEASE-TRIAL-1.md буквально: белый список из 7 позиций
(consent.ts, ConsentBanner.astro, privacy.astro, патч Head.astro, патч
компонента комментариев, config.ts, obrashchenie.md) по эталонным блокам
паспорта. Значения giscus/GA/Метрики/футера брать ТОЛЬКО из паспорта.
Нет решения в паспорте — стоп и вопрос, не изобретать.

ШАГ 3. ГЕЙТЫ СБОРКИ (обязательные, без них задача не принята)
pnpm astro check  → 0 errors
pnpm build        → успех
К отчёту приложить СЫРОЙ хвост обеих команд: строки «Result (N files): ...»
и финальные строки build. Нет сырого хвоста = отчёт не принят,
«PASS» без сырого хвоста не существует.

ШАГ 4. ОТЧЁТ (§7.3, §7.7)
1. Список файлов;
2. полные тексты файлов через Code Tool Record → Diff → Copy
   (файл кода содержит ТОЛЬКО код: без «### Файл:», без ограждений ```);
3. строки node -v / pnpm -v и сырые хвосты гейтов;
4. одна строка: «Материалы TASK-0003 готовы к передаче Anna-Ch».

ЗАПРЕТЫ
Коммитить и сливать; публиковать вместо отдачи; трогать файлы вне белого
списка; читать docs/ вне RELEASE-TRIAL-1.md; читать pnpm-lock.yaml;
вставлять маркеры диффа (---, +++, «изменено») внутрь файлов кода.

КРИТЕРИЙ ВОЗВРАТА К ПИСАРЮ (решает руководитель)
Отсутствие readback, отсутствие сырой зелени, нарушение белого списка,
маркеры диффа внутри файлов.
