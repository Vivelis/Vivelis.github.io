// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const siteUrl = import.meta.env.NUXT_PUBLIC_SITE_URL;
const uptimeKumaUrl = import.meta.env.NUXT_PUBLIC_UPTIME_KUMA_URL;

const isDevelopment = process.env.NODE_ENV === "development"
const isPostInstall = process.env.npm_lifecycle_event === "postinstall";

if (!siteUrl && !isDevelopment && !isPostInstall) {
  throw new Error("NUXT_PUBLIC_SITE_URL must be set outside development mode.");
}

if (!uptimeKumaUrl && !isPostInstall) {
  throw new Error("NUXT_PUBLIC_UPTIME_KUMA_URL must be set.");
}

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  pages: true,
  routeRules: {
    "/sitemap.xml": { earlyHints: false },
    // Old French-prefixed URLs (strategy used to be prefix_and_default)
    "/fr": { redirect: { to: "/", statusCode: 301 } },
    "/fr/**": { redirect: { to: "/**", statusCode: 301 } },
  },
  css: ["~/assets/css/main.css", "animate.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      // Language-specific tags (lang, title, description, og:title,
      // og:description, og:locale, canonical, hreflang) are set per page
      // and per locale in app.vue / pages/*.vue, never globally here.
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Macéo Jalbert" },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { name: "theme-color", content: "#1e1e2e" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Macéo Jalbert - Portfolio" },
        { property: "og:image", content: `${siteUrl}/logo.svg` },
        { property: "og:image:alt", content: "Macéo Jalbert portfolio" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${siteUrl}/logo.svg` },
        { name: "twitter:image:alt", content: "Macéo Jalbert portfolio" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
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
      uptimeKumaUrl,
    },
  },
  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: "fr", language: "fr-FR", name: "Français", file: "fr.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "fr",
    lazy: true,
    langDir: "locales/",
    // "/" = French (default), "/en" = English. No "/fr" duplicate of "/".
    strategy: "prefix_except_default",
    // No automatic language redirect: each URL always serves the same
    // language, which is what Google expects for hreflang pages.
    detectBrowserLanguage: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
});
