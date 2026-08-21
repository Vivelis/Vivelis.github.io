// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const siteUrl = import.meta.env.NUXT_PUBLIC_SITE_URL;

if (!siteUrl && !import.meta.dev) {
  throw new Error("NUXT_PUBLIC_SITE_URL must be defined outside development.");
}

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
      htmlAttrs: {
        lang: "fr",
      },
      title: "Macéo Jalbert | Développeur & Étudiant en Informatique",
      titleTemplate: "%s",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Macéo Jalbert" },
        {
          name: "description",
          content:
            "Découvrez le portfolio de Macéo Jalbert, développeur et étudiant en informatique passionné par la création de projets web innovants, l'UX et les technologies modernes.",
        },
        {
          name: "keywords",
          content:
            "Macéo Jalbert, développeur, portfolio, étudiant informatique, projets web, Vue, Nuxt, JavaScript, innovation, technologies, création digitale",
        },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { name: "theme-color", content: "#1e1e2e" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Macéo Jalbert | Développeur & Étudiant en Informatique" },
        {
          property: "og:description",
          content:
            "Portfolio de Macéo Jalbert, étudiant en informatique et développeur curieux, créatif et passionné par les projets web innovants.",
        },
        { property: "og:url", content: siteUrl },
        { property: "og:site_name", content: "Macéo Jalbert - Portfolio" },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:image", content: `${siteUrl}/logo.svg` },
        { property: "og:image:alt", content: "Macéo Jalbert portfolio" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Macéo Jalbert | Développeur & Étudiant en Informatique" },
        {
          name: "twitter:description",
          content:
            "Portfolio de Macéo Jalbert, étudiant en informatique et développeur curieux, créatif et passionné par les projets web innovants.",
        },
        { name: "twitter:image", content: `${siteUrl}/logo.svg` },
        { name: "twitter:image:alt", content: "Macéo Jalbert portfolio" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
        { rel: "canonical", href: siteUrl },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Macéo Jalbert",
            url: siteUrl,
            jobTitle: "Developer / Student in Computer Science",
            description:
              "Étudiant en informatique et développeur passionné par la création de projets web innovants, les technologies modernes et les solutions créatives.",
            knowsAbout: [
              "Web development",
              "JavaScript",
              "Nuxt",
              "Vue",
              "Computer science",
              "Technology",
              "UX and product design",
            ],
          }),
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl,
    },
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
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
});
