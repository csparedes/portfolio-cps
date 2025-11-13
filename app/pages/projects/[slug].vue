<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <!-- Error State (404) -->
    <div v-else-if="error || !project" class="text-center py-12">
      <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h1 class="text-3xl font-bold mb-4">Project Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The project post you're looking for doesn't exist or has been moved.
      </p>
      <UButton @click="navigateTo('/projects')" variant="outline">
        Back to Projects
      </UButton>
    </div>

    <!-- Blog Post Content -->
    <article v-else class="max-w-4xl mx-auto">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <ULink to="/" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          Home
        </ULink>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        <ULink to="/projects" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          Projects
        </ULink>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
        <span class="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs">
          {{ project?.title }}
        </span>
      </nav>

      <!-- Post Header -->
      <header class="mb-8 flex flex-col gap-4">
        <!-- Category Badge -->
        <div class="mb-4">
          <UBadge v-if="project" variant="subtle" size="lg">
            {{ project.category }}
          </UBadge>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {{ project.title }}
        </h1>

        <!-- Description -->
        <p v-if="project.description" class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {{ project.description }}
        </p>

        <!-- Meta Information -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <!-- Date -->
          <div class="flex items-center">
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 mr-2" />
            <time :datetime="project.date">{{ formatDate(project.date) }}</time>
          </div>

          <!-- Author -->
          <div v-if="project.author" class="flex items-center">
            <UIcon name="i-heroicons-user" class="w-4 h-4 mr-2" />
            <span>{{ project.author }}</span>
          </div>
          <!-- Status -->
          <div v-if="project.status" class="flex items-center">
            <UIcon name="heroicons:code-bracket" class="w-4 h-4 mr-2" />
            <span>{{ project.status }}</span>
          </div>

          <!-- Reading Time (estimated) -->
          <div class="flex items-center">
            <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-2" />
            <span>{{ readingTime }} min read</span>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="project.tags && project.tags.length > 0" class="flex flex-wrap gap-2">
          <UBadge v-for="tag in project.tags" :key="tag" variant="outline" size="sm">
            #{{ tag }}
          </UBadge>
        </div>
      </header>

      <div class="mb-8" />

      <!-- Post Content -->
      <div class="max-w-none blog-content">
        <ContentRenderer v-if="project" :value="project" />
      </div>

      <!-- Post Footer -->
      <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <!-- Navigation to other posts -->
        <div class="flex justify-between items-center">
          <UButton v-if="previousPost" @click="navigateTo(previousPost._path)" variant="outline"
            icon="i-heroicons-arrow-left">
            Previous Project
          </UButton>
          <div v-else></div>

          <UButton v-if="nextPost" @click="navigateTo(nextPost._path)" variant="outline"
            trailing-icon="i-heroicons-arrow-right">
            Next Project
          </UButton>
          <div v-else></div>
        </div>

        <!-- Back to Blog -->
        <div class="text-center mt-8">
          <UButton @click="navigateTo('/projects')" variant="ghost" label="Back to All projects"
            icon="material-symbols:arrow-back" />
        </div>
      </footer>
    </article>
  </div>
</template>

<script lang="ts" setup>
// Get the slug from the route
const route = useRoute()
const slug = route.params.slug as string

// Fetch the blog post
const { data: project, pending, error } = await useAsyncData(`projects-post-${slug}`, async () => {
  try {
    const result = await queryCollection("projects").path(route.path).first()

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Projects not found'
      })
    }

    return result
  } catch (err) {
    console.error("Error fetching project post:", err)
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    })
  }
})

// Fetch adjacent posts for navigation
const { data: adjacentProjects } = await useAsyncData(`adjacent-projects-${slug}`, async () => {
  try {
    const allPosts = await queryCollection("projects").all()

    if (allPosts && allPosts.length > 0) {
      const blogPosts = allPosts
        .filter((item: any) =>
          item.id &&
          item.id.includes("blog/") &&
          !item.id.includes("blog/index.md")
        )
        .map((post: any) => {
          const frontmatter = post.frontmatter || post.meta || post
          return {
            ...post,
            _path: `/blog/${post.id.split("/").pop()?.replace(".md", "")}`,
            date: String(frontmatter?.date || post.date || "2024-01-01"),
            title: frontmatter?.title || post.title || "Untitled Post"
          }
        })
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

      const currentIndex = blogPosts.findIndex((p: any) => p._path === `/blog/${slug}`)

      return {
        previous: currentIndex > 0 ? blogPosts[currentIndex - 1] : null,
        next: currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null
      }
    }

    return { previous: null, next: null }
  } catch (err) {
    console.error("Error fetching adjacent posts:", err)
    return { previous: null, next: null }
  }
})

const previousPost = computed(() => adjacentProjects.value?.previous)
const nextPost = computed(() => adjacentProjects.value?.next)

