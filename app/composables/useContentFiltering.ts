export interface ContentItem {
  _path?: string
  title?: string
  description?: string
  date?: string
  tags?: string[]
  category?: string
  author?: string
  draft?: boolean
  [key: string]: unknown
}

export interface UseContentFilteringOptions {
  items: Ref<ContentItem[]>
  excludePath?: string
}

export const useContentFiltering = (options: UseContentFilteringOptions) => {
  const { items, excludePath } = options
  const constants = useConstants()

  const searchQuery = ref("")
  const selectedCategory = ref<string | null>(null)
  const selectedTag = ref<string | null>(null)
  const sortBy = ref("date-desc")
  const currentPage = ref(1)

  const availableCategories = computed(() => {
    if (!items.value) return []
    const categories = items.value.map((item) => item.category).filter(Boolean)
    return [...new Set(categories)].sort()
  })

  const availableTags = computed(() => {
    if (!items.value) return []
    const tags = items.value.flatMap((item) => item.tags || [])
    return [...new Set(tags)].sort()
  })

  const filteredItems = computed(() => {
    if (!items.value) return []

    let filtered = items.value.filter(
      (item) => item._path !== excludePath && item.title && !item.draft
    )

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter((item) => item.category === selectedCategory.value)
    }

    if (selectedTag.value) {
      const tag = selectedTag.value
      filtered = filtered.filter((item) => item.tags?.includes(tag))
    }

    const sortFunctions = {
      "date-desc": (a: ContentItem, b: ContentItem) =>
        new Date(b.date || "").getTime() - new Date(a.date || "").getTime(),
      "date-asc": (a: ContentItem, b: ContentItem) =>
        new Date(a.date || "").getTime() - new Date(b.date || "").getTime(),
      "title-asc": (a: ContentItem, b: ContentItem) =>
        (a.title || "").localeCompare(b.title || ""),
      "title-desc": (a: ContentItem, b: ContentItem) =>
        (b.title || "").localeCompare(a.title || ""),
    }

    return filtered.sort(
      sortFunctions[sortBy.value as keyof typeof sortFunctions] || (() => 0)
    )
  })

  const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / constants.postsPerPage)
  )

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * constants.postsPerPage
    const end = start + constants.postsPerPage
    return filteredItems.value.slice(start, end)
  })

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

  return {
    searchQuery,
    selectedCategory,
    selectedTag,
    sortBy,
    currentPage,
    sortOptions: constants.sortOptions,
    availableCategories,
    availableTags,
    filteredItems,
    totalPages,
    paginatedItems,
    clearFilters,
  }
}