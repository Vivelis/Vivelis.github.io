<script setup>
import { Icon } from '@iconify/vue';

const { locale } = useI18n();

const { data: technologies } = await useAsyncData('technologies', () =>
  queryCollection('technologies').all()
);
</script>

<template>
  <section class="technologies px-6 py-16">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-4xl md:text-5xl font-extrabold text-heading inline-block underline decoration-[var(--ctp-teal)] decoration-4 underline-offset-8">
          {{ $t('technologies-component-title') }}
        </h2>
      </div>
      <div class="grid-auto-fill">
        <div v-for="technology in technologies" :key="technology.id"
          class="animate__animated animate__fadeInLeft animate__delay-3s card group text-center">
          <div class="flex flex-col h-full">
            <div class="flex-1">
              <div v-if="technology.icon || technology.image" class="mb-4 flex justify-center">
                <Icon
                  v-if="technology.icon"
                  :icon="technology.icon"
                  class="w-16 h-16 transition-transform duration-300 group-hover:scale-110"
                />
                <img
                  v-else
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
