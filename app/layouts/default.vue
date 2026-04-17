<template>
  <div class="flex flex-col min-h-screen">
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
    <main class="flex-1 py-8 px-4 md:px-20">
      <UContainer>
        <slot />
      </UContainer>
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
