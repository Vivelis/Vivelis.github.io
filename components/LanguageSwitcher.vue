<script setup lang="ts">
import { IconLanguage, IconChevronDown } from '@tabler/icons-vue';

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const switcherRef = ref<HTMLElement | null>(null);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const getTargetLocalePath = (code: string) => {
  if (code === 'fr') {
    return '/fr';
  }
  return switchLocalePath(code);
};

onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (switcherRef.value && !switcherRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  };
  window.addEventListener('click', handleClickOutside);
  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
  });
});
</script>

<template>
  <div ref="switcherRef" class="relative inline-block">
    <!-- Desktop version -->
    <div class="hidden md:flex items-center gap-1.5 bg-primary/40 border border-default rounded-lg px-2 py-1 backdrop-blur-sm">
      <IconLanguage class="w-5 h-5 text-secondary flex-shrink-0" />
      <div class="flex items-center gap-1">
        <NuxtLink
          v-for="loc in locales"
          :key="typeof loc === 'string' ? loc : loc.code"
          :to="getTargetLocalePath(typeof loc === 'string' ? loc : loc.code)"
          :class="[
            'px-2 py-0.5 text-xs font-bold rounded transition-all duration-200',
            locale === (typeof loc === 'string' ? loc : loc.code)
              ? 'bg-accent text-reverse shadow-sm'
              : 'text-secondary hover:text-heading hover:bg-secondary/60'
          ]"
          :aria-label="`Switch language to ${typeof loc === 'string' ? loc : loc.name}`"
        >
          {{ (typeof loc === 'string' ? loc : loc.code).toUpperCase() }}
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile version: compact button displaying current locale -->
    <div class="md:hidden relative">
      <button
        @click="toggleOpen"
        type="button"
        class="flex items-center gap-1 bg-primary/40 border border-default rounded-lg px-2 py-1 text-xs font-bold text-heading backdrop-blur-sm"
        aria-label="Toggle language menu"
      >
        <IconLanguage class="w-4 h-4 text-secondary flex-shrink-0" />
        <span>{{ locale.toUpperCase() }}</span>
        <IconChevronDown
          class="w-3 h-3 text-secondary transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>

      <!-- Mobile Dropdown Menu -->
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          class="absolute right-0 mt-2 w-32 bg-secondary border border-default rounded-lg shadow-xl py-1 z-50"
        >
          <NuxtLink
            v-for="loc in locales"
            :key="typeof loc === 'string' ? loc : loc.code"
            :to="getTargetLocalePath(typeof loc === 'string' ? loc : loc.code)"
            @click="close"
            :class="[
              'flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors duration-150',
              locale === (typeof loc === 'string' ? loc : loc.code)
                ? 'bg-accent/20 text-accent font-bold'
                : 'text-secondary hover:text-heading hover:bg-primary/50'
            ]"
          >
            <span>{{ typeof loc === 'string' ? loc.toUpperCase() : loc.name }}</span>
            <span v-if="locale === (typeof loc === 'string' ? loc : loc.code)" class="text-accent text-xs font-bold">✓</span>
          </NuxtLink>
        </div>
      </transition>
    </div>
  </div>
</template>
