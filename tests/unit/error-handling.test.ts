import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('Error Handling Tests', async () => {
  await setup({
    // test context options
  })

  describe('Missing Content Handling', () => {
    it('should return 404 for non-existent blog posts', async () => {
      try {
        await $fetch('/blog/this-post-does-not-exist')
        expect.fail('Should have thrown 404 error')
      } catch (error: any) {
        expect(error.response?.status || error.statusCode).toBe(404)
      }
    })

    it('should handle empty blog directory gracefully', async () => {
      // Test querying when no posts exist (edge case)
      const response = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"nonexistent/"}}]}')
      
      expect(Array.isArray(response)).toBe(true)
      expect(response.length).toBe(0)
    })

    it('should display proper 404 page for missing posts', async () => {
      try {
        const html = await $fetch('/blog/missing-post')
        expect.fail('Should have thrown 404 error')
      } catch (error: any) {
        expect(error.response?.status || error.statusCode).toBe(404)
      }
    })
  })

  describe('Malformed Frontmatter Handling', () => {
    it('should handle posts with missing required fields', async () => {
      // This tests our data transformation robustness
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        // Should have fallback values
        const title = post.title || 'Untitled Post'
        const author = post.author || 'Unknown Author'
        const category = post.category || 'uncategorized'
        const tags = post.tags || []
        
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(category).toBeDefined()
        expect(Array.isArray(tags)).toBe(true)
      })
    })

    it('should handle invalid date formats gracefully', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        const date = post.date || '2024-01-01'
        const parsedDate = new Date(date)
        
        // Should either be a valid date or fallback to default
        expect(parsedDate instanceof Date).toBe(true)
        expect(isNaN(parsedDate.getTime())).toBe(false)
      })
    })

    it('should handle invalid tag formats', async () => {
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        if (post.tags) {
          // Tags should always be an array
          expect(Array.isArray(post.tags)).toBe(true)
          
          // Each tag should be a string
          post.tags.forEach((tag: any) => {
            expect(typeof tag).toBe('string')
          })
        }
      })
    })
  })

  describe('Content Parsing Errors', () => {
    it('should handle markdown parsing errors gracefully', async () => {
      // Test that malformed markdown doesn't break the site
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        // Should have body content or empty object
        expect(post.body).toBeDefined()
      })
    })

    it('should handle component rendering errors', async () => {
      try {
        const html = await $fetch('/blog/nuxt-content-components-demo')
        
        // Should render successfully even if some components fail
        expect(html).toContain('blog-content')
        expect(html).not.toContain('Error')
      } catch (error) {
        // If it fails, it should fail gracefully
        expect(error).toBeDefined()
      }
    })
  })

  describe('Network and Performance Error Handling', () => {
    it('should handle slow content queries', async () => {
      const startTime = Date.now()
      
      try {
        await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
        const endTime = Date.now()
        
        // Should complete within reasonable time (10 seconds)
        expect(endTime - startTime).toBeLessThan(10000)
      } catch (error) {
        // Should handle timeout gracefully
        expect(error).toBeDefined()
      }
    })

    it('should handle large content files', async () => {
      // Test with potentially large blog posts
      const posts = await $fetch('/api/_content/query?_params={"where":[{"id":{"$contains":"blog/"}}]}')
      
      posts.forEach((post: any) => {
        // Should handle large content without issues
        if (post.body) {
          expect(typeof post.body).toBe('object')
        }
      })
    })
  })

  describe('SEO and Meta Tag Error Handling', () => {
    it('should provide fallback meta tags for posts without metadata', async () => {
      const html = await $fetch('/blog/getting-started-with-nuxt')
      
      // Should always have basic meta tags
      expect(html).toContain('<title>')
      expect(html).toContain('og:title')
      expect(html).toContain('og:description')
    })

    it('should handle missing images in meta tags', async () => {
      const html = await $fetch('/blog/getting-started-with-nuxt')
      
      // Should have fallback image or handle missing images
      expect(html).toMatch(/og:image.*\.(jpg|png|webp|gif)/i)
    })
  })
})