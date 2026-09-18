import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { allLocales } from '@/config'

export function getStaticPaths() {
  return allLocales.map(lang => ({
    params: { lang },
  }))
}

export const GET: APIRoute = async ({ site, params }) => {
  const lang = params.lang || 'ru'
  const fallen = await getCollection('fallen')

  // Сортировка по дате гибели (свежие сверху)
  const sortedFallen = fallen.sort((a, b) => {
    const aDate = new Date(a.data.person.death_date)
    const bDate = new Date(b.data.person.death_date)
    return bDate.getTime() - aDate.getTime()
  })

  const siteUrl = site ? new URL(site).href : 'https://mem-2026.sourcecraft.site/'

  // Формирование RSS 2.0
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Мемориал павших — Memorial Korpech Crimea</title>
    <link>${siteUrl}${lang}/memorial/</link>
    <description>Документированные карточки павших в битве за Крым (1941–1942). Братское захоронение Корпечь, ныне с. Фронтовое: имена на камне — навечно.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}${lang}/memorial/rss.xml" rel="self" type="application/rss+xml"/>
    ${sortedFallen.map((card) => {
      const person = card.data.person
      const burial = card.data.burial || {}
      const initials = person.middle_name
        ? `${person.first_name[0]}.${person.middle_name[0]}.`
        : `${person.first_name[0]}.`

      // Фильтр: упоминание "Корпечь" в любом из полей карточки
      const recordText = JSON.stringify(card.data).toLowerCase()
      const hasKorpech = recordText.includes('корпечь')

      const tail = hasKorpech
        ? 'идёт подготовка к увековечению на плитах.'
        : 'уточнение деталей для внесения гравировок на мемориальные плиты.'

      const description = `${person.last_name} ${initials} — павший в битве за Крым, локация Ак-Монайский перешеек, Керченский полуостров (1941–1942). Имя документировано ЦАМО; ${tail}`

      const link = `${siteUrl}${lang}/memorial/card/${card.data.slug}/`
      const stableId = `memorial-korpech-card-${card.data.slug}`
      const pubDate = new Date(person.death_date).toUTCString()

      return `
    <item>
      <title>${person.last_name} ${initials}</title>
      <description>${description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</description>
      <link>${link}</link>
      <guid isPermaLink="false">${stableId}</guid>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${siteUrl}images/cover-dzen-intro.jpg" length="13408" type="image/jpeg" />
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}