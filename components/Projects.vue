<script setup>
const { locale } = useI18n();

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
);

const featuredProjects = computed(() => {
  if (!projects.value) return [];
  return projects.value
    .filter(p => p.order !== undefined && p.order !== null)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
});

const otherProjects = computed(() => {
  if (!projects.value) return [];
  return projects.value
    .filter(p => p.order === undefined || p.order === null)
    .sort((a, b) => a.id.localeCompare(b.id));
});

// Track per-project iframe load errors
const iframeErrors = ref({});

function onIframeError(id) {
  iframeErrors.value = { ...iframeErrors.value, [id]: true };
}
</script>

<template>
  <section class="projects px-6 py-16">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <!-- Section Main Title -->
      <div class="text-center mb-12">
        <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-4xl md:text-5xl font-extrabold text-heading inline-block underline decoration-[var(--ctp-teal)] decoration-4 underline-offset-8">
          {{ $t('projects-component-title') }}
        </h2>
      </div>

      <!-- Featured Projects Sub-Section -->
      <div v-if="featuredProjects.length > 0">
        <h3 class="animate__animated animate__fadeInDown animate__delay-1s text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center tracking-tight flex items-center justify-center gap-3">
          <span class="sparkle-icon">✨</span>
          <span class="featured-title-text">{{ $t('projects-component-featured-title') }}</span>
          <span class="sparkle-icon">✨</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(project, index) in featuredProjects" :key="project.id"
            class="animate__animated animate__fadeInUp card group featured-card"
            :style="{ animationDelay: `${0.2 * index + 0.3}s` }">
            <div class="flex flex-col h-full">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-2xl font-bold text-heading">{{ project[locale].title }}</h4>
                  <span class="text-xs uppercase font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    Featured
                  </span>
                </div>
                <p class="text-secondary text-base md:text-lg mb-6 leading-relaxed">{{ project[locale].description }}</p>

                <!-- Preview: iframe when demo exists, fallback to image on error -->
                <div v-if="project.image || project.demo" class="project-preview featured-preview mb-6 overflow-hidden rounded-xl">
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
                    <div class="iframe-overlay" />
                  </template>

                  <img
                    v-if="project.image && (!project.demo || iframeErrors[project.id])"
                    :src="project.image"
                    :alt="project[locale].title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div class="mt-auto flex gap-3 pt-2">
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="btn btn-primary flex-1 py-3 text-base">
                  {{ $t('projects-component-demo') }}
                </a>
                <a v-if="project.video" :href="project.video" target="_blank" rel="noopener noreferrer" class="btn btn-primary flex-1 py-3 text-base">
                  {{ $t('projects-component-video') }}
                </a>
                <a
                  :href="project.link"
                  :target="project.link?.startsWith('#') ? '_self' : '_blank'"
                  :rel="project.link?.startsWith('#') ? undefined : 'noopener noreferrer'"
                  :class="['btn btn-secondary py-3 text-base', (project.demo || project.video) ? 'flex-1' : 'w-full']"
                >
                  {{ $t('technologies-component-link') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Projects Sub-Section -->
      <div v-if="otherProjects.length > 0" class="pt-8 border-t border-secondary/20">
        <h3 class="animate__animated animate__fadeInLeft animate__delay-2s text-xl md:text-2xl font-semibold text-secondary mb-8 text-center">
          {{ $t('projects-component-other-title') }}
        </h3>
        <div class="grid-auto-fit">
          <div v-for="project in otherProjects" :key="project.id"
            class="animate__animated animate__fadeInLeft animate__delay-3s card group">
            <div class="flex flex-col h-full">
              <div class="flex-1">
                <h4 class="text-xl font-semibold text-heading mb-3">{{ project[locale].title }}</h4>
                <p class="text-secondary mb-4 leading-relaxed">{{ project[locale].description }}</p>

                <!-- Preview: iframe when demo exists, fallback to image on error -->
                <div v-if="project.image || project.demo" class="project-preview mb-4 overflow-hidden rounded-lg">
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
                    <div class="iframe-overlay" />
                  </template>

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
                <a v-if="project.video" :href="project.video" target="_blank" rel="noopener noreferrer" class="btn btn-primary flex-1">
                  {{ $t('projects-component-video') }}
                </a>
                <a
                  :href="project.link"
                  :target="project.link?.startsWith('#') ? '_self' : '_blank'"
                  :rel="project.link?.startsWith('#') ? undefined : 'noopener noreferrer'"
                  :class="['btn btn-secondary', (project.demo || project.video) ? 'flex-1' : 'w-full']"
                >
                  {{ $t('technologies-component-link') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.featured-title-text {
  background: linear-gradient(135deg, var(--ctp-teal) 0%, var(--ctp-mauve) 50%, var(--ctp-sky) 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 4s linear infinite;
  transition: transform 0.3s ease;
}

.featured-title-text:hover {
  transform: scale(1.03);
}

@keyframes shine {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 200% center;
  }
}

.sparkle-icon {
  display: inline-block;
  font-size: 0.9em;
  animation: sparkle-bounce 2.5s ease-in-out infinite;
}

@keyframes sparkle-bounce {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-6px) rotate(18deg) scale(1.25);
    opacity: 1;
  }
}

.project-preview {
  position: relative;
  height: 12rem; /* standard h-48 */
}

.featured-preview {
  height: 18rem; /* enlarged h-72 for featured projects */
}

@media (max-width: 640px) {
  .featured-preview {
    height: 14rem;
  }
}

.featured-card {
  border: 1px solid rgba(148, 226, 213, 0.4);
  box-shadow: 0 10px 30px -10px rgba(148, 226, 213, 0.15);
  transition: all 0.3s ease-in-out;
}

.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px -5px rgba(148, 226, 213, 0.25);
  border-color: var(--ctp-teal);
}

.project-iframe {
  width: 100%;
  height: 100%;
  border: none;
  transform-origin: top left;
  pointer-events: none;
  display: block;
  transition: transform 0.3s ease;
}

/* Subtle zoom on card hover */
.group:hover .project-iframe {
  transform: scale(1.03);
}

/* Transparent overlay so clicks on the card reach the buttons below */
.iframe-overlay {
  position: absolute;
  inset: 0;
  cursor: default;
}
</style>
