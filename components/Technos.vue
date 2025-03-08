<script setup>
const { locale } = useI18n();

const { data: technos } = await useAsyncData('technos', () =>
  queryCollection('technos').select(locale.value).all()
);
</script>

<template>
  <section class="technos w-1/2">
    <h2 class="text-3xl font-bold text-primary mb-6 py-1">{{ $t('technos-component-title') }}</h2>
    <div v-for="techno in technos" :key="techno[locale].id" class="techno-card">
      <h2 class="text-2xl font-bold mb-2 mt-4">{{ techno[locale].title }}</h2>
      <p>{{ techno[locale].description }}</p>
      <img class="" :src="techno[locale].image" />
      <a :href="techno[locale].link" class="bg-secondary py-1 px-3 border border-inherit rounded-lg inline-block mt-4">View Techno</a>
    </div>
  </section>
</template>
