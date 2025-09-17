<template>
  <div class="relative my-4">
    <div v-if="filename" class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ filename }}</span>
      <UButton
        v-if="code"
        @click="copyCode"
        variant="ghost"
        size="xs"
        :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
        :label="copied ? 'Copied!' : 'Copy'"
      />
    </div>
    <pre 
      :class="[
        'overflow-x-auto p-4 text-sm',
        filename ? 'rounded-b-lg' : 'rounded-lg',
        'bg-gray-50 dark:bg-gray-900'
      ]"
    ><slot /></pre>
    <UButton
      v-if="!filename && code"
      @click="copyCode"
      variant="ghost"
      size="xs"
      :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
      class="absolute top-2 right-2"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
}

const props = defineProps<Props>()

const copied = ref(false)

const copyCode = async () => {
  if (props.code) {
    try {
      await navigator.clipboard.writeText(props.code)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }
}
</script>