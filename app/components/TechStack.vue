<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
    <div class="container mx-auto px-4">
      <h2
        ref="titleRef"
        class="text-3xl font-bold text-center mb-12 opacity-0 translate-y-4"
      >
        Tech Stack
      </h2>

      <div class="flex flex-wrap justify-center gap-8 md:gap-12">
        <div
          v-for="(tech, index) in technologies"
          :key="tech.name"
          ref="techRefs"
          class="flex flex-col items-center gap-3 group cursor-default opacity-0 translate-y-4"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div
            class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-primary/30"
          >
            <UIcon
              :name="tech.icon"
              class="w-10 h-10 md:w-12 md:h-12"
            />
          </div>
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const titleRef = ref<HTMLElement | null>(null)
const techRefs = ref<HTMLElement[]>([])

interface Tech {
  name: string
  icon: string
}

const technologies: Tech[] = [
  { name: "Vue", icon: "i-mdi-vuejs" },
  { name: "Nuxt", icon: "i-mdi-nuxt" },
  { name: "Node.js", icon: "i-mdi-nodejs" },
  { name: "NestJS", icon: "i-file-icons-nestjs" },
  { name: "PostgreSQL", icon: "i-akar-icons-postgresql-fill" },
  { name: "Docker", icon: "i-mdi-docker" },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (titleRef.value) {
            titleRef.value.classList.remove("opacity-0", "translate-y-4")
            titleRef.value.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700", "ease-out")
          }

          techRefs.value.forEach((el, index) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-4")
              el.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-500", "ease-out")
            }, index * 100)
          })

          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  const section = titleRef.value?.closest("section")
  if (section) {
    observer.observe(section)
  }
})
</script>
