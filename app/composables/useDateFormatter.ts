export const useDateFormatter = () => {
  const constants = useConstants()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", constants.dateOptions)
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