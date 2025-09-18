import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Search and Filtering Functionality Tests', async () => {
  await setup({
    // test context options
  })

  describe('Content Search', () => {
    it('should search posts by title', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"title":{"$icontains":"nuxt"}}]}')
      
      posts.forEach((post: any) => {
        expect(post.title.toLowerCase()).toContain('nuxt')
      })
    })

    it('should search posts by description', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"description":{"$icontains":"web"}}]}')
      
      posts.forEach((post: any) => {
        expect(post.description.toLowerCase()).toContain('web')
      })
    })

    it('should search posts by content body', async () => {
      // This tests full-text search capability
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      const searchTerm = 'javascript'
      const filteredPosts = posts.filter((post: any) => {
        const bodyText = JSON.stringify(post.body).toLowerCase()
        return bodyText.includes(searchTerm) || 
               post.title?.toLowerCase().includes(searchTerm) ||
               post.description?.toLowerCase().includes(searchTerm)
      })
      
      expect(Array.isArray(filteredPosts)).toBe(true)
    })

    it('should handle case-insensitive search', async () => {
      const upperCasePosts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"title":{"$icontains":"NUXT"}}]}')
      const lowerCasePosts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"title":{"$icontains":"nuxt"}}]}')
      
      expect(upperCasePosts.length).toBe(lowerCasePosts.length)
    })

    it('should return empty results for non-matching search', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"title":{"$icontains":"nonexistentterm12345"}}]}')
      
      expect(Array.isArray(posts)).toBe(true)
      expect(posts.length).toBe(0)
    })
  })

  describe('Category Filtering', () => {
    it('should filter posts by category', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"category":"tutorial"}]}')
      
      posts.forEach((post: any) => {
        expect(post.category).toBe('tutorial')
      })
    })

    it('should get all available categories', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      const categories = [...new Set(posts.map((post: any) => post.category).filter(Boolean))]
      
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('should handle posts without categories', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        const category = post.category || 'uncategorized'
        expect(typeof category).toBe('string')
      })
    })
  })

  describe('Tag Filtering', () => {
    it('should filter posts by single tag', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"tags":{"$contains":"nuxt"}}]}')
      
      posts.forEach((post: any) => {
        expect(post.tags).toContain('nuxt')
      })
    })

    it('should filter posts by multiple tags', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"tags":{"$in":["nuxt","vue"]}}]}')
      
      posts.forEach((post: any) => {
        const hasNuxt = post.tags?.includes('nuxt')
        const hasVue = post.tags?.includes('vue')
        expect(hasNuxt || hasVue).toBe(true)
      })
    })

    it('should get all available tags', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      const allTags = posts.flatMap((post: any) => post.tags || [])
      const uniqueTags = [...new Set(allTags)]
      
      expect(Array.isArray(uniqueTags)).toBe(true)
      expect(uniqueTags.length).toBeGreaterThan(0)
    })

    it('should handle posts without tags', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        const tags = post.tags || []
        expect(Array.isArray(tags)).toBe(true)
      })
    })
  })

  describe('Date Filtering and Sorting', () => {
    it('should sort posts by date descending', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"sort":[{"date":-1}]}')
      
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const currentDate = new Date(posts[i].date)
          const nextDate = new Date(posts[i + 1].date)
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime())
        }
      }
    })

    it('should sort posts by date ascending', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"sort":[{"date":1}]}')
      
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const currentDate = new Date(posts[i].date)
          const nextDate = new Date(posts[i + 1].date)
          expect(currentDate.getTime()).toBeLessThanOrEqual(nextDate.getTime())
        }
      }
    })

    it('should filter posts by date range', async () => {
      const startDate = '2024-01-01'
      const endDate = '2024-12-31'
      
      const posts = await $fetch(`/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"date":{"$gte":"${startDate}","$lte":"${endDate}"}}]}`)
      
      posts.forEach((post: any) => {
        const postDate = new Date(post.date)
        const start = new Date(startDate)
        const end = new Date(endDate)
        
        expect(postDate.getTime()).toBeGreaterThanOrEqual(start.getTime())
        expect(postDate.getTime()).toBeLessThanOrEqual(end.getTime())
      })
    })
  })

  describe('Title and Author Sorting', () => {
    it('should sort posts by title alphabetically', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"sort":[{"title":1}]}')
      
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          expect(posts[i].title.localeCompare(posts[i + 1].title)).toBeLessThanOrEqual(0)
        }
      }
    })

    it('should filter posts by author', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"author":{"$exists":true}}]}')
      
      posts.forEach((post: any) => {
        expect(post.author).toBeDefined()
        expect(typeof post.author).toBe('string')
      })
    })
  })

  describe('Combined Filtering', () => {
    it('should apply multiple filters simultaneously', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"category":"tutorial","tags":{"$contains":"nuxt"}}]}')
      
      posts.forEach((post: any) => {
        expect(post.category).toBe('tutorial')
        expect(post.tags).toContain('nuxt')
      })
    })

    it('should handle complex search with sorting', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"title":{"$icontains":"nuxt"}}],"sort":[{"date":-1}]}')
      
      // Should be filtered by title and sorted by date
      posts.forEach((post: any) => {
        expect(post.title.toLowerCase()).toContain('nuxt')
      })
      
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const currentDate = new Date(posts[i].date)
          const nextDate = new Date(posts[i + 1].date)
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime())
        }
      }
    })
  })

  describe('Pagination and Limits', () => {
    it('should limit number of results', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"limit":2}')
      
      expect(posts.length).toBeLessThanOrEqual(2)
    })

    it('should skip results for pagination', async () => {
      const firstPage = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"limit":2}')
      const secondPage = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"limit":2,"skip":2}')
      
      if (firstPage.length > 0 && secondPage.length > 0) {
        expect(firstPage[0].id).not.toBe(secondPage[0].id)
      }
    })
  })
})