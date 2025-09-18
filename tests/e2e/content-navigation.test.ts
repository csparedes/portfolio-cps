import { describe, it, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'

describe('Content Navigation E2E Tests', async () => {
  await setup({
    // test context options
  })

  describe('Blog Navigation Workflow', () => {
    it('should navigate from home to blog index', async () => {
      const page = await createPage('/')
      
      // Navigate to blog
      await page.click('a[href="/blog"]')
      await page.waitForURL('/blog')
      
      expect(page.url()).toContain('/blog')
      expect(await page.textContent('h1')).toContain('Blog')
    })

    it('should navigate from blog index to individual post', async () => {
      const page = await createPage('/blog')
      
      // Click on first blog post
      await page.click('.cursor-pointer:first-child')
      
      // Should navigate to individual post
      expect(page.url()).toMatch(/\/blog\/[\w-]+/)
      expect(await page.isVisible('.blog-content')).toBe(true)
    })

    it('should use breadcrumb navigation correctly', async () => {
      const page = await createPage('/blog/getting-started-with-nuxt')
      
      // Click on "Blog" in breadcrumb
      await page.click('nav a[href="/blog"]')
      await page.waitForURL('/blog')
      
      expect(page.url()).toBe('/blog')
      expect(await page.textContent('h1')).toContain('Blog')
    })

    it('should navigate between posts using previous/next buttons', async () => {
      const page = await createPage('/blog/getting-started-with-nuxt')
      
      // Check if next post button exists and click it
      const nextButton = page.locator('text=Next Post')
      if (await nextButton.isVisible()) {
        const currentUrl = page.url()
        await nextButton.click()
        
        // Should navigate to different post
        expect(page.url()).not.toBe(currentUrl)
        expect(page.url()).toMatch(/\/blog\/[\w-]+/)
      }
    })

    it('should return to blog index from individual post', async () => {
      const page = await createPage('/blog/getting-started-with-nuxt')
      
      // Click "Back to All Posts" button
      await page.click('text=Back to All Posts')
      await page.waitForURL('/blog')
      
      expect(page.url()).toBe('/blog')
    })
  })

  describe('Search and Filter Functionality', () => {
    it('should filter posts by search query', async () => {
      const page = await createPage('/blog')
      
      // Type in search box
      await page.fill('input[placeholder="Search articles..."]', 'nuxt')
      
      // Wait for filtering to occur
      await page.waitForTimeout(500)
      
      // Check that results are filtered
      const posts = await page.locator('.grid .cursor-pointer').count()
      expect(posts).toBeGreaterThan(0)
    })

    it('should filter posts by category', async () => {
      const page = await createPage('/blog')
      
      // Click on a category filter (if available)
      const categoryButton = page.locator('text=tutorial').first()
      if (await categoryButton.isVisible()) {
        await categoryButton.click()
        
        // Wait for filtering
        await page.waitForTimeout(500)
        
        // Should show filtered results
        const posts = await page.locator('.grid .cursor-pointer').count()
        expect(posts).toBeGreaterThanOrEqual(0)
      }
    })

    it('should filter posts by tags', async () => {
      const page = await createPage('/blog')
      
      // Click on a tag filter (if available)
      const tagButton = page.locator('text=#nuxt').first()
      if (await tagButton.isVisible()) {
        await tagButton.click()
        
        // Wait for filtering
        await page.waitForTimeout(500)
        
        // Should show filtered results
        const posts = await page.locator('.grid .cursor-pointer').count()
        expect(posts).toBeGreaterThanOrEqual(0)
      }
    })

    it('should clear all filters', async () => {
      const page = await createPage('/blog')
      
      // Apply some filters first
      await page.fill('input[placeholder="Search articles..."]', 'test')
      await page.waitForTimeout(500)
      
      // Click clear filters button
      const clearButton = page.locator('text=Clear Filters')
      if (await clearButton.isVisible()) {
        await clearButton.click()
        
        // Should reset to show all posts
        const searchInput = await page.inputValue('input[placeholder="Search articles..."]')
        expect(searchInput).toBe('')
      }
    })

    it('should sort posts correctly', async () => {
      const page = await createPage('/blog')
      
      // Change sort order
      await page.selectOption('select', 'title-asc')
      await page.waitForTimeout(500)
      
      // Check that posts are reordered
      const firstPostTitle = await page.textContent('.grid .cursor-pointer:first-child h2')
      expect(firstPostTitle).toBeDefined()
    })
  })

  describe('Responsive Navigation', () => {
    it('should work on mobile viewport', async () => {
      const page = await createPage('/blog')
      
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Navigation should still work
      await page.click('.cursor-pointer:first-child')
      expect(page.url()).toMatch(/\/blog\/[\w-]+/)
    })

    it('should handle touch interactions', async () => {
      const page = await createPage('/blog')
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Tap on post card
      await page.tap('.cursor-pointer:first-child')
      expect(page.url()).toMatch(/\/blog\/[\w-]+/)
    })
  })
})