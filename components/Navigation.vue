<script setup lang="ts">
import { IconMenu2, IconX } from '@tabler/icons-vue';

const localePath = useLocalePath();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="bg-secondary border-b border-default sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center space-x-3" @click="closeMenu">
          <img src="/logo.svg" alt="Macéo Developer Logo" class="h-12 w-auto">
        </NuxtLink>
        
        <!-- Right side (Links + Language Switcher + Mobile menu) -->
        <div class="flex items-center space-x-3 md:space-x-6">
          <!-- Navigation Links (same place as before) -->
          <div class="hidden md:flex items-center space-x-6">
            <a href="#projects" class="text-secondary hover:text-accent transition-colors duration-200">
              {{ $t('projects-component-title') || 'Projects' }}
            </a>
            <a href="#homelab" class="text-secondary hover:text-accent transition-colors duration-200">
              {{ $t('homelab-component-title') || 'Homelab' }}
            </a>
            <a href="#technologies" class="text-secondary hover:text-accent transition-colors duration-200">
              {{ $t('technologies-component-title') || 'Technologies' }}
            </a>
          </div>

          <!-- Language Switcher (completely on the right) -->
          <LanguageSwitcher />
          
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              @click="toggleMenu" 
              class="text-secondary hover:text-accent p-2 rounded-lg transition-colors focus:outline-none" 
              aria-label="Toggle Menu"
            >
              <IconX v-if="isMenuOpen" class="w-6 h-6" />
              <IconMenu2 v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile dropdown menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <div v-if="isMenuOpen" class="md:hidden pt-4 pb-2 border-t border-default/50 mt-3 flex flex-col space-y-3">
          <a 
            href="#projects" 
            @click="closeMenu" 
            class="text-secondary hover:text-accent font-medium transition-colors duration-200 py-1"
          >
            {{ $t('projects-component-title') || 'Projects' }}
          </a>
          <a 
            href="#homelab" 
            @click="closeMenu" 
            class="text-secondary hover:text-accent font-medium transition-colors duration-200 py-1"
          >
            {{ $t('homelab-component-title') || 'Homelab' }}
          </a>
          <a 
            href="#technologies" 
            @click="closeMenu" 
            class="text-secondary hover:text-accent font-medium transition-colors duration-200 py-1"
          >
            {{ $t('technologies-component-title') || 'Technologies' }}
          </a>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
nav {
  backdrop-filter: blur(8px);
}

a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--accent-text);
  transition: width 0.2s ease-in-out;
}

a:hover::after {
  width: 100%;
}
</style>