// Calculate estimated reading time
const readingTime = computed(() => {
  if (!project.value?.body) return 1
  const wordsPerMinute = 200
  // Convert body to string if it's not already
  const bodyText = typeof project.value.body === 'string'
    ? project.value.body
    : JSON.stringify(project.value.body)
  const wordCount = bodyText.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

// Format date helper
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Enhanced SEO Meta tags with automatic data from frontmatter
watchEffect(() => {
  if (project.value) {
    const siteUrl = useEnvironment().siteUrl // Replace with your actual domain
    const postUrl = `${siteUrl}/blog/${slug}`
    const imageUrl = project.value.image ? `${siteUrl}${project.value.image}` : `${siteUrl}/og-default.jpg`

    useSeoMeta({
      title: project.value.title,
      description: project.value.description,
      ogTitle: project.value.title,
      ogDescription: project.value.description,
      ogType: 'article',
      ogUrl: postUrl,
      ogImage: imageUrl,
      twitterCard: 'summary_large_image',
      twitterTitle: project.value.title,
      twitterDescription: project.value.description,
      twitterImage: imageUrl,
      articleAuthor: project.value.author ? [project.value.author] : undefined,
      articlePublishedTime: project.value.date,
      articleModifiedTime: project.value.date,
      articleSection: project.value.category,
      articleTag: project.value.tags || undefined,
      robots: 'index, follow',
    })
  }
})

// Handle 404 errors
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found'
  })
}
</script>

<style scoped>
.blog-content :deep(h1) {
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(17 24 39);
  margin-bottom: 1.5rem;
  margin-top: 2rem;
}

.blog-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(17 24 39);
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.blog-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

.blog-content :deep(h4) {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.blog-content :deep(p) {
  color: rgb(55 65 81);
  margin-bottom: 1rem;
  line-height: 1.625;
}

.blog-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.blog-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.blog-content :deep(ol li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(li) {
  color: rgb(55 65 81);
}

.blog-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary-500);
  padding-left: 1rem;
  font-style: italic;
  color: rgb(75 85 99);
  margin: 1rem 0;
}

.blog-content :deep(code) {
  background-color: rgb(243 244 246);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  color: rgb(31 41 55);
}

.blog-content :deep(pre) {
  background-color: rgb(243 244 246);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid rgb(229 231 235);
}

.blog-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  font-size: 0.875rem;
  color: inherit;
}

/* Syntax highlighting support */
.blog-content :deep(.shiki) {
  background-color: transparent !important;
}

.blog-content :deep(.shiki code) {
  background-color: transparent;
  color: inherit;
}

.blog-content :deep(a) {
  color: var(--color-primary-500);
  text-decoration: none;
}

.blog-content :deep(a:hover) {
  color: var(--color-primary-600);
  text-decoration: underline;
}

.blog-content :deep(strong) {
  font-weight: 600;
  color: rgb(17 24 39);
}

.blog-content :deep(em) {
  font-style: italic;
}

.blog-content :deep(hr) {
  border-color: rgb(229 231 235);
  margin: 2rem 0;
}

.blog-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(229 231 235);
  margin: 1rem 0;
}

.blog-content :deep(th) {
  border: 1px solid rgb(229 231 235);
  padding: 0.5rem 1rem;
  background-color: rgb(249 250 251);
  font-weight: 600;
  text-align: left;
}

.blog-content :deep(td) {
  border: 1px solid rgb(229 231 235);
  padding: 0.5rem 1rem;
}

/* Dark mode styles */
.dark .blog-content :deep(h1),
.dark .blog-content :deep(h2),
.dark .blog-content :deep(h3),
.dark .blog-content :deep(h4) {
  color: rgb(243 244 246);
}

.dark .blog-content :deep(p),
.dark .blog-content :deep(li) {
  color: rgb(209 213 219);
}

.dark .blog-content :deep(blockquote) {
  color: rgb(156 163 175);
}

.dark .blog-content :deep(code) {
  background-color: rgb(31 41 55);
  color: rgb(229 231 235);
}

.dark .blog-content :deep(pre) {
  background-color: rgb(31 41 55);
  border-color: rgb(55 65 81);
}

.dark .blog-content :deep(.shiki) {
  background-color: transparent !important;
}

.dark .blog-content :deep(strong) {
  color: rgb(243 244 246);
}

.dark .blog-content :deep(hr) {
  border-color: rgb(55 65 81);
}

.dark .blog-content :deep(table) {
  border-color: rgb(55 65 81);
}

.dark .blog-content :deep(th) {
  border-color: rgb(55 65 81);
  background-color: rgb(31 41 55);
}

.dark .blog-content :deep(td) {
  border-color: rgb(55 65 81);
}
</style>
