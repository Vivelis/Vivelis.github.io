<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

// SEO and meta tags
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  meta: [
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
})
</script>

<template>
  <div class="min-h-screen bg-primary">
    <Analytics />
    <SpeedInsights />
    <NuxtPage />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
</style>
