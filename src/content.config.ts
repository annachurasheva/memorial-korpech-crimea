import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { allLocales, themeConfig } from '@/config'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    // required
    title: z.string(),
    published: z.date(),
    // optional
    description: z.string().optional().default(''),
    updated: z.preprocess(
      val => val === '' ? undefined : val,
      z.date().optional(),
    ),
    tags: z.array(z.string()).optional().default([]),
    // Advanced
    draft: z.boolean().optional().default(false),
    pin: z.number().int().min(0).max(99).optional().default(0),
    toc: z.boolean().optional().default(themeConfig.global.toc),
    lang: z.enum(['', ...allLocales]).optional().default(''),
    abbrlink: z.string().optional().default('').refine(
      abbrlink => !abbrlink || /^[a-z0-9\-]*$/.test(abbrlink),
      { message: 'Abbrlink can only contain lowercase letters, numbers and hyphens' },
    ),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    lang: z.enum(['', ...allLocales]).optional().default(''),
  }),
})

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
      middle_name: z.string().nullable().optional(),
      birth_year: z.number().nullable(),
      birth_location: z.string().nullable().optional(),
      death_date: z.string(),
      cause: z.string()
    }),

    // service data
    service: z.object({
      rank_raw: z.string(),
      rank_norm: z.string(),
      unit_raw: z.string(),
      unit_norm: z.string(),
      unit_id: z.string(),
      unit_url: z.string().nullable().optional(),
      unit_review_status: z.enum(['pending', 'verified', 'disputed']).nullable().optional()
    }),

    // burial data
    burial: z.object({
      primary_norm: z.string(),
      current_norm: z.string().nullable().optional(),
      current_status: z.string().nullable().optional()
    }),

    // relatives (optional)
    relatives: z.array(z.object({
      name: z.string(),
      address: z.string().nullable().optional(),
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
      location: z.string().nullable().optional(),
      plate_number: z.string().nullable().optional(),
      engraved: z.boolean(),
      engraved_date: z.string().nullable(),
      notes: z.string().nullable().optional()
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
})

const memorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memorials' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    status: z.enum(['active', 'inactive', 'planned']),
    lang: z.enum(['', ...allLocales]).optional().default('')
  })
})

export const collections = { posts, about, fallen, memorials }