# ADR-03: Защита main и процедура пробных деплоев

## Статус веток
- main — продакшен, автодеплой EdgeOne. Слияния — только рукой Anna-Ch.
- qwen3-memorial — разработка. Целиком в main НЕ сливается никогда.
- release/trial-N — релизные ветки пробных деплоев. Создаются ТОЛЬКО от main.

## Принцип белого списка
В release-ветку попадают только файлы из утверждённого списка путей.
Всё остальное остаётся в qwen3-memorial. Перед коммитом обязателен контроль:
git status — только файлы белого списка; git diff --cached — визуальная ревизия.

## Состав trial-1 (утверждено)
- src/config.ts: GA4 (seo.googleAnalyticsID), верификация Search Console,
  ссылка Дзен в footer.links; Giscus — ТОЛЬКО при готовых 4 параметрах;
- src/content/posts/<одна статья>.md.
Карточки, компоненты memorial, конвертер, memorial-RSS — ВНЕ белого списка.

## Гейты перед слиянием в main
1. pnpm astro check — 0 errors;
2. pnpm build — успех;
3. после деплоя: / и /atom.xml — 200 на проде;
4. (если аналитика) realtime GA видит визит;
5. (если Giscus) тестовый комментарий виден под статьёй.

## Откат
Откат = revert-коммит Anna-Ch в main; автодеплой применяет откат.
Переписывание истории запрещено.

## Дзен после деплоя
Каналу передаётся прод-URL ленты (https://<домен>/ru/atom.xml).
Наполнение ленты карточками — НЕ в trial-1 (карточки не трогаем).

```
git checkout main && git pull origin main
git checkout -b release/trial-1
# применить ТОЛЬКО белый список:
git checkout qwen3-memorial -- src/config.ts
git checkout qwen3-memorial -- src/content/posts/<файл-статьи>.md
# КОНТРОЛЬ ЛИШНЕГО (стоп, если видно что-то ещё):
git status --porcelain
git diff --cached
git commit -m "release: trial-1 — GA4, Search Console, Дзен-ссылка, одна статья"
pnpm astro check && pnpm build        # гейты 1–2
git checkout main
git merge release/trial-1
git push origin main                  # автодеплой; гейты 3–5 на проде
```
