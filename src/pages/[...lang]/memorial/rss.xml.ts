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
    <description>Карточки павших героев. Восстановим справедливость, высечем их ИМЕНА на камне на вечно.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}${lang}/memorial/rss.xml" rel="self" type="application/rss+xml"/>
    ${sortedFallen.map((card) => {
      const initials = card.data.person.middle_name
        ? `${card.data.person.first_name[0]}.${card.data.person.middle_name[0]}.`
        : `${card.data.person.first_name[0]}.`

      const description = `Герой ${card.data.person.last_name} ${initials}. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно.`
      const link = `${siteUrl}${lang}/memorial/card/${card.data.slug}/`
      const pubDate = new Date(card.data.person.death_date).toUTCString()

      return `
    <item>
      <title>${card.data.person.last_name} ${initials}</title>
      <description>${description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
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