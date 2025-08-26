<template>
  <UContainer>
    <AppHeader
      :links="[
        {
          label: 'Home',
          icon: 'material-symbols:house',
          to: '/',
        },
        {
          label: 'Projects',
          icon: 'material-symbols:code-rounded',
          to: '/projects',
        },
        {
          label: 'Blog',
          icon: 'material-symbols:ink-pen-rounded',
          to: '/blog',
        },
        {
          label: 'About',
          icon: 'material-symbols:person',
          to: '/about',
        },
      ]"
    />
    <div class="py-8 px-20">
      <slot />
    </div>
    <AppFooter />
  </UContainer>
</template>

<script lang="ts" setup></script>

<style></style>
