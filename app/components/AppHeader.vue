<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <UNavigationMenu :items="links" class="gap-4" />

        <div class="flex items-center gap-1">
          <ColorThemePicker />
          <ColorModeButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui"

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>
