<script setup lang="ts">
const { t } = useI18n();
// The "|" stays outside t(): vue-i18n treats it as a plural separator.
const pageTitle = () => `Macéo Jalbert | ${t('home-meta-title')}`;

useSeoMeta({
  title: pageTitle,
  description: () => t('home-meta-description'),
  ogTitle: pageTitle,
  ogDescription: () => t('home-meta-description'),
  twitterTitle: pageTitle,
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
