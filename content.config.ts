import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/**/*.md',
        }),
        pages: defineCollection({
            type: 'page',
            source: 'pages/**/*.md',
        }),
        docs: defineCollection({
            type: 'page',
            source: '**',
        })
    }
})
