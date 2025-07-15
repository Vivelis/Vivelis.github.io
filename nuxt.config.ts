// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  pages: true,
  css: ["~/assets/css/main.css", "animate.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Macéo Jalbert - Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Full-stack developer passionate about creating innovative solutions' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' }
      ]
    }
  },
  i18n: {
    locales: [
      { code: "fr", name: "Français", file: "fr.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
    defaultLocale: "fr",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix_except_default",
  },
});
