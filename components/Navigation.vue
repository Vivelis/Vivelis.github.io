<template>
  <nav class="bg-secondary border-b border-default sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <img src="/logo.svg" alt="Macéo Developer Logo" class="h-12 w-auto">
        </div>
        
        <!-- Navigation Links (optional - can be expanded later) -->
        <div class="hidden md:flex items-center space-x-6">
          <a href="#projects" class="text-secondary hover:text-accent transition-colors duration-200">
            {{ $t('projects-component-title') || 'Projects' }}
          </a>
          <a href="#technologies" class="text-secondary hover:text-accent transition-colors duration-200">
            {{ $t('technologies-component-title') || 'Technologies' }}
          </a>
        </div>
        
        <!-- Mobile menu button (placeholder for future) -->
        <div class="md:hidden">
          <button class="text-secondary hover:text-accent p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
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
