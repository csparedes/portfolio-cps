# Blog Content Test Suite

This directory contains comprehensive tests for the Nuxt Content blog implementation.

## Test Structure

```
tests/
├── unit/                     # Unit tests
│   ├── content-queries.test.ts    # Content API and data transformation tests
│   ├── error-handling.test.ts     # Error handling and edge cases
│   └── search-filtering.test.ts   # Search and filtering functionality
├── integration/              # Integration tests
│   └── blog-pages.test.ts         # Blog page rendering and functionality
├── e2e/                     # End-to-end tests
│   └── content-navigation.test.ts # User navigation workflows
└── utils/                   # Test utilities
    └── test-helpers.ts            # Helper functions and utilities

```

## Test Categories

### 1. Unit Tests

#### Content Queries (`content-queries.test.ts`)
- Tests content API endpoints
- Validates data transformation logic
- Checks frontmatter schema compliance
- Tests sorting and filtering at API level

#### Error Handling (`error-handling.test.ts`)
- Tests 404 handling for missing posts
- Validates malformed frontmatter handling
- Tests content parsing error recovery
- Checks network and performance error handling

#### Search and Filtering (`search-filtering.test.ts`)
- Tests search functionality (title, description, content)
- Validates category and tag filtering
- Tests date-based filtering and sorting
- Checks pagination and limits

### 2. Integration Tests

#### Blog Pages (`blog-pages.test.ts`)
- Tests blog index page rendering
- Validates individual post page functionality
- Checks SEO meta tag generation
- Tests custom component rendering in markdown

### 3. End-to-End Tests

#### Content Navigation (`content-navigation.test.ts`)
- Tests complete user navigation workflows
- Validates search and filter interactions
- Tests responsive behavior
- Checks breadcrumb and post navigation

## Running Tests

### All Tests
```bash
bun run test
```

### Specific Test Categories
```bash
# Unit tests only
bun run test tests/unit

# Integration tests only
bun run test tests/integration

# E2E tests only
bun run test tests/e2e
```

### Watch Mode
```bash
bun run test --watch
```

### UI Mode
```bash
bun run test:ui
```

### Run Tests Once
```bash
bun run test:run
```

## Test Configuration

Tests are configured using Vitest with Nuxt Test Utils:

- **Environment**: Nuxt test environment with happy-dom
- **Framework**: Vitest for fast unit testing
- **E2E**: Playwright integration via @nuxt/test-utils
- **Mocking**: Built-in Vitest mocking capabilities

## Writing New Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('My Feature', async () => {
  await setup()
  
  it('should work correctly', async () => {
    const result = await $fetch('/api/my-endpoint')
    expect(result).toBeDefined()
  })
})
```

### E2E Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { setup, createPage } from '@nuxt/test-utils/e2e'

describe('My Page', async () => {
  await setup()
  
  it('should navigate correctly', async () => {
    const page = await createPage('/my-page')
    await page.click('button')
    expect(page.url()).toContain('/expected-url')
  })
})
```

## Test Data

Tests use the existing blog content in the `content/blog/` directory:

- `getting-started-with-nuxt.md`
- `typescript-best-practices.md`
- `vue-composition-api-tips.md`
- `web-performance-optimization.md`
- `nuxt-content-components-demo.md`

## Coverage

The test suite covers:

- ✅ Content querying and data transformation
- ✅ Blog index and individual post rendering
- ✅ Search and filtering functionality
- ✅ Navigation workflows
- ✅ Error handling and edge cases
- ✅ SEO meta tag generation
- ✅ Custom component rendering
- ✅ Responsive behavior

## Continuous Integration

Tests are designed to run in CI environments and include:

- Fast execution times
- Reliable assertions
- Proper cleanup
- Environment independence

## Troubleshooting

### Common Issues

1. **Tests timing out**: Increase timeout in vitest.config.ts
2. **Content not found**: Ensure content files exist in content/blog/
3. **Component tests failing**: Check component registration in nuxt.config.ts
4. **E2E tests flaky**: Add proper wait conditions and selectors

### Debug Mode

Run tests with debug output:
```bash
DEBUG=1 bun run test
```

### Verbose Output

Get detailed test output:
```bash
bun run test -- --reporter=verbose
```