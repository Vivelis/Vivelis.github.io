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

// Carousel state
const activeImageIndices = ref({});

function getProjectImages(project) {
  if (project.images && project.images.length > 0) {
    return project.images;
  }
  if (project.image) {
    return [project.image];
  }
  return [];
}

function getActiveIndex(projectId) {
  return activeImageIndices.value[projectId] || 0;
}

function setActiveIndex(projectId, idx) {
  activeImageIndices.value = { ...activeImageIndices.value, [projectId]: idx };
}

function prevImage(projectId, total) {
  const current = getActiveIndex(projectId);
  setActiveIndex(projectId, (current - 1 + total) % total);
}

function nextImage(projectId, total) {
  const current = getActiveIndex(projectId);
  setActiveIndex(projectId, (current + 1) % total);
}

// Lightbox state
const activeLightbox = ref(null);

function openLightbox(project, index = 0) {
  activeLightbox.value = { project, index };
}

function closeLightbox() {
  activeLightbox.value = null;
}

function prevLightboxImage() {
  if (!activeLightbox.value) return;
  const imgs = getProjectImages(activeLightbox.value.project);
  activeLightbox.value.index = (activeLightbox.value.index - 1 + imgs.length) % imgs.length;
}

function nextLightboxImage() {
  if (!activeLightbox.value) return;
  const imgs = getProjectImages(activeLightbox.value.project);
  activeLightbox.value.index = (activeLightbox.value.index + 1) % imgs.length;
}

// Auto-slide state & handlers
const isHoveredMap = ref({});
let autoSlideTimer = null;

function startAutoSlide() {
  if (autoSlideTimer) clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => {
    if (activeLightbox.value || !projects.value) return;
    const allProjects = [...featuredProjects.value, ...otherProjects.value];
    allProjects.forEach(project => {
      const imgs = getProjectImages(project);
      if (imgs.length > 1 && !isHoveredMap.value[project.id]) {
        nextImage(project.id, imgs.length);
      }
    });
  }, 4000);
}

function handleMouseEnter(projectId) {
  isHoveredMap.value = { ...isHoveredMap.value, [projectId]: true };
}

