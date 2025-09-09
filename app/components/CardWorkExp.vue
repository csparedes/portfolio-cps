<template>
  <UCard variant="subtle">
          <template #header>
            <div class=" flex justify-between">
              <div class="flex flex-col text-left">
                <h2 class="text-lg font-bold">{{ title }}</h2>
                <span class="text-sm font-light">{{ role }}</span>
              </div>
              <span class="text-sm font-light">{{ dateWork }}</span>
            </div>
          </template>
          <div class="text-justify">{{ description }}</div>

          <template #footer>
            <div class="flex gap-2">
              <span class="font-bold">Stack:</span>
              <h6>{{ stack }}</h6>
            </div>
          </template>
        </UCard>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  role: string,
  dateWork: string,
  description: string,
  stack: string,

}>()
</script>

<style>

</style>