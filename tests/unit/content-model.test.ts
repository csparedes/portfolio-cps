import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')
const isoDate = /^\d{4}-\d{2}-\d{2}$/
const blogCategories = new Set(['demo', 'guide', 'learning', 'tips', 'tutorial'])
const projectCategories = new Set(['Mobile App', 'Web App'])
const projectStatuses = new Set(['deployed', 'in-development', 'offline'])

const contentFiles = (collection: 'blog' | 'projects') =>
  readdirSync(resolve(root, 'content', collection))
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({ file, source: readFileSync(resolve(root, 'content', collection, file), 'utf8') }))

const scalar = (source: string, key: string) => {
  const value = source.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))?.[1]?.trim()
  if (!value) return undefined
  const quote = value[0]
  return (quote === '"' || quote === "'") && value.at(-1) === quote
    ? value.slice(1, -1)
    : value
}

describe('editorial content contract', () => {
  it('keeps the blog index out of the article collection', () => {
    expect(existsSync(resolve(root, 'content/blog/index.md'))).toBe(false)
  })

  it.each(contentFiles('blog'))('validates blog frontmatter for $file', ({ source }) => {
    expect(scalar(source, 'title')).toBeTruthy()
    expect(scalar(source, 'description')).toBeTruthy()
    expect(scalar(source, 'date')).toMatch(isoDate)
    expect(blogCategories.has(scalar(source, 'category') ?? '')).toBe(true)
    expect(scalar(source, 'draft')).toMatch(/^(true|false)$/)

    const image = scalar(source, 'image')
    expect(image).toMatch(/^\//)
    expect(existsSync(resolve(root, 'public', image!.slice(1)))).toBe(true)
  })

  it.each(contentFiles('projects'))('validates project frontmatter and assets for $file', ({ source }) => {
    expect(scalar(source, 'date')).toMatch(isoDate)
    expect(projectCategories.has(scalar(source, 'category') ?? '')).toBe(true)
    expect(projectStatuses.has(scalar(source, 'status') ?? '')).toBe(true)

    const image = scalar(source, 'image')
    expect(image).toMatch(/^\//)
    expect(existsSync(resolve(root, 'public', image!.slice(1)))).toBe(true)

    for (const match of source.matchAll(/^\s+- src:\s*(\/[^\r\n]+)$/gm)) {
      expect(existsSync(resolve(root, 'public', match[1]!.slice(1)))).toBe(true)
    }
  })

  it('protects drafts in detail, adjacent, listing, and homepage queries', () => {
    const blogDetail = readFileSync(resolve(root, 'app/pages/blog/[slug].vue'), 'utf8')
    const projectDetail = readFileSync(resolve(root, 'app/pages/projects/[slug].vue'), 'utf8')
    const homepage = readFileSync(resolve(root, 'app/pages/index.vue'), 'utf8')
    const filtering = readFileSync(resolve(root, 'app/composables/useContentFiltering.ts'), 'utf8')

    expect(blogDetail).toContain('!result || result.draft')
    expect(blogDetail).toContain('.filter((p) => !p.draft)')
    expect(projectDetail).toContain('!result || result.draft')
    expect(projectDetail).toContain('.filter((p) => !p.draft)')
    expect(homepage).toContain('.filter((project) => !project.draft)')
    expect(filtering).toContain('!item.draft')
  })
})
