<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const i18nHead = useLocaleHead({
  addSeoAttributes: true
});

// SEO and meta tags
useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs?.lang || 'fr'
  },
  link: () => [...(i18nHead.value.link || [])],
  meta: () => [
    ...(i18nHead.value.meta || []),
    { name: 'author', content: 'Macéo Jalbert' },
    { name: 'theme-color', content: '#1e1e2e' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Macéo Jalbert - Developer Portfolio' },
    { property: 'og:description', content: 'Full-stack developer passionate about creating innovative solutions' },
    { property: 'og:image', content: '/logo.svg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Macéo Jalbert - Developer Portfolio' },
    { name: 'twitter:description', content: 'Full-stack developer passionate about creating innovative solutions' },
    { name: 'twitter:image', content: '/logo.svg' }
  ]
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
