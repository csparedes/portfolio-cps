<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Projects</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Developed projects.
      </p>
    </div>

    <div class="mb-8 space-y-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <UInput v-model="searchQuery" placeholder="Search projects..." icon="i-heroicons-magnifying-glass"
            size="lg" />
        </div>
        <USelect v-model="sortBy" :items="constants.sortOptions" size="lg" class="w-full sm:w-48" />
      </div>

      
      <div class="flex flex-wrap gap-2">
        <UButton :variant="selectedCategory === null ? 'solid' : 'outline'" @click="selectedCategory = null" size="sm">
          All Categories
        </UButton>
        <UButton v-for="category in availableCategories" :key="category"
          :variant="selectedCategory === category ? 'solid' : 'outline'" @click="selectedCategory = category" size="sm">
          {{ category }}
        </UButton>
      </div>

      <div class="flex flex-wrap gap-2">
        <UButton :variant="selectedTag === null ? 'solid' : 'outline'" @click="selectedTag = null" size="sm">
          All Tags
        </UButton>
        <UButton v-for="tag in availableTags" :key="tag" :variant="selectedTag === tag ? 'solid' : 'outline'"
          @click="selectedTag = tag" size="sm">
          #{{ tag }}
        </UButton>
      </div>
    </div>

    <div v-if="pending" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 mx-auto text-red-400 mb-4" />
      <h3 class="text-xl font-semibold mb-2 text-red-600">
        Error Loading Projects.
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        There was an error loading the projects. Please try again later.
      </p>
    </div>

    <div v-else-if="!error && paginatedPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink v-for="post in paginatedPosts" :key="post._path" :to="post._path"
        class="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <UCard variant="subtle" class="hover:shadow-lg transition-shadow duration-200">
        <template #header>
          <div class="space-y-2">
            <div class="flex justify-between items-start">
              <span v-if="post.category"
                class="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {{ post.category }}
              </span>
              <time class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(post.date) }}
              </time>
            </div>
            <h2 class="text-xl font-bold line-clamp-2">{{ post.title }}</h2>
          </div>
        </template>

        <div class="space-y-3">
          <p class="text-gray-600 dark:text-gray-400 line-clamp-3">
            {{ post.description }}
          </p>

          <div v-if="post.author" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-user" class="w-4 h-4 mr-1" />
            {{ post.author }}
          </div>
        </div>

        <template #footer>
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in post.tags?.slice(0, 3)" :key="tag"
              class="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
              #{{ tag }}
            </span>
            <span v-if="post.tags && post.tags.length > 3"
              class="inline-block px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{{ post.tags.length - 3 }} more
            </span>
          </div>
        </template>
        </UCard>
      </NuxtLink>
    </div>

    <div v-else-if="!error && !pending" class="text-center py-12">
      <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-xl font-semibold mb-2">No projects found</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Try adjusting your search or filter criteria.
      </p>
      <UButton @click="clearFilters" variant="outline"> Clear Filters </UButton>
    </div>

    <div v-if="totalPages > 1" class="mt-12 flex justify-center">
      <UPagination v-model="currentPage" :page-count="constants.postsPerPage" :total="filteredPosts.length" :max="5" show-last
        show-first />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Project } from "~/composables/types"

const siteUrl = useEnvironment().siteUrl
const pageUrl = `${siteUrl}/projects`
const projectsTitle = "Projects - Development Portfolio"
const projectsDescription = "Check out my projects, from web apps to mobile development"

useSeoMeta({
  title: projectsTitle,
  description: projectsDescription,
  ogTitle: projectsTitle,
  ogDescription: projectsDescription,
  ogType: "website",
  ogUrl: pageUrl,
  ogImage: `${siteUrl}/og-default.svg`,
  twitterCard: "summary_large_image",
  twitterTitle: projectsTitle,
  twitterDescription: projectsDescription,
  twitterImage: `${siteUrl}/og-default.svg`,
  robots: "index, follow",
})

const constants = useConstants()
const searchQuery = ref("")
const selectedCategory = ref<string | null>(null)
const selectedTag = ref<string | null>(null)
const sortBy = ref("date-desc")
const currentPage = ref(1)

const { data: projects, pending, error } = await useAsyncData("projects-posts", async () => {
  try {
    const result = await queryCollection("projects").all()
    if (!result?.length) return []

    return result
      .map((project) => {
        const slug = project.id.split("/").pop()?.replace(".md", "")
        return {
          ...project,
          _path: `/projects/${slug}`,
        } as Project
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (err) {
    console.error("Projects fetch error:", err)
    return []
  }
})

const availableCategories = computed(() => {
  if (!projects.value) return []
  const categories = projects.value.map((project) => project.category).filter(Boolean)
  return [...new Set(categories)].sort()
})

const availableTags = computed(() => {
  if (!projects.value) return []
  const tags = projects.value.flatMap((project) => project.tags || [])
  return [...new Set(tags)].sort()
})

const filteredPosts = computed(() => {
  if (!projects.value) return []

  let filtered = projects.value.filter(
    (project) => project.title && !project.draft
  )

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (project) =>
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((project) => project.category === selectedCategory.value)
  }

  if (selectedTag.value) {
    const tag = selectedTag.value
    filtered = filtered.filter((project) => project.tags?.includes(tag))
  }

  const sortFunctions = {
    "date-desc": (a: Project, b: Project) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
    "date-asc": (a: Project, b: Project) =>
      new Date(a.date).getTime() - new Date(b.date).getTime(),
    "title-asc": (a: Project, b: Project) => a.title.localeCompare(b.title),
    "title-desc": (a: Project, b: Project) => b.title.localeCompare(a.title),
  }

  return filtered.sort(
    sortFunctions[sortBy.value as keyof typeof sortFunctions] || (() => 0)
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / constants.postsPerPage)
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * constants.postsPerPage
  const end = start + constants.postsPerPage
  return filteredPosts.value.slice(start, end)
})

const { formatDate } = useDateFormatter()

const clearFilters = () => {
  searchQuery.value = ""
  selectedCategory.value = null
  selectedTag.value = null
  sortBy.value = "date-desc"
  currentPage.value = 1
}

watch([searchQuery, selectedCategory, selectedTag, sortBy], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
