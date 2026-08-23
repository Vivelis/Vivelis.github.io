<script setup lang="ts">
const { t } = useI18n();
const isLoading = ref(true);
let timer: ReturnType<typeof setTimeout> | null = null;

const hideLoading = (delay = 400) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    isLoading.value = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, delay);
};

const showLoading = () => {
  if (timer) clearTimeout(timer);
  isLoading.value = true;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
};

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  }

  // Allow content to hydrate and render before hiding loader
  hideLoading(600);

  const nuxtApp = useNuxtApp();
  nuxtApp.hook('page:start', () => {
    showLoading();
  });
  nuxtApp.hook('page:finish', () => {
    hideLoading(300);
  });
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Transition name="loading-fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1e1e2e] text-white select-none backdrop-blur-sm"
    >
      <div class="flex flex-col items-center space-y-6">
        <!-- Logo with pulse glow -->
        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-4 rounded-full bg-gradient-to-r from-[var(--ctp-teal,#94e2d5)] to-[var(--ctp-mauve,#cba6f7)] opacity-40 blur-xl animate-pulse" />
          <img src="/logo.svg" alt="Macéo Developer Logo" class="h-16 w-auto relative z-10 drop-shadow-[0_0_12px_rgba(148,226,213,0.3)]">
        </div>

        <!-- Spinner & Progress bar -->
        <div class="flex flex-col items-center space-y-3">
          <div class="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
            <div class="loading-bar h-full rounded-full bg-gradient-to-r from-[var(--ctp-teal,#94e2d5)] via-[var(--ctp-mauve,#cba6f7)] to-[var(--ctp-sky,#89dceb)]" />
          </div>
          <span class="text-xs uppercase tracking-widest text-white/70 font-medium animate-pulse">
            {{ t('loading') }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-bar {
  width: 100%;
  animation: loading-progress 1.2s ease-in-out infinite;
  transform-origin: left;
}

@keyframes loading-progress {
  0% {
    transform: translateX(-100%) scaleX(0.2);
  }
  50% {
    transform: translateX(0%) scaleX(0.7);
  }
  100% {
    transform: translateX(100%) scaleX(0.2);
  }
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}
</style>
