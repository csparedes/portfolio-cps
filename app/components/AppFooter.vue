<template>
  <div class="flex justify-between p-4">
    <div>{{ footer.credits }}</div>
    <div>
      <UButton
        v-for="(link, index) of footer?.links"
        :key="index"
        v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const footer = reactive({
  credits: `Copyright © ${new Date().getFullYear()}`,
  colorMode: false,
  links: [
    {
      icon: "i-simple-icons-nuxtdotjs",
      to: "https://nuxt.com",
      target: "_blank",
      "aria-label": "Nuxt Website",
    },
    {
      icon: "i-simple-icons-discord",
      to: "https://discord.com/invite/ps2h6QT",
      target: "_blank",
      "aria-label": "Nuxt UI on Discord",
    },
    {
      icon: "i-simple-icons-x",
      to: "https://x.com/nuxt_js",
      target: "_blank",
      "aria-label": "Nuxt on X",
    },
    {
      icon: "i-simple-icons-github",
      to: "https://github.com/nuxt/ui",
      target: "_blank",
      "aria-label": "Nuxt UI on GitHub",
    },
  ],
});
</script>

<style></style>
