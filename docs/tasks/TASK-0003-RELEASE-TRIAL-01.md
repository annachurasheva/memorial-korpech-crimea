Репо: memorial-korpech-crimea
Ветка: qwen3-memorial
Регламент: QWEN.md v0.4 (https://github.com/annachurasheva/memorial-korpech-crimea/blob/qwen3-memorial/QWEN.md)
Архитектура: ADR-02 (docs/decisions/02-memorial-architecture.md)

#  ПАСПОРТ ЗАДАЧИ RELEASE-TRIAL-1

READBACK (обязательно, §7.2 QWEN.md):
Первая строка твоего ответа — одна фраза своими словами:
что запрещено и в каком формате отдаёшь результат.
Нет readback — работа не начинается.

=== RELEASE-TRIAL-1: пробный деплой (Первый Слой + аналитика + согласие) ===
Репо: memorial-korpech-crimea. Ветка-источник: qwen3-memorial.
Релизная ветка: release/trial-1, создаётся ОТ main.
Регламент: QWEN.md v0.4 §7 + ADR-03. Readback обязателен (§7.2).

=== БЕЛЫЙ СПИСОК (трогать ТОЛЬКО это) ===
1. src/utils/consent.ts (новый)
2. src/components/ConsentBanner.astro (новый)
3. src/pages/[...lang]/privacy.astro (новый)
4. src/layouts/Head.astro (патч: гейт GA + инжект Метрики)
5. компонент комментариев темы (патч: гейт giscus)
6. src/config.ts (футер + giscus-блок; googleAnalyticsID ОСТАВИТЬ ПУСТЫМ)
7. src/content/posts/obrashchenie.md (новый, pin 99)

=== ЭТАЛОННЫЕ БЛОКИ ===

--- src/utils/consent.ts ---
export const CONSENT_KEY = 'mem-consent';
export function getConsent(): boolean {
  return typeof localStorage !== 'undefined' && localStorage.getItem(CONSENT_KEY) === '1';
}
export function setConsent(value: boolean): void {
  localStorage.setItem(CONSENT_KEY, value ? '1' : '0');
}

--- Head.astro: в конец <head> добавить is:inline скрипт ---
<script is:inline>
  (function () {
    // Яндекс.Метрика — без гейта (РФ-контур)
    var mt = document.createElement('script');
    mt.type = 'text/javascript'; mt.async = true;
    mt.src = 'https://mc.yandex.ru/metrika/tag.js?ns=1';
    document.head.appendChild(mt);
    window.yaCounter112710769 = null;
    window.Ya = window.Ya || {};
    (function mtr(d, w, c, s, h, e) {
      w[s] = w[s] || []; w[s].push({ id: 112710769, clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
      var n = d.getElementsByTagName('script')[0]; e = d.createElement('script'); e.async = true; e.src = mt.src; n.parentNode.insertBefore(e, n);
      w[c] = w[c] || function () { (w[c].a = w[c].a || []).push(arguments); };
    })(document, window, 'YaCounter112710769', 'yaParams');
    // Google Analytics — ТОЛЬКО после согласия (трансграничная передача)
    if (localStorage.getItem('mem-consent') === '1') {
      var g = document.createElement('script'); g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXZMBB2CVJ';
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      gtag('js', new Date()); gtag('config', 'G-HXZMBB2CVJ');
    }
  })();
</script>
(штатный инжект GA темой должен остаться ВЫКЛЮЧЕН: googleAnalyticsID пустой)

--- ConsentBanner.astro (панель + кнопка на комментариях) ---
Логика: если localStorage['mem-consent'] отсутствует — показать панель внизу:
текст одобренного баннера + ссылки «Политика» (/{lang}/privacy/) и кнопки
«Согласен» / «Отказаться». «Согласен»: setConsent(true) + location.reload().
«Отказаться»: setConsent(false) + скрыть панель.
В подвале — ссылка «Настройки данных»: сброс ключа + reload.

--- патч компонента комментариев ---
Рендер giscus обернуть клиентской проверкой getConsent():
если согласия нет — вместо iframe выводить блок:
«Комментарии работают через сервис GitHub. Чтобы включить их, примите условия
передачи данных.» + кнопка «Согласен» (setConsent(true) + reload).
Если согласие есть — штатный script giscus с параметрами из config.

--- src/config.ts ---
footer.links: RSS · Дзен (https://dzen.ru/memorial_korpech_crimea) · X · Email
(ссылку GitHub УБРАТЬ)
comment.enabled: true; comment.giscus: repo annachurasheva/memorial-korpech-crimea,
repoId R_kgDOUPY9Yw, category Announcements, categoryId DIC_kwDOUPY9Y84DFuJc,
mapping pathname, strict '1', reactionsEnabled '1', emitMetadata '0',
inputPosition 'bottom'
seo.googleAnalyticsID: '' (GA инжектится только гейтом выше)

--- src/content/posts/obrashchenie.md ---
frontmatter: title «Тем, кто держал память до нас», published 2026-09-16,
pin 99, lang ru, tags [Очерки]; тело — одобренный текст обращения.

--- privacy.astro ---
Статичная страница /{lang}/privacy/ с текстом политики (редакция 1 выше);
для en — заглушка «Translation in progress» + ссылка на ru-версию.

=== ГЕЙТЫ ПЕРЕД СЛИЯНИЕМ В main (ADR-03) ===
1. pnpm astro check — 0 errors; 2. pnpm build — успех;
3. прод: /, /ru/atom.xml, /ru/privacy/ — 200;
4. баннер виден до выбора; после «Согласен» грузятся gtag и giscus;
   после «Отказаться» — не грузятся, сайт полностью доступен;
5. Метрика видит визит (Обзор → визиты); GA realtime — только при согласии;
6. тестовый комментарий giscus виден под обращением.

=== ФОРМАТ ОТДАЧИ (§7.3) ===
Полные тексты файлов через Code Tool Record → Diff → Copy.
Отчёт: список файлов + тексты + строка «Материалы RELEASE-TRIAL-1 готовы
к передаче Anna-Ch» + ветка release/trial-1.
