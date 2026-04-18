<template>
  <div class="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full flex-shrink-0 relative"
      >
        <div class="relative aspect-[16/9] overflow-hidden rounded-xl">
          <NuxtImg
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="text-xl md:text-2xl font-bold mb-2">
              {{ image.alt }}
            </h3>
            <div class="flex flex-wrap gap-2 mb-3">
              <UBadge
                v-for="tag in image.tags?.slice(0, 3)"
                :key="tag"
                variant="solid"
                size="sm"
                class="bg-white/20 backdrop-blur-sm"
              >
                {{ tag }}
              </UBadge>
            </div>
            <UButton
              v-if="image.link"
              :to="image.link"
              label="View Project"
              icon="i-heroicons-arrow-right"
              variant="solid"
              size="sm"
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in images"
        :key="index"
        :aria-label="`Go to slide ${index + 1}`"
        class="transition-all duration-300 rounded-full p-1"
        :class="currentIndex === index ? 'bg-white w-6' : 'bg-white/50 w-3 h-3'"
        @click="goToSlide(index)"
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
  </div>
</template>

<script setup lang="ts">
interface CarouselImage {
  src: string
  alt: string
  tags?: string[]
  link?: string
}

const props = defineProps<{
  images: CarouselImage[]
}>()

const currentIndex = ref(0)
let autoSlideInterval: NodeJS.Timeout | null = null

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoSlide = () => {
  autoSlideInterval =
    setInterval(() => {
      nextSlide()
    }, 5000)
}

const stopAutoSlide = () => {
  if (!autoSlideInterval) return
  clearInterval(autoSlideInterval)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
