<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2
        ref="titleRef"
        class="text-3xl font-bold mb-12 opacity-0 translate-y-4"
      >
        Experience
      </h2>

      <div class="relative">
        <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />

        <div class="flex flex-col md:flex-row gap-8 md:gap-4 overflow-x-auto pb-4 md:overflow-visible">
          <div
            v-for="(exp) in experiences"
            :key="exp.company"
            ref="cardRefs"
            class="flex-shrink-0 w-full md:w-64 relative opacity-0 translate-y-4"
          >
            <div
              class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:-translate-y-1"
            >
              <div class="text-sm text-primary font-medium mb-1">
                {{ exp.period }}
              </div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                {{ exp.company }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {{ exp.role }}
              </p>
              <div class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tech in exp.tech.slice(0, 3)"
                  :key="tech"
                  variant="subtle"
                  size="xs"
                >
                  {{ tech }}
                </UBadge>
                <UBadge
                  v-if="exp.tech.length > 3"
                  variant="subtle"
                  size="xs"
                >
                  +{{ exp.tech.length - 3 }}
                </UBadge>
              </div>
            </div>

            <div class="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-900" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const titleRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

interface Experience {
  company: string
  role: string
  period: string
  tech: string[]
}

const experiences: Experience[] = [
  {
    company: "Pontificia Universidad Católica del Ecuador",
    role: "System Analyst & Fullstack Developer",
    period: "2022 - Current",
    tech: ["Vue", "Nuxt", "PostgreSQL", "Oracle", "Docker", "Jenkins"],
  },
  {
    company: "Soluciones Tecnológicas Kauel",
    role: "Fullstack Developer",
    period: "2022 - 2024",
    tech: ["React", "Node.js", "Azure", "SQL Server"],
  },
  {
    company: "GAD Tulcán",
    role: "Database Manager Intern",
    period: "Jan - Mar 2021",
    tech: ["SQL", "MySQL", "MS Excel"],
  },
  {
    company: "PUCE Ibarra",
    role: "IT Support & Virtualization Intern",
    period: "2019 - 2020",
    tech: ["Linux", "VMware", "oVirt"],
  },
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

          cardRefs.value.forEach((el, index) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-4")
              el.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-500", "ease-out")
            }, index * 150)
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
