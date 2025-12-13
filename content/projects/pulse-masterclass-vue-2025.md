---
tags:
  - vue
  - pinia
  - tankstack/table
  - tankstack/forms
  - vite
  - shadcn/vue
  - supabase
title: Pulse Masterclass Vue 2025
description: This is a project based on a masterclass vue, with a custom
  features added by myself
seo:
  title: Pulse App
author: Cristian Paredes
---

# Pulse Masterclass Vue 2025 page

````mdc
# Pulse - Vue.js Masterclass 2025

A comprehensive Vue 3 project management application built as part of the Vue.js Masterclass 2025 course. Pulse demonstrates modern Vue 3 patterns, state management with Pinia, real-time database integration with Supabase, and advanced performance optimizations.

## Project Overview

Pulse is a full-featured task and project management application that showcases enterprise-level Vue 3 development practices. It combines a responsive UI built with Tailwind CSS and Shadcn/vue components with a robust backend powered by Supabase PostgreSQL database.

### Key Technologies

- **Frontend Framework**: Vue 3 with TypeScript
- **Build Tool**: Vite 7
- **State Management**: Pinia with store composition API
- **UI Framework**: Tailwind CSS 4 + shadcn/vue component library
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: TanStack Vue Form v1
- **Data Table**: TanStack Vue Table v8
- **Routing**: Vue Router 4 with auto-generated routes
- **Authentication**: Supabase Auth
- **Development Tools**: Vue DevTools, ESLint, TypeScript

## Features

### Core Functionality

#### 1. **User Authentication & Profiles**
- Email-based sign up and sign in with Supabase Auth
- User profile management with avatar support
- Session tracking and persistent authentication
- Profile persistence and user identity validation

#### 2. **Project Management**
- Create, read, update projects with slug-based routing
- Project descriptions and metadata
- Collaborative project support with multiple collaborators
- Related tasks display per project
- In-place project name editing with automatic slug generation

#### 3. **Task Management**
- Full CRUD operations for tasks
- Task status tracking and updates
- Task-to-project associations
- Due date management
- Collaborative task assignments
- In-place task editing with real-time updates

#### 4. **Collaboration Features**
- Manage project and task collaborators
- Display collaborator avatars and profiles
- Profile browsing by username
- Grouped collaborator data fetching with optimization

#### 5. **User Profiles & Discovery**
- Public user profile pages
- Profile viewing by username
- Display user-specific tasks and information

### Advanced Features

#### **Real-time Data Synchronization**
- Supabase real-time subscriptions
- Optimistic UI updates
- Data validation and cache management

#### **Smart Loading & Caching**
- Memoized query results using `@vueuse/core` `useMemoize`
- Cache validation to prevent stale data
- Null state management during data fetching
- Network error handling and recovery

#### **Error Handling**
- Centralized error store with Pinia
- Development and production error sections
- User-friendly error messages
- Global error capture with `onErrorCaptured` lifecycle hook

#### **Toast Notifications**
- Custom composable-based toast system
- Success, error, and info notification types
- Duration-based auto-dismiss
- Queue management for multiple notifications

## Architecture & Patterns

### State Management with Pinia

The application uses a modular Pinia store architecture with separate stores for different concerns:

- **auth-store**: Manages user authentication state, session tracking, and profile data
- **page-store**: Tracks page metadata like titles
- **error-store**: Centralized error management
- **projects-store** (loader): Handles project queries with memoization and cache validation
- **tasks-store** (loader): Manages task queries with the same optimization pattern

**Store Optimizations:**
- Memoized query functions prevent redundant database calls
- Cache validation compares returned data with stored state
- Automatic cache invalidation and refresh mechanisms
- Composition API-based stores for better code organization and tree-shaking

### Suspense for Async Operations

The application leverages Vue 3's `<Suspense>` component for elegant async handling:

- Wraps route components in the main App.vue
- Shows loading spinner during component async setup
- Timeout set to 0 for immediate fallback on pending promise
- Integrates with async data fetching in page components

```vue
<Suspense v-if="Component" :timeout="0">
  <Component :is="Component" />
  <template #fallback>
    <Spinner class="size-8" />
  </template>
</Suspense>
```

### Supabase Integration

#### Database Schema
- **profiles**: User information with authentication link
- **projects**: Project metadata with collaborator arrays
- **tasks**: Task details with project associations and collaborators

#### Query Patterns
- Typed queries using Supabase `QueryData` for full type safety
- Relationship queries with `.select()` for nested data
- Condition filtering with `.eq()` and `.in()`
- Single/multiple row operations with `.single()` option

#### Client Initialization
```typescript
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
```

### Composables

#### **useCollabs**
- Fetches collaborator profiles by user IDs
- Groups collaborators for multiple items
- Returns typed collaborator data with avatars and profiles

#### **useToast**
- Manages toast notifications
- Supports different notification types
- Composable for adding notifications throughout the app

#### **useFormErrors**
- Handles form validation errors
- Provides error state management for forms

### Auto-Imports & Plugin Configuration

