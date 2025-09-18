/**
 * Test helper utilities for blog content testing
 */

export interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  category?: string
  draft?: boolean
  body?: any
}

export interface TestBlogPost extends BlogPost {
  _path: string
}

/**
 * Creates a mock blog post for testing
 */
export function createMockBlogPost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    id: 'blog/test-post.md',
    title: 'Test Blog Post',
    description: 'This is a test blog post description',
    date: '2024-01-15',
    author: 'Test Author',
    tags: ['test', 'blog'],
    category: 'testing',
    draft: false,
    body: {
      type: 'root',
      children: [
        {
          type: 'element',
          tag: 'h1',
          children: [{ type: 'text', value: 'Test Content' }]
        }
      ]
    },
    ...overrides
  }
}

/**
 * Validates blog post structure
 */
export function validateBlogPost(post: any): boolean {
  const requiredFields = ['title', 'description', 'date']
  
  for (const field of requiredFields) {
    if (!post[field]) {
      return false
    }
  }
  
  // Validate date format
  const date = new Date(post.date)
  if (isNaN(date.getTime())) {
    return false
  }
  
  // Validate tags if present
  if (post.tags && !Array.isArray(post.tags)) {
    return false
  }
  
  return true
}

/**
 * Transforms raw content data to blog post format
 */
export function transformToBlogPost(rawPost: any): TestBlogPost {
  const frontmatter = rawPost.frontmatter || rawPost.meta || rawPost
  const slug = rawPost.id?.split('/').pop()?.replace('.md', '') || 'untitled'
  
  return {
    ...rawPost,
    _path: `/blog/${slug}`,
    title: frontmatter?.title || rawPost.title || 'Untitled Post',
    description: frontmatter?.description || rawPost.description || 'No description available',
    date: String(frontmatter?.date || rawPost.date || '2024-01-01'),
    author: frontmatter?.author || rawPost.author || 'Unknown Author',
    tags: Array.isArray(frontmatter?.tags || rawPost.tags) 
      ? frontmatter?.tags || rawPost.tags 
      : [],
    category: frontmatter?.category || rawPost.category || 'uncategorized',
    draft: frontmatter?.draft || rawPost.draft || false
  }
}

/**
 * Filters posts by search query
 */
export function filterPostsBySearch(posts: TestBlogPost[], query: string): TestBlogPost[] {
  const searchTerm = query.toLowerCase()
  
  return posts.filter(post => 
    post.title?.toLowerCase().includes(searchTerm) ||
    post.description?.toLowerCase().includes(searchTerm) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.author?.toLowerCase().includes(searchTerm)
  )
}

/**
 * Filters posts by category
 */
export function filterPostsByCategory(posts: TestBlogPost[], category: string): TestBlogPost[] {
  return posts.filter(post => post.category === category)
}

/**
 * Filters posts by tag
 */
export function filterPostsByTag(posts: TestBlogPost[], tag: string): TestBlogPost[] {
  return posts.filter(post => post.tags?.includes(tag))
}

/**
 * Sorts posts by different criteria
 */
export function sortPosts(posts: TestBlogPost[], sortBy: string): TestBlogPost[] {
  const sorted = [...posts]
  
  switch (sortBy) {
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return sorted
  }
}

/**
 * Gets unique categories from posts
 */
export function getUniqueCategories(posts: TestBlogPost[]): string[] {
  const categories = posts.map(post => post.category).filter(Boolean)
  return [...new Set(categories)].sort()
}

/**
 * Gets unique tags from posts
 */
export function getUniqueTags(posts: TestBlogPost[]): string[] {
  const tags = posts.flatMap(post => post.tags || [])
  return [...new Set(tags)].sort()
}

/**
 * Calculates reading time for a post
 */
export function calculateReadingTime(post: TestBlogPost): number {
  const wordsPerMinute = 200
  let wordCount = 0
  
  // Count words in title and description
  wordCount += post.title.split(/\s+/).length
  wordCount += post.description.split(/\s+/).length
  
  // Count words in body if available
  if (post.body) {
    const bodyText = typeof post.body === 'string' 
      ? post.body 
      : JSON.stringify(post.body)
    wordCount += bodyText.split(/\s+/).length
  }
  
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Validates SEO meta tags in HTML
 */
export function validateSEOTags(html: string): { valid: boolean; missing: string[] } {
  const requiredTags = [
    '<title>',
    'og:title',
    'og:description',
    'og:type',
    'og:url'
  ]
  
  const missing: string[] = []
  
  for (const tag of requiredTags) {
    if (!html.includes(tag)) {
      missing.push(tag)
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  }
}

/**
 * Extracts meta tag content from HTML
 */
export function extractMetaContent(html: string, property: string): string | null {
  const regex = new RegExp(`<meta[^>]*(?:property|name)="${property}"[^>]*content="([^"]*)"`, 'i')
  const match = html.match(regex)
  return match ? match[1] : null
}

/**
 * Validates component rendering in HTML
 */
export function validateComponentRendering(html: string, componentName: string): boolean {
  // Check for component-specific classes or attributes
  const componentPatterns = {
    'ProseAlert': /bg-(blue|yellow|red|green)-50/,
    'ProseCallout': /bg-gradient-to-r.*from-primary/,
    'ProseImg': /NuxtImg|nuxt-img/,
    'ProseCode': /relative.*my-4/
  }
  
  const pattern = componentPatterns[componentName as keyof typeof componentPatterns]
  return pattern ? pattern.test(html) : html.includes(componentName)
}