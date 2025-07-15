<script setup>
const { locale } = useI18n();

const { data: technologies } = await useAsyncData('technologies', () =>
  queryCollection('technologies').select("id", "image", "link", locale.value).all()
);
</script>

<template>
  <section class="technologies px-6 py-16">
    <div class="max-w-6xl mx-auto">
      <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-3xl md:text-4xl font-bold text-heading mb-12 text-center">
        {{ $t('technologies-component-title') }}
      </h2>
      <div class="grid-auto-fill">
        <div v-for="technology in technologies" :key="technology.id"
          class="animate__animated animate__fadeInLeft animate__delay-3s card group text-center">
          <div class="flex flex-col h-full">
            <div class="flex-1">
              <div v-if="technology.image" class="mb-4 flex justify-center">
                <img 
                  :src="technology.image" 
                  :alt="technology[locale].title"
                  class="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 class="text-lg font-semibold text-heading mb-3">{{ technology[locale].title }}</h3>
              <p class="text-secondary text-sm leading-relaxed">{{ technology[locale].description }}</p>
            </div>
            <div class="mt-auto pt-4">
              <a :href="technology.link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary text-sm">
                {{ $t('technologies-component-link') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
