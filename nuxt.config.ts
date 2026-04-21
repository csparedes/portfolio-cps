// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "@nuxt/content",
    "nuxt-studio"
  ],

 
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storage: "cookie",
    storageKey: "nuxt-color-mode",
  },
  fonts: {
    families: [
      {
        name: "Open Sans",
        provider: "google",
      },
    ],
  },
  
  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
            sepia: 'monokai'
          },
        }
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'nuxt-vendor': ['nuxt', 'vue', 'vue-router'],
          'nuxt-ui': ['@nuxt/ui'],
          'content': ['@nuxt/content'],
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  vite: {
    build: {
      sourcemap: false
    }
  },
  $production: {
    studio: false
  }
});