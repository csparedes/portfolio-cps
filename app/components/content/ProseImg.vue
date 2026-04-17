<template>
  <figure class="flex flex-col items-center my-6">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading || 'lazy'"
      :format="format || 'webp'"
      :quality="quality || 80"
      :sizes="sizes || 'sm:100vw md:50vw lg:800px'"
      class="rounded-lg shadow-md"
      :class="imgClass"
    />
    <figcaption v-if="alt" class="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
  loading?: "lazy" | "eager"
  format?: string
  quality?: number
  sizes?: string
  imgClass?: string
}

defineProps<Props>()
</script>
