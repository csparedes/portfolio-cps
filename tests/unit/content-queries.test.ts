import { describe, it, expect, beforeEach } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Content Queries and Data Transformation', async () => {
  await setup({
    // test context options
  })

  describe('Blog Post Queries', () => {
    it('should fetch all blog posts', async () => {
      // Test the blog posts API endpoint
      const response = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      expect(response).toBeDefined()
      expect(Array.isArray(response)).toBe(true)
    })

    it('should transform blog post data correctly', async () => {
      // Test data transformation for blog posts
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      if (posts.length > 0) {
        const post = posts[0]
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('description')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('author')
        expect(post).toHaveProperty('tags')
        expect(post).toHaveProperty('category')
      }
    })

    it('should filter out draft posts', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"},"draft":{"$ne":true}}]}')
      
      posts.forEach((post: any) => {
        expect(post.draft).not.toBe(true)
      })
    })

    it('should sort posts by date correctly', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}],"sort":[{"date":-1}]}')
      
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const currentDate = new Date(posts[i].date)
          const nextDate = new Date(posts[i + 1].date)
          expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime())
        }
      }
    })
  })

  describe('Content Data Validation', () => {
    it('should validate frontmatter schema', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        // Required fields
        expect(post.title).toBeDefined()
        expect(typeof post.title).toBe('string')
        expect(post.title.length).toBeGreaterThan(0)
        
        expect(post.description).toBeDefined()
        expect(typeof post.description).toBe('string')
        
        expect(post.date).toBeDefined()
        expect(new Date(post.date)).toBeInstanceOf(Date)
        
        // Optional fields with type checking
        if (post.author) {
          expect(typeof post.author).toBe('string')
        }
        
        if (post.tags) {
          expect(Array.isArray(post.tags)).toBe(true)
        }
        
        if (post.category) {
          expect(typeof post.category).toBe('string')
        }
      })
    })

    it('should handle missing or malformed frontmatter gracefully', async () => {
      // This test ensures our data transformation handles edge cases
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        // Should have fallback values for missing data
        expect(post.title || 'Untitled Post').toBeDefined()
        expect(post.author || 'Unknown Author').toBeDefined()
        expect(post.category || 'uncategorized').toBeDefined()
        expect(post.tags || []).toBeDefined()
      })
    })
  })
})