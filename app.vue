<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const i18nHead = useLocaleHead({
  addSeoAttributes: true
});

// Locale-aware SEO tags: <html lang>, canonical, hreflang alternates, og:locale.
// Static tags (author, theme-color, og:image...) live in nuxt.config.ts;
// title/description are set by each page in the current language.
useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs?.lang || 'fr-FR'
  },
  link: () => [...(i18nHead.value.link || [])],
  meta: () => [...(i18nHead.value.meta || [])]
});

onMounted(() => {
  if (typeof window !== 'undefined' && !window.location.hash) {
    window.scrollTo(0, 0);
  }
});
</script>

<template>
  <div class="min-h-screen bg-primary">
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right, #94e2d5 0%, #cba6f7 50%, #89dceb 100%)"
      :height="3"
    />
    <Analytics />
    <SpeedInsights />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
</style>
