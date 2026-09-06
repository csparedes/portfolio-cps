<template>
  <footer class="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ copyright }}
        </div>

        <div class="flex items-center gap-2">
          <UButton
            v-for="link in socialLinks"
            :key="link.label"
            :icon="link.icon"
            :to="link.to"
            :target="link.target"
            :aria-label="link.label"
            variant="ghost"
            size="sm"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const copyright = computed(() => {
  return `© ${new Date().getFullYear()} Cristian Stalin Paredes Sánchez`
})

const socialLinks = [
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com/csparedes",
    target: "_blank" as const,
  },
  {
    label: "LinkedIn",
    icon: "i-simple-icons-linkedin",
    to: "https://www.linkedin.com/in/csparedes/",
    target: "_blank" as const,
  },
  {
    label: "Email",
    icon: "skill-icons:gmail-light",
    to: "mailto:csparedes1995@gmail.com",
    target: "_blank" as const,
  },
]
</script>
