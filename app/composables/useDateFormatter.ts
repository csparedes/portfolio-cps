export const useDateFormatter = () => {
  const constants = useConstants()

  const parseDate = (dateStr: string): Date => {
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return date
    }
    const separator = dateStr.includes("/") ? "/" : "-"
    const parts = dateStr.split(separator)
    if (parts.length === 3) {
      const [part1, part2, part3] = parts
      if (part1 && part2 && part3) {
        if (part1.length === 4) {
          return new Date(parseInt(part1), parseInt(part2) - 1, parseInt(part3))
        }
        if (part2.length === 4) {
          return new Date(parseInt(part3), parseInt(part1) - 1, parseInt(part2))
        }
      }
    }
    return new Date()
  }

  const formatDate = (date: string) => {
    return parseDate(date).toLocaleDateString("en-US", constants.dateOptions)
  }

  const getReadingTime = (content: unknown): number => {
    if (!content) return 1
    const constants = useConstants()
    const bodyText = typeof content === "string" ? content : JSON.stringify(content)
    const wordCount = bodyText.split(/\s+/).length
    return Math.ceil(wordCount / constants.wordsPerMinute)
  }

  return {
    formatDate,
    getReadingTime,
  }
}