The project uses `unplugin-auto-import` and `unplugin-vue-components` for:
- Automatic Vue API imports (ref, computed, watch, etc.)
- Vue Router auto imports (useRouter, useRoute, etc.)
- Pinia store auto imports
- Component auto-registration
- File-based routing with `unplugin-vue-router`

### Form Handling with TanStack Vue Form

- Reactive form state management
- Built-in validation with Zod integration
- Field-level error handling
- Type-safe form submissions

### Data Tables with TanStack Vue Table

- Server-side data table rendering
- Sortable and filterable columns
- Display of project and task data
- Collaborator information integration

## Development Workflow

### Project Setup

```sh
npm install
```

### Environment Variables

Create a `.env.local` file with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

### Development Server

```sh
npm run dev
```

Starts Vite dev server with hot-reload for all components and styles.

### Database Operations

```sh
# Login to Supabase CLI
npm run supabase:login

# Link to Supabase project
npm run supabase:link

# Create new migration
npm run db:migrate:new

# Reset database to latest migrations
npm run db:reset

# Seed database with sample data
npm run db:seed

# Generate TypeScript types from database schema
npm run supabase:types
```

### Type Checking

```sh
npm run type-check
```

Validates TypeScript in Vue files using `vue-tsc`.

### Production Build

```sh
npm run build
```

Type-checks and builds optimized production bundle.

### Code Quality

```sh
npm run lint
```

Lints and auto-fixes code with ESLint.

## Development Process - Git Commits

The project development follows a structured commit history:

### Recent Commits (Release Branch)
- **f6a893a**: Refactor Supabase client initialization and remove commented code
- **77878bf**: Add example environment variable values
- **797c8f9**: Streamline task/project loading logic, enhance toast notifications
- **5cd89e5**: Fix unused imports and type adjustments
- **a63cb0f**: Refactor TanStack form dependencies

### Feature Development
- **9f6c938**: Update dependencies and enhance task creation form
- **34a1c90**: Fix adjustments in all pages
- **5a72b46**: Add custom toast, spinner, and icon enhancements
- **26edbc9**: Working in vue mastery course checkpoint
- **5e7a057**: Add tasks feature
- **7a7dc07**: Status edit functionality
- **da7abf1**: Add validations and CRUD operations
- **76f23db**: Error validation handling
- **0b9b9ad**: Dynamic data fetching
- **79f6a5c**: Pinia state management integration
- **3ee00c2**: Auto imports global configuration
- **3ac91ab**: Supabase backend setup complete

### Development Philosophy
- Incremental feature development with clear commit messages
- Refactoring and optimization improvements
- Dependency management and updates
- Error handling and validation enhancements

## File Structure

```
src/
├── components/
│   ├── app/              # App-specific components (edit, input, status)
│   ├── error/            # Error page components
│   ├── layout/           # Layout components (sidebar, navbar, auth layouts)
│   └── ui/               # Reusable UI components (buttons, cards, dropdowns, etc.)
├── composables/          # Vue composables (collabs, form-errors, toast)
├── lib/                  # Library integrations (supabase-client)
├── pages/                # File-based routes (projects, tasks, users, auth)
├── router/               # Router configuration
├── stores/               # Pinia stores and loaders
├── types/                # TypeScript type definitions
└── utils/                # Utility functions and Supabase queries
```

## Optimizations

### Performance

1. **Query Memoization**: Uses `@vueuse/core` `useMemoize` to cache expensive queries
2. **Cache Validation**: Compares fetched data with stored state to avoid unnecessary updates
3. **Lazy Component Loading**: Async component definitions with `defineAsyncComponent`
4. **Suspense Boundaries**: Graceful handling of async operations with loading states
5. **Tree-shaking**: Auto imports only used functions and stores
6. **Bundle Optimization**: Vite's module federation and code splitting

### Store Optimizations

- **Memoized loaders**: Store state and computed properties
- **Watch patterns**: Reactive updates for related fields (e.g., slug generation)
- **Validation before updates**: Cache validation before committing state changes
- **Error state integration**: Proper error handling integrated with centralized error store

### Data Loading

- Null state management during fetch operations
- Parallel loading of collaborator data using `Promise.all`
- Efficient query filtering and selection
- Supabase relationship queries to reduce API calls

## IDE & Browser Setup

### Recommended IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (disable Vetur if installed).

### Browser DevTools

**Chromium-based browsers (Chrome, Edge, Brave):**
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Enable Custom Object Formatter](http://bit.ly/object-formatters)

**Firefox:**
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Enable Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Safety

This project uses TypeScript with full type support for Vue components. Type information for `.vue` imports is handled by `vue-tsc` and the Volar extension.

- **database/types.ts**: Auto-generated Supabase types
- **src/types/**: Custom application types for forms, auth, and data structures
- **Full type checking** in all composables, stores, and utilities

## Further Reference

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Configuration Reference](https://vite.dev/config/)
- [Pinia Store Documentation](https://pinia.vuejs.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vue Router Documentation](https://router.vuejs.org/)
````
