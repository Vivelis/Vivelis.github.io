<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <div>
    <!-- Markup shared across all pages, ex: NavBar -->
    <Analytics />
    <NuxtPage />
  </div>
</template>
