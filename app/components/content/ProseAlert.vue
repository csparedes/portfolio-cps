<template>
  <div :class="alertClasses" class="my-4 p-4 rounded-lg border-l-4">
    <div class="flex items-start">
      <UIcon :name="iconName" :class="iconClasses" class="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
      <div class="flex-1">
        <h4 v-if="title" :class="titleClasses" class="font-semibold mb-1">{{ title }}</h4>
        <div :class="contentClasses">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'info' | 'warning' | 'error' | 'success'
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info'
})

const alertClasses = computed(() => {
  const baseClasses = 'border-l-4'
  const typeClasses = {
    info: 'bg-blue-50 dark:bg-blue-950 border-blue-400',
    warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-400',
    error: 'bg-red-50 dark:bg-red-950 border-red-400',
    success: 'bg-green-50 dark:bg-green-950 border-green-400'
  }
  return `${baseClasses} ${typeClasses[props.type]}`
})

const iconName = computed(() => {
  const icons = {
    info: 'i-heroicons-information-circle',
    warning: 'i-heroicons-exclamation-triangle',
    error: 'i-heroicons-x-circle',
    success: 'i-heroicons-check-circle'
  }
  return icons[props.type]
})

const iconClasses = computed(() => {
  const colors = {
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    success: 'text-green-500'
  }
  return colors[props.type]
})

const titleClasses = computed(() => {
  const colors = {
    info: 'text-blue-800 dark:text-blue-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    error: 'text-red-800 dark:text-red-200',
    success: 'text-green-800 dark:text-green-200'
  }
  return colors[props.type]
})

const contentClasses = computed(() => {
  const colors = {
    info: 'text-blue-700 dark:text-blue-300',
    warning: 'text-yellow-700 dark:text-yellow-300',
    error: 'text-red-700 dark:text-red-300',
    success: 'text-green-700 dark:text-green-300'
  }
  return colors[props.type]
})
</script>