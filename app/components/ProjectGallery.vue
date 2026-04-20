<template>
  <div v-if="images.length > 0" class="mb-8">
    <div class="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div
        v-if="images.length === 1"
        class="flex items-center justify-center"
      >
        <NuxtImg
          :src="images[0]?.src"
          :alt="images[0]?.alt"
          class="max-h-[70vh] w-auto object-contain"
          loading="lazy"
        />
      </div>

      <div v-else class="relative">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full shrink-0 flex items-center justify-center min-h-[400px]"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              class="max-h-[70vh] w-auto object-contain"
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
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  alt: string
}

const props = defineProps<{
  images: GalleryImage[]
}>()

const currentIndex = ref(0)

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}
</script>
