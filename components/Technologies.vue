<script setup>
const { locale } = useI18n();

const { data: technologies } = await useAsyncData('technologies', () =>
  queryCollection('technologies').select("id", "image", "link", locale.value).all()
);
</script>

<template>
  <section class="technologies w-full sm:w-3/4 md:w-1/2 px-10 md:px-0 mx-auto">
    <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-3xl font-bold text-primary mb-6 py-1">{{
      $t('technologies-component-title') }}</h2>
    <div v-for="project in technologies" :key="project.id"
      class="animate__animated animate__fadeInLeft animate__delay-3s project-card">
      <h2 class="text-2xl font-bold mb-2 mt-4">{{ project[locale].title }}</h2>
      <p>{{ project[locale].description }}</p>
      <img class="" :src="project.image" />
      <a :href="project.link" class="bg-secondary py-1 px-3 border border-inherit rounded-lg inline-block mt-4">{{
        $t('technologies-component-link') }}</a>
    </div>
  </section>
</template>
