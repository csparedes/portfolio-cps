<template>
  <div>
    <HeroSection />

    <section class="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div class="container mx-auto px-4">
        <div
          ref="aboutRef"
          class="max-w-3xl mx-auto text-center opacity-0 translate-y-4"
        >
          <h2 class="text-3xl font-bold mb-6">About Me</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            I improve software developing process and make tailor apps for solve
            your needs. Systems Engineer with a Master's degree in Full Stack
            Development and over 4 years of experiences in designing, developing,
            and implementing web applications and technological solutions.
            Specialized in technologies such as Node.js, NestJS, React, and Vue,
            with a focus on creating efficient systems.
          </p>

          <div class="flex flex-wrap justify-center gap-8 mb-8">
            <div class="text-center">
              <div class="text-4xl font-bold text-primary">4+</div>
              <div class="text-sm text-gray-500">Years Experience</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-primary">10+</div>
              <div class="text-sm text-gray-500">Projects Delivered</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-primary">6</div>
              <div class="text-sm text-gray-500">Technologies</div>
            </div>
          </div>

          <p class="text-gray-600 dark:text-gray-400">
            Have an idea?
            <NuxtLink
              class="underline text-primary hover:text-primary-600"
              to="mailto:csparedes1995@gmail.com"
            >
              Send me an email.
            </NuxtLink>
          </p>
        </div>
      </div>
    </section>

    <TechStack />

    <ExperienceHorizontal />

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 class="text-3xl font-bold mb-4 md:mb-0">My Projects</h2>
          <UButton
            label="View All Projects"
            icon="i-heroicons-arrow-right"
            variant="outline"
            to="/projects"
          />
        </div>

        <div ref="carouselRef" class="opacity-0 translate-y-4">
          <CarrouselImg v-if="projectImages.length > 0" :images="projectImages" />
          <div v-else class="text-center py-12 text-gray-500">
            No projects available
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const aboutRef = ref<HTMLElement | null>(null)
const carouselRef = ref<HTMLElement | null>(null)

interface ProjectImage {
  src: string
  alt: string
  tags?: string[]
  link?: string
}

const projectImages = ref<ProjectImage[]>([])

const { data: projects } = await useAsyncData("homepage-projects", async () => {
  try {
    const result = await queryCollection("projects").all()
    if (!result?.length) return []

    return result.slice(0, 6).map((project) => {
      const slug = project.id.split("/").pop()?.replace(".md", "")
      return {
        ...project,
        _path: `/projects/${slug}`,
        slug,
      }
    })
  } catch (err) {
    console.error("Error fetching projects:", err)
    return []
  }
})

watchEffect(() => {
  if (projects.value) {
    projectImages.value = projects.value
      .filter((p) => p.image)
      .map((p) => ({
        src: p.image || "/placeholder.png",
        alt: p.title || "Project",
        tags: p.tags?.slice(0, 3) || [],
        link: `/projects/${p.slug}`,
      }))
  }
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (aboutRef.value) {
            aboutRef.value.classList.remove("opacity-0", "translate-y-4")
            aboutRef.value.classList.add(
              "opacity-100",
              "translate-y-0",
              "transition-all",
              "duration-700",
              "ease-out"
            )
          }
          if (carouselRef.value) {
            setTimeout(() => {
              carouselRef.value?.classList.remove("opacity-0", "translate-y-4")
              carouselRef.value?.classList.add(
                "opacity-100",
                "translate-y-0",
                "transition-all",
                "duration-700",
                "ease-out"
              )
            }, 300)
          }
          observer.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  if (aboutRef.value) {
    observer.observe(aboutRef.value)
  }
  if (carouselRef.value) {
    observer.observe(carouselRef.value)
  }
})
</script>
