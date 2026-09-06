<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/5" />

    <div class="container mx-auto px-4 py-20 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div class="flex-shrink-0">
          <div
            ref="imageRef"
            class="relative"
          >
            <div class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
              <NuxtImg
                src="/perfil.jpg"
                alt="Cristian Stalin Paredes Sanchez"
                class="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div class="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
          </div>
        </div>

        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p
            ref="greetingRef"
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2 opacity-0 translate-y-4"
          >
            Hola, soy
          </p>

          <h1
            ref="nameRef"
            class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-gray-100 dark:via-gray-300 dark:to-gray-100 bg-clip-text opacity-0 translate-y-4"
          >
            Cristian Stalin Paredes Sánchez
          </h1>

          <div
            ref="titleRef"
            class="mb-8 h-8 overflow-hidden opacity-0 translate-y-4"
          >
            <p class="text-xl sm:text-2xl md:text-3xl font-light text-primary">
              {{ displayedTitle }}
              <span class="animate-pulse">|</span>
            </p>
          </div>

          <div
            ref="ctaRef"
            class="flex flex-wrap gap-4 justify-center lg:justify-start opacity-0 translate-y-4"
          >
            <UButton
              label="Let's Talk"
              icon="i-heroicons-paper-airplane"
              size="lg"
              @click="scrollToContact"
            />
            <UButton
              label="GitHub"
              icon="i-simple-icons-github"
              variant="outline"
              size="lg"
              to="https://github.com/csparedes"
              target="_blank"
            />
            <UButton
              label="LinkedIn"
              icon="i-simple-icons-linkedin"
              variant="outline"
              size="lg"
              to="https://www.linkedin.com/in/csparedes/"
              target="_blank"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator">
      <UIcon
        name="i-heroicons-chevron-double-down"
        class="w-8 h-8 text-gray-400 dark:text-gray-500"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const titles = [
  "Backend-focused Full Stack Engineer",
  "Node.js & NestJS Developer",
  "Vue & Nuxt Developer",
  "CI/CD & Docker Practitioner",
]

const displayedTitle = ref("")
const currentTitleIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)

const imageRef = ref<HTMLElement | null>(null)
const greetingRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

const typeTitle = () => {
  const currentTitle = titles[currentTitleIndex.value]

  if (!isDeleting.value) {
    displayedTitle.value = currentTitle.slice(0, currentCharIndex.value + 1)
    currentCharIndex.value++

    if (currentCharIndex.value === currentTitle.length) {
      isDeleting.value = true
      setTimeout(typeTitle, 2000)
      return
    }
  } else {
    displayedTitle.value = currentTitle.slice(0, currentCharIndex.value - 1)
    currentCharIndex.value--

    if (currentCharIndex.value === 0) {
      isDeleting.value = false
      currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
    }
  }

  const typingSpeed = isDeleting.value ? 50 : 100
  setTimeout(typeTitle, typingSpeed)
}

const animateEntrance = () => {
  const elements = [
    { el: greetingRef.value, delay: 0 },
    { el: nameRef.value, delay: 200 },
    { el: titleRef.value, delay: 400 },
    { el: ctaRef.value, delay: 600 },
    { el: imageRef.value, delay: 100 },
  ]

  elements.forEach(({ el, delay }) => {
    if (el) {
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-4")
        el.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700", "ease-out")
      }, delay)
    }
  })
}

const scrollToContact = () => {
  const element = document.querySelector("footer")
  element?.scrollIntoView({ behavior: "smooth" })
}

onMounted(() => {
  typeTitle()
  setTimeout(animateEntrance, 300)
})
</script>

<style scoped>
section {
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 50%,
    transparent 100%
  );
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-8px);
  }
}

.scroll-indicator {
  animation: bounce-subtle 2s ease-in-out infinite;
}
</style>
