<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading || 'lazy'"
    :format="format || 'webp'"
    :quality="quality || 80"
    :sizes="sizes || 'sm:100vw md:50vw lg:800px'"
    class="rounded-lg shadow-sm my-4 max-w-full h-auto"
    :class="class"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  format?: string
  quality?: number
  sizes?: string
  class?: string
}

defineProps<Props>()
</script>