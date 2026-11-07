<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => t('home-meta-title'),
  description: () => t('home-meta-description'),
  ogTitle: () => t('home-meta-title'),
  ogDescription: () => t('home-meta-description'),
  twitterTitle: () => t('home-meta-title'),
  twitterDescription: () => t('home-meta-description'),
});
</script>

<template>
  <div class="bg-primary min-h-screen text-primary">
    <Navigation />
    <main class="max-w-6xl mx-auto">
      <Hero />
      <div id="projects">
        <Projects />
      </div>
      <div id="homelab">
        <Homelab />
      </div>
      <div id="technologies">
        <Technologies />
      </div>
    </main>
    <Footer />
  </div>
</template>
