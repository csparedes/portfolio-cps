<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Blog</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Discover articles about web development, Vue.js, and modern
        technologies.
      </p>
    </div>

    <div class="mb-8 space-y-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <UInput v-model="searchQuery" placeholder="Search articles..." icon="i-heroicons-magnifying-glass"
            size="lg" />
        </div>
        <USelect v-model="sortBy" :items="sortOptions" size="lg" class="w-full sm:w-48" />
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
        Error Loading Posts
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        There was an error loading the blog posts. Please try again later.
      </p>
    </div>

    <div v-else-if="!error && paginatedPosts.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="post in paginatedPosts" :key="post._path" variant="subtle"
        class="hover:shadow-lg transition-shadow duration-200 cursor-pointer" @click="navigateTo(post._path)">
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
    </div>

    <div v-else-if="!error && !pending" class="text-center py-12">
      <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-xl font-semibold mb-2">No articles found</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Try adjusting your search or filter criteria.
      </p>
      <UButton @click="clearFilters" variant="outline"> Clear Filters </UButton>
    </div>

    <div v-if="totalPages > 1" class="mt-12 flex justify-center">
      <UPagination v-model="currentPage" :page-count="postsPerPage" :total="filteredPosts.length" :max="5" show-last
        show-first />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Enhanced SEO and meta
const siteUrl = 'https://your-domain.com' // Replace with your actual domain
const pageUrl = `${siteUrl}/blog`
const blogTitle = "Blog - Latest Articles and Tutorials"
const blogDescription = "Discover the latest articles about web development, Vue.js, TypeScript, and modern technologies."

useSeoMeta({
  title: blogTitle,
  description: blogDescription,
  ogTitle: blogTitle,
  ogDescription: blogDescription,
  ogType: "website",
  ogUrl: pageUrl,
  ogImage: `${siteUrl}/og-blog.jpg`,
  twitterCard: 'summary_large_image',
  twitterTitle: blogTitle,
  twitterDescription: blogDescription,
  twitterImage: `${siteUrl}/og-blog.jpg`,
  robots: 'index, follow'
});

// Reactive state
const searchQuery = ref("");
const selectedCategory = ref<string | null>(null);
const selectedTag = ref<string | null>(null);
const sortBy = ref("date-desc");
const currentPage = ref(1);
const postsPerPage = 9;

// Sort options
const sortOptions = [
  { label: "Newest First", value: "date-desc" },
  { label: "Oldest First", value: "date-asc" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
];

// Data fetching
const { data: posts, pending, error } = await useAsyncData("blog-posts", async () => {
  try {
    const result = await queryCollection("docs").all();

    if (!result?.length) return [];

    const blogPosts = result.filter((item: any) =>
      item.id?.includes("blog/") && !item.id.includes("blog/index.md")
    );

    return blogPosts.map((post: any) => {
      const frontmatter = post.frontmatter || post.meta || post;
      const slug = post.id.split("/").pop()?.replace(".md", "");

      return {
        ...post,
        _path: `/blog/${slug}`,
        date: String(frontmatter?.date || post.date || "2024-01-01"),
        tags: Array.isArray(frontmatter?.tags || post.tags) 
          ? frontmatter?.tags || post.tags 
          : [],
        category: frontmatter?.category || post.category || "uncategorized",
        author: frontmatter?.author || post.author || "Unknown Author",
        description: frontmatter?.description || post.description || post.title,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (err) {
    console.error("Blog posts fetch error:", err);
    return [];
  }
});

// Computed properties for filtering and sorting
const availableCategories = computed(() => {
  if (!posts.value) return [];
  const categories = posts.value.map((post: any) => post.category).filter(Boolean);
  return [...new Set(categories)].sort();
});

const availableTags = computed(() => {
  if (!posts.value) return [];
  const tags = posts.value.flatMap((post: any) => post.tags || []);
  return [...new Set(tags)].sort();
});

const filteredPosts = computed(() => {
  if (!posts.value) return [];

  let filtered = posts.value.filter(
    (post: any) => post._path !== "/blog/index" && post.title && !(post as any).draft
  );

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((post: any) =>
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((post: any) => post.category === selectedCategory.value);
  }

  if (selectedTag.value) {
    filtered = filtered.filter((post: any) => post.tags?.includes(selectedTag.value));
  }

  const sortFunctions = {
    "date-desc": (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    "date-asc": (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    "title-asc": (a: any, b: any) => a.title.localeCompare(b.title),
    "title-desc": (a: any, b: any) => b.title.localeCompare(a.title),
  };

  return filtered.sort(sortFunctions[sortBy.value as keyof typeof sortFunctions] || (() => 0));
});

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / postsPerPage)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

// Utility functions
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = null;
  selectedTag.value = null;
  sortBy.value = "date-desc";
  currentPage.value = 1;
};

// Reset pagination when filters change
watch([searchQuery, selectedCategory, selectedTag, sortBy], () => {
  currentPage.value = 1;
});
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
