# Design Document

## Overview

The Nuxt Content implementation will transform the existing basic blog structure into a fully functional content management system. The design leverages Nuxt Content v2 module to provide markdown-based content authoring, automatic routing, and seamless integration with the existing Nuxt UI components.

## Architecture

### Content Structure
```
content/
├── blog/
│   ├── post-1.md
│   ├── post-2.md
│   └── index.md
└── pages/
    ├── about.md
    └── projects.md
```

### Module Integration
- **@nuxt/content**: Core content management module
- **@nuxt/ui**: Existing UI components for consistent styling
- **@nuxtjs/color-mode**: Existing theme support
- **@nuxt/image**: Image optimization for content assets

### Content Flow
```mermaid
graph TD
    A[Markdown Files] --> B[Nuxt Content Parser]
    B --> C[Content API]
    C --> D[Vue Components]
    D --> E[Rendered Pages]
    F[Frontmatter] --> B
    G[Assets] --> H[@nuxt/image]
    H --> D
```

## Components and Interfaces

### Content API Integration
- `queryContent()`: Primary API for fetching content
- `$content`: Global content instance
- Content navigation helpers for building menus and pagination

### Page Components
1. **Blog Index (`/blog`)**
   - Lists all blog posts with metadata
   - Supports pagination and filtering
   - Integrates with UCard components for post previews

2. **Blog Post (`/blog/[slug]`)**
   - Renders individual markdown content
   - Displays metadata (date, author, tags)
   - Includes navigation to previous/next posts

3. **Content Components**
   - Custom prose components for markdown rendering
   - Code syntax highlighting integration
   - Image optimization through @nuxt/image

### Content Query Patterns
```typescript
// Fetch all blog posts
const { data: posts } = await queryContent('/blog')
  .where({ _draft: false })
  .sort({ date: -1 })
  .find()

// Fetch single post
const { data: post } = await queryContent('/blog', slug)
  .findOne()
```

## Data Models

### Blog Post Frontmatter Schema
```yaml
---
title: string (required)
description: string (required)
date: Date (required)
author: string (optional)
tags: string[] (optional)
category: string (optional)
image: string (optional)
draft: boolean (default: false)
---
```

### Content Navigation Schema
```typescript
interface ContentNavigation {
  title: string
  _path: string
  children?: ContentNavigation[]
}
```

## Error Handling

### Content Not Found
- 404 error pages for missing content
- Graceful fallbacks for malformed frontmatter
- Development warnings for content issues

### Build-time Validation
- Frontmatter schema validation
- Broken link detection
- Image reference validation

## Testing Strategy

### Content Validation Tests
- Frontmatter schema compliance
- Markdown parsing accuracy
- Content API query functionality

### Component Integration Tests
- Blog index rendering with mock content
- Individual post rendering
- Navigation component functionality

### End-to-End Tests
- Content creation and rendering workflow
- SEO metadata generation
- Image optimization integration

## Implementation Considerations

### Performance Optimizations
- Static generation for blog content
- Image optimization through @nuxt/image
- Content caching strategies

### SEO Integration
- Automatic meta tag generation from frontmatter
- Structured data for blog posts
- Sitemap generation for content

### Development Experience
- Hot reload for content changes
- Content validation in development
- TypeScript support for content queries