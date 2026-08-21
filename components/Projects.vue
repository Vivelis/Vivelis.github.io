<script setup>
const { locale } = useI18n();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
);

// Track per-project iframe load errors
const iframeErrors = ref({});

function onIframeError(id) {
  iframeErrors.value = { ...iframeErrors.value, [id]: true };
}
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

              <!-- Preview: iframe when demo exists, fallback to image on error -->
              <div v-if="project.image || project.demo" class="project-preview mb-4 overflow-hidden rounded-lg">
                <!-- iframe preview (only when demo URL available and not errored) -->
                <template v-if="project.demo && !iframeErrors[project.id]">
                  <iframe
                    :src="project.demo"
                    :title="project[locale].title + ' live demo'"
                    class="project-iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    scrolling="no"
                    @error="onIframeError(project.id)"
                  />
                  <!-- Invisible overlay to absorb clicks on the card without blocking the iframe visually -->
                  <div class="iframe-overlay" />
                </template>

                <!-- Fallback: static image -->
                <img
                  v-if="project.image && (!project.demo || iframeErrors[project.id])"
                  :src="project.image"
                  :alt="project[locale].title"
                  class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div class="mt-auto flex gap-2">
              <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="btn btn-primary flex-1">
                {{ $t('projects-component-demo') }}
              </a>
              <a :href="project.link" target="_blank" rel="noopener noreferrer" :class="['btn btn-secondary', project.demo ? 'flex-1' : 'w-full']">
                {{ $t('technologies-component-link') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-preview {
  position: relative;
  height: 12rem; /* same as h-48 */
}

.project-iframe {
  width: 100%;
  height: 100%;
  border: none;
  /* Scale down a full desktop viewport into the card thumbnail */
  transform-origin: top left;
  pointer-events: none;
  display: block;
  transition: transform 0.3s ease;
}

/* Subtle zoom on card hover */
.group:hover .project-iframe {
  transform: scale(1.03);
}

/* Transparent overlay so clicks on the card reach the buttons below,
   not the iframe content */
.iframe-overlay {
  position: absolute;
  inset: 0;
  cursor: default;
}
</style>
