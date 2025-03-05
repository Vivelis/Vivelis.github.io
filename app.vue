<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>

<template>
  <div>
    <!-- Markup shared across all pages, ex: NavBar -->
    <Analytics />
    <SpeedInsights />
    <NuxtPage />
  </div>
</template>
