<!-- ФАЙЛ: docs/TASKS.md (единый, заменяет все прежние куски) -->
# TASKS · выдаёт проектировщик · Кодер меняет статусы
Координаты: `annachurasheva/*` · `docs/TASKS.md` · v2 · 2026-09-07

Уровень читателя: начальный. Всё — простыми словами.
Сила документов: этот > всё остальное (кроме QWEN.md своего репо).

## 0. ПОЛЯ И РЕПО
Поле уроков: revision-of-astro-6-1-5 (дашборд Vite+React) —
  Кодер 1, ветка qwen-dashboard-coder, задачи T-02 и далее.
Поле мемориала: memorial-korpech-crimea (Astro 6.1.5) —
  Кодер 2, ветка qwen-memorial-coder, задачи T-01 и далее.
Каждая задача указывает РЕПО и ВЕТКУ. Задача с чужим репо ≠ твой репо:
не исполнять; ответить «задача для другого поля» и стоп.
Ты читаешь ТОЛЬКО свой репо и свою ветку.

## 1. СТАТУСЫ И ПОРЯДОК
NEW → DOING → DONE + хэш коммита. Коммиты по INSTRUCTION.md (3.5).
Отчёты — отдельные файлы в reports/; дописок в Журнал нет.
Каждый файл в ответе — код-блок со строкой «# ФАЙЛ: <путь>».

### T-01 v2 · memorial-korpech-crimea · qwen-memorial-coder ·
### «Заполни свои позывные!» (SEO без кодов слежения)
Шаг 0 (Заказчик, до Кодера): пустышки по языкам (en, es, ja, zh-tw)
с текстом «Этот сайт только на русском ЯЗЫКЕ — будьте терпеливы и
пользуйтесь переводчиком онлайн на ВАШ язык»; общие страницы —
по образцу Universal Post (lang не указан).
1. src/config.ts — позывные: title «Мемориал Корпечь, Крым»;
   subtitle «Памяти павших в ВОВ»; description «Списки павших.
   Крым Фронт 1-1942»; author Anna Churasheva; обе emails;
   i18nTitle false; locale 'ru'; moreLocales ['en','es','ja','zh-tw'].
2. footer: RSS; GitHub — свой репо; Email — ГОЛЫЙ '79787883649@ya.ru'.
3. seo: twitterID '@Anna_Churasheva'; verification, googleAnalyticsID,
   umamiAnalyticsID — ПУСТЫЕ (коды появятся позже).
4. robots.txt и sitemap-index учитывают base; OG абсолютная
   (new URL …, Astro.url.origin); запись index в генераторе;
   canonical из Astro.url.
5. astro check; дифф; отчёт reports/report-T01.md; DONE + хэш.
Приёмка: raw проектировщиком. ПОСЛЕ неё Заказчик включает мемориал
в EdgeOne Pages.

### T-02 · revision-of-astro-6-1-5 · qwen-dashboard-coder ·
### «Шапка учебника пять шагов»
1. Убрать брендинг «Комплект .vscode» и «форка Astro-темы Retypeset».
2. Шапка по OTVET-127: крупно «Пять шагов — и ваши тексты на вашем
   портале»; мелко «Учебник. Пример — мемориал Корпечь, Крым. Без магии:
   текст → папка → коммит → сборка → проверка»; справа «Пройдено шагов:
   N из 5»; строка текущего репо revision-of-astro-6-1-5.
3. Шаги в src/data/steps.ts: пять записей {id, title, text, status};
   галочки по status; прогресс считает done.
4. Иные блоки витрины НЕ трогать. Отчёт reports/report-tutorial-header.md;
   DONE + хэш.