<script setup>
const { locale } = useI18n();

const { data: technologies } = await useAsyncData('technologies', () =>
  queryCollection('technologies').select("id", "image", "link", locale.value).all()
);
</script>

<template>
  <section class="technologies w-1/2">
    <h2 class="text-3xl font-bold text-primary mb-6 py-1">{{ $t('technologies-component-title') }}</h2>
    <div v-for="techno in technologies" :key="techno.id" class="techno-card">
      <h2 class="text-2xl font-bold mb-2 mt-4">{{ techno[locale].title }}</h2>
      <p>{{ techno[locale].description }}</p>
      <img class="" :src="techno.image" />
      <a :href="techno.link" class="bg-secondary py-1 px-3 border border-inherit rounded-lg inline-block mt-4">{{
        $t('technologies-component-link') }}</a>
    </div>
  </section>
</template>
