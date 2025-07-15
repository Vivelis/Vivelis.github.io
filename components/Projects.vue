<script setup>
const { locale } = useI18n();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').select("id", "image", "link", locale.value).all()
);
</script>

<template>
  <section class="projects px-6 py-16">
    <div class="max-w-6xl mx-auto">
      <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-3xl md:text-4xl font-bold text-heading mb-12 text-center">
        {{ $t('projects-component-title') }}
      </h2>
      <div class="grid-auto-fit">
        <div v-for="project in projects" :key="project.id"
          class="animate__animated animate__fadeInLeft animate__delay-3s card group">
          <div class="flex flex-col h-full">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-heading mb-3">{{ project[locale].title }}</h3>
              <p class="text-secondary mb-4 leading-relaxed">{{ project[locale].description }}</p>
              <div v-if="project.image" class="mb-4 overflow-hidden rounded-lg">
                <img 
                  :src="project.image" 
                  :alt="project[locale].title"
                  class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div class="mt-auto">
              <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn btn-secondary w-full">
                {{ $t('technologies-component-link') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
