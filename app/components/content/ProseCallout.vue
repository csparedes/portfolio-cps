<template>
  <div class="my-6 p-6 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg border border-primary-200 dark:border-primary-800">
    <div class="flex items-start">
      <UIcon 
        name="i-heroicons-light-bulb" 
        class="w-6 h-6 text-primary-500 mt-1 mr-4 flex-shrink-0" 
      />
      <div class="flex-1">
        <h4 v-if="title" class="font-semibold text-primary-900 dark:text-primary-100 mb-2">
          {{ title }}
        </h4>
        <div class="text-primary-800 dark:text-primary-200">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

defineProps<Props>()
</script>