<template>
  <div
    class="relative w-full max-w-4xl mx-auto overflow-hidden"
    
  >
    <!-- Carousel container -->
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
          class="w-full h-80 sm:h-96 object-cover rounded-lg"
        />
      </div>
    </div>

    <!--  -->
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <UButton
        v-for="(image, index) in images"
        class="w-3 h-3 rounded-full"
        @click="goToSlide(index)"
        :variant="currentIndex === index ? 'outline' : 'solid'"
      />
    </div>
    <!--  -->

    <!-- Navigation buttons -->
    <UButton
      icon="heroicons:arrow-left-circle"
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full p-1"
    />

    <UButton
      icon="heroicons:arrow-right-circle"
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full p-1"
    />
  </div>
  <!-- <div
    class="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2"
  >
    <UButton
      v-for="(image, index) in images"
      class="w-3 h-3 rounded-full"
      @click="goToSlide(index)"
      :variant="currentIndex === index ? 'outline': 'solid'"
    />
  </div> -->
</template>

<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[];
}>();

// Define your images array
const images = computed(() => props.images);

const currentIndex = ref(0);
let autoSlideInterval: NodeJS.Timeout | null = null;

// Navigation functions
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

// Auto-slide functionality
const startAutoSlide = () => {
  autoSlideInterval =
    setInterval(() => {
      nextSlide();
    }, 5000) ?? null; // Change slide every 5 seconds
};

const stopAutoSlide = () => {
  if (!autoSlideInterval) return;
  clearInterval(autoSlideInterval);
};

// Lifecycle hooks
onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>
