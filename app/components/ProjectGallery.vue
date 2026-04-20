<template>
  <div v-if="images.length > 0" class="mb-8">
    <div v-if="images.length === 1" class="rounded-xl overflow-hidden">
      <NuxtImg
        :src="images[0]?.src"
        :alt="images[0]?.alt"
        class="w-full h-64 md:h-80 lg:h-96 object-cover"
        loading="lazy"
      />
    </div>

    <div v-else class="relative rounded-xl overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="w-full h-64 md:h-80 lg:h-96 object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(_, index) in images"
          :key="index"
          :aria-label="`Go to image ${index + 1}`"
          class="transition-all duration-300 rounded-full p-1"
          :class="currentIndex === index ? 'bg-white w-6' : 'bg-white/50 w-3 h-3'"
          @click="currentIndex = index"
        />
      </div>

      <UButton
        icon="i-heroicons-arrow-left-circle"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full p-1 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white"
        @click="prevSlide"
      />

      <UButton
        icon="i-heroicons-arrow-right-circle"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full p-1 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white"
        @click="nextSlide"
      />

      <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  alt: string
}

const props = defineProps<{
  projectSlug: string
}>()

const currentIndex = ref(0)
const MAX_IMAGES = 10

const images = computed<GalleryImage[]>(() => {
  const result: GalleryImage[] = []
  const extensions = ["png", "jpg", "jpeg", "webp"]
  const folderPath = `/projects/${props.projectSlug}`

  for (let i = 1; i <= MAX_IMAGES; i++) {
    for (const ext of extensions) {
      result.push({
        src: `${folderPath}/${props.projectSlug}-${i}.${ext}`,
        alt: `Project screenshot ${i}`,
      })
    }
  }

  return result
})

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}
</script>
