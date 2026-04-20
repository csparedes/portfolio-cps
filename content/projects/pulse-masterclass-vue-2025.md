---
tags:
  - vue
  - pinia
  - tanstack-table
  - tanstack-form
  - vite
  - shadcn-vue
  - supabase
title: Pulse Masterclass Vue 2025
description: Full-featured task and project management app with Vue 3, Pinia, Supabase, and TanStack libraries
image: /projects/pulse-masterclass-vue-2025/pulse-masterclass-vue-2025-1.png
author: Cristian Paredes
status: deployed
category: Web app
date: 2025-12-13
---

# Pulse - Vue.js Masterclass 2025

A comprehensive Vue 3 project management application showcasing enterprise-level development practices with real-time database integration and advanced state management.

## Key Features

- **Authentication**: Supabase Auth with email-based sign up/in and session tracking
- **Project Management**: Full CRUD with slug-based routing and collaborative support
- **Task Management**: CRUD operations with status tracking, due dates, and assignments
- **Real-time Updates**: Supabase subscriptions with optimistic UI updates
- **Toast Notifications**: Custom composable-based notification system

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Vue 3 + TypeScript |
| Build | Vite 7 |
| State | Pinia |
| UI | Tailwind CSS 4 + shadcn/vue |
| Database | Supabase (PostgreSQL) |
| Forms | TanStack Vue Form v1 |
| Tables | TanStack Vue Table v8 |
| Auth | Supabase Auth |

## Architecture Highlights

### Pinia Store Pattern

```typescript
// Memoized queries with cache validation
const fetchProjects = useMemoize(
  async (userId: string) => {
    const { data } = await supabase
      .from('projects')
      .select()
      .eq('user_id', userId)
    return data
  },
  { maxAge: 60000 }
)
```

### Supabase Integration

```typescript
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)
```

## Development

```sh
npm install
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint
```

## Optimizations

- Query memoization with `@vueuse/core`
- Cache validation to prevent stale data
- Lazy component loading with `defineAsyncComponent`
- Vue 3 `<Suspense>` for async handling

## Screenshots

![Pulse App](/projects/pulse-app-img.png)

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Store](https://pinia.vuejs.org/)
- [Supabase](https://supabase.com/docs)
