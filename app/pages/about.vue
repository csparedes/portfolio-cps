<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <!-- Error State (404) -->
    <div v-else-if="error || !about" class="text-center py-12">
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
      

      <!-- Post Header -->
      

      <div class="mb-8" />

      <!-- Post Content -->
      <div class="max-w-none blog-content">
        <ContentRenderer v-if="about" :value="about" />
      </div>

   
      
    </article>
  </div>
</template>

<script lang="ts" setup>
// Get the slug from the route
const route = useRoute()

// Fetch the blog post
const { data: about, pending, error } = await useAsyncData(`about`, async () => {
  try {
    const result = await queryCollection("about").path(route.path).first()

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: 'About not found'
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

// Calculate estimated reading time
const readingTime = computed(() => {
  if (!about.value?.body) return 1
  const wordsPerMinute = 200
  // Convert body to string if it's not already
  const bodyText = typeof about.value.body === 'string'
    ? about.value.body
    : JSON.stringify(about.value.body)
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
  if (about.value) {
    const siteUrl = useEnvironment().siteUrl // Replace with your actual domain
    const postUrl = `${siteUrl}/about`
    const imageUrl = about.value.image ? `${siteUrl}${about.value.image}` : `${siteUrl}/og-default.jpg`

    useSeoMeta({
      title: about.value.title,
      description: about.value.description,
      ogTitle: about.value.title,
      ogDescription: about.value.description,
      ogType: 'article',
      ogUrl: postUrl,
      ogImage: imageUrl,
      twitterCard: 'summary_large_image',
      twitterTitle: about.value.title,
      twitterDescription: about.value.description,
      twitterImage: imageUrl,
      articleAuthor: about.value.author ? [about.value.author] : undefined,
      articlePublishedTime: about.value.date,
      articleModifiedTime: about.value.date,
      articleSection: about.value.category,
      articleTag: about.value.tags || undefined,
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