function handleMouseLeave(projectId) {
  isHoveredMap.value = { ...isHoveredMap.value, [projectId]: false };
}

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  if (autoSlideTimer) clearInterval(autoSlideTimer);
});
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
              <div class="flex-1 flex flex-col">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="text-2xl font-bold text-heading">{{ project[locale].title }}</h4>
                  <span class="text-xs uppercase font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    Featured
                  </span>
                </div>
                <p class="text-secondary text-base md:text-lg mb-6 leading-relaxed">{{ project[locale].description }}</p>

                <!-- Preview: Image Carousel / Single Image / iframe fallback -->
                <div
                  v-if="getProjectImages(project).length > 0 || (project.demo && !iframeErrors[project.id])"
                  class="project-preview featured-preview mt-auto mb-6 overflow-hidden rounded-xl group/preview relative"
                  @mouseenter="handleMouseEnter(project.id)"
                  @mouseleave="handleMouseLeave(project.id)"
                >
                  <template v-if="getProjectImages(project).length > 0">
                    <div class="relative w-full h-full cursor-pointer select-none" @click="openLightbox(project, getActiveIndex(project.id))">
                      <Transition name="img-fade">
                        <img
                          :key="getActiveIndex(project.id)"
                          :src="getProjectImages(project)[getActiveIndex(project.id)]"
                          :alt="project[locale].title + ' screenshot ' + (getActiveIndex(project.id) + 1)"
                          class="w-full h-full object-cover object-top transition-all duration-500 group-hover/preview:scale-105"
                        />
                      </Transition>
                      <!-- Zoom badge indicator -->
                      <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        <span>Agrandir</span>
                      </div>
                    </div>

                    <!-- Carousel controls if multiple images -->
                    <template v-if="getProjectImages(project).length > 1">
                      <button
                        @click.stop="prevImage(project.id, getProjectImages(project).length)"
                        class="carousel-nav-btn left-2"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        @click.stop="nextImage(project.id, getProjectImages(project).length)"
                        class="carousel-nav-btn right-2"
                        aria-label="Next image"
                      >
                        ›
                      </button>

                      <!-- Carousel dots -->
                      <div class="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-auto">
                        <button
                          v-for="(_, imgIdx) in getProjectImages(project)"
                          :key="imgIdx"
                          @click.stop="setActiveIndex(project.id, imgIdx)"
                          :class="['carousel-dot', getActiveIndex(project.id) === imgIdx ? 'carousel-dot-active' : '']"
                          :aria-label="'Go to image ' + (imgIdx + 1)"
                        />
                      </div>
                    </template>
                  </template>

                  <!-- Fallback iframe when no images exist but demo is present -->
                  <template v-else-if="project.demo && !iframeErrors[project.id]">
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
              <div class="flex-1 flex flex-col">
                <h4 class="text-xl font-semibold text-heading mb-3">{{ project[locale].title }}</h4>
                <p class="text-secondary mb-4 leading-relaxed">{{ project[locale].description }}</p>

                <!-- Preview: Image Carousel / Single Image / iframe fallback -->
                <div
                  v-if="getProjectImages(project).length > 0 || (project.demo && !iframeErrors[project.id])"
                  class="project-preview mt-auto mb-4 overflow-hidden rounded-lg group/preview relative"
                  @mouseenter="handleMouseEnter(project.id)"
                  @mouseleave="handleMouseLeave(project.id)"
                >
                  <template v-if="getProjectImages(project).length > 0">
                    <div class="relative w-full h-full cursor-pointer select-none" @click="openLightbox(project, getActiveIndex(project.id))">
                      <Transition name="img-fade">
                        <img
                          :key="getActiveIndex(project.id)"
                          :src="getProjectImages(project)[getActiveIndex(project.id)]"
                          :alt="project[locale].title + ' screenshot ' + (getActiveIndex(project.id) + 1)"
                          class="w-full h-48 object-cover object-top transition-all duration-300 group-hover/preview:scale-105"
                        />
                      </Transition>
                      <div class="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                        <span>Agrandir</span>
                      </div>
                    </div>

                    <!-- Carousel controls if multiple images -->
                    <template v-if="getProjectImages(project).length > 1">
                      <button
                        @click.stop="prevImage(project.id, getProjectImages(project).length)"
                        class="carousel-nav-btn left-2"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        @click.stop="nextImage(project.id, getProjectImages(project).length)"
                        class="carousel-nav-btn right-2"
                        aria-label="Next image"
                      >
                        ›
                      </button>

                      <div class="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-auto">
                        <button
                          v-for="(_, imgIdx) in getProjectImages(project)"
                          :key="imgIdx"
                          @click.stop="setActiveIndex(project.id, imgIdx)"
                          :class="['carousel-dot', getActiveIndex(project.id) === imgIdx ? 'carousel-dot-active' : '']"
                          :aria-label="'Go to image ' + (imgIdx + 1)"
                        />
                      </div>
                    </template>
                  </template>

                  <!-- Fallback iframe when no images exist but demo is present -->
                  <template v-else-if="project.demo && !iframeErrors[project.id]">
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

    <!-- Lightbox Modal for full-screen screenshot viewing -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="activeLightbox" class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8" @click.self="closeLightbox">
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 p-2.5 rounded-full transition-all duration-200 z-50 border border-white/10"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center">
            <img
              :src="getProjectImages(activeLightbox.project)[activeLightbox.index]"
              :alt="activeLightbox.project[locale].title"
              class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />

            <!-- Lightbox nav controls -->
            <template v-if="getProjectImages(activeLightbox.project).length > 1">
              <button
                @click="prevLightboxImage"
                class="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full transition-all border border-white/10 flex items-center justify-center text-xl"
                aria-label="Previous screenshot"
              >
                ‹
              </button>
              <button
                @click="nextLightboxImage"
                class="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full transition-all border border-white/10 flex items-center justify-center text-xl"
                aria-label="Next screenshot"
              >
                ›
              </button>
              
              <div class="mt-4 text-xs font-semibold tracking-wider text-white/80 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                {{ activeLightbox.index + 1 }} / {{ getProjectImages(activeLightbox.project).length }}
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
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

.carousel-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.55);
  color: white;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  line-height: 1;
  opacity: 0;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  z-index: 10;
}

.group\/preview:hover .carousel-nav-btn {
  opacity: 0.9;
}

.carousel-nav-btn:hover {
  opacity: 1 !important;
  background: rgba(0, 0, 0, 0.85);
  transform: translateY(-50%) scale(1.1);
}

.carousel-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
  padding: 0;
}

.carousel-dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

.carousel-dot-active {
  width: 1.25rem;
  background: var(--ctp-teal);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.img-fade-enter-active {
  transition: opacity 0.5s ease;
}

.img-fade-leave-active {
  transition: opacity 0.2s ease;
}

.img-fade-enter-from,
.img-fade-leave-to {
  opacity: 0.2;
}
</style>

