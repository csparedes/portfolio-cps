<template>
  <div class="relative">
    <UButton
      aria-label="Change theme color"
      :icon="isOpen ? 'i-heroicons-chevron-up' : 'i-heroicons-palette'"
      variant="ghost"
      size="sm"
      @click="isOpen = !isOpen"
    />

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-3 z-50"
      >
        <h3 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Theme Colors
        </h3>
        <div class="grid grid-cols-5 gap-2 mb-3">
          <button
            v-for="color in presetColors"
            :key="color.name"
            :style="{ backgroundColor: color.value }"
            :aria-label="`Set theme color to ${color.name}`"
            class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none"
            :class="currentColor === color.value ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'"
            @click="setColor(color)"
          />
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ currentColorName }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

interface ColorPreset {
  name: string
  value: string
}

const presetColors: ColorPreset[] = [
  { name: "Emerald", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Pink", value: "#ec4899" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Orange", value: "#f97316" },
]

const currentColor = ref(presetColors[0].value)

const currentColorName = computed(() => {
  const color = presetColors.find((c) => c.value === currentColor.value)
  return color ? color.name : "Custom"
})

const setColor = (color: ColorPreset) => {
  currentColor.value = color.value
  document.documentElement.style.setProperty("--color-primary-500", color.value)
  document.documentElement.style.setProperty("--color-primary-600", color.value)
  document.documentElement.style.setProperty("--color-primary-400", adjustBrightness(color.value, 0.3))
  document.documentElement.style.setProperty("--color-primary-300", adjustBrightness(color.value, 0.6))
  document.documentElement.style.setProperty("--color-primary-700", adjustBrightness(color.value, -0.3))
  document.documentElement.style.setProperty("--color-primary-800", adjustBrightness(color.value, -0.6))
  document.documentElement.style.setProperty("--color-primary-900", adjustBrightness(color.value, -0.9))
  isOpen.value = false
}

const adjustBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + Math.round(255 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + Math.round(255 * percent)))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest(".relative")) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
