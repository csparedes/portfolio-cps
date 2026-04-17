export const useConstants = () => {
  return {
    postsPerPage: 9,
    wordsPerMinute: 200,
    sortOptions: [
      { label: "Newest First", value: "date-desc" },
      { label: "Oldest First", value: "date-asc" },
      { label: "Title A-Z", value: "title-asc" },
      { label: "Title Z-A", value: "title-desc" },
    ],
    dateOptions: {
      year: "numeric",
      month: "long",
      day: "numeric",
    } as Intl.DateTimeFormatOptions,
  }
}