import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: "page",
            source: "blog/**/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                date: z.string(),
                author: z.string(),
                tags: z.array(z.string()),
                category: z.string(),
                image: z.string(),
                draft: z.boolean(),
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
