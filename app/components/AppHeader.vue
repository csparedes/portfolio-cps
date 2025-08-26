<template>
  <UNavigationMenu :items="links" class="p-4 gap-4">
    <template #list-trailing>
      <ColorModeButton />
    </template>
  </UNavigationMenu>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui';

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<style>

</style>