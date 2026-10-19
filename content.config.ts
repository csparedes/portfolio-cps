import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the YYYY-MM-DD date format')
const publicImage = z.string().startsWith('/')
const blogCategory = z.enum(['demo', 'guide', 'learning', 'tips', 'tutorial'])
const projectCategory = z.enum(['Mobile App', 'Web App'])
const projectStatus = z.enum(['deployed', 'in-development', 'offline'])

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: "page",
            source: "blog/**/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                date: isoDate,
                author: z.string().optional(),
                tags: z.array(z.string()).default([]),
                category: blogCategory,
                image: publicImage,
                draft: z.boolean().default(false),
            }),
        }),
        projects: defineCollection({
            type: "page",
            source: "projects/**/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                date: isoDate,
                author: z.string(),
                tags: z.array(z.string()),
                category: projectCategory,
                image: publicImage,
                draft: z.boolean().default(false),
                status: projectStatus,
                images: z.array(z.object({
                    src: publicImage,
                    alt: z.string().min(1),
                })).default([]),
            }),
        }),
        about: defineCollection({
            type: "page",
            source: "about/**/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                date: isoDate,
                author: z.string().optional(),
                tags: z.array(z.string()).default([]),
                category: z.string().optional(),
                image: publicImage.optional(),
                draft: z.boolean().default(false),
            }),
        }),
        pages: defineCollection({
            type: "page",
            source: "pages/**/*.md",
        }),
        docs: defineCollection({
            type: "page",
            source: "**",
        }),
    },
});
