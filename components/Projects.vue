<script setup>
const { locale } = useI18n();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').select(locale.value).all()
);
</script>

<template>
  <section class="projects w-1/2">
    <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-3xl font-bold text-primary mb-6 py-1">{{ $t('projects-component-title') }}</h2>
    <div v-for="project in projects" :key="project[locale].id" class="animate__animated animate__fadeInLeft animate__delay-3s project-card">
      <h2 class="text-2xl font-bold mb-2 mt-4">{{ project[locale].title }}</h2>
      <p>{{ project[locale].description }}</p>
      <img class="" :src="project[locale].image" />
      <a :href="project[locale].link" class="bg-secondary py-1 px-3 border border-inherit rounded-lg inline-block mt-4">{{ $t('technos-component-link') }}</a>
    </div>
  </section>
</template>
