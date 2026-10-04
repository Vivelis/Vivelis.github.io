<script setup>
import { IconBrandGithub, IconBrandLinkedin, IconSitemap } from '@tabler/icons-vue';

const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com/Vivelis', icon: IconBrandGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mac%C3%A9o-jalbert-200025222/', icon: IconBrandLinkedin }
]);
</script>

<template>
  <footer class="bg-secondary border-t border-default">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="text-center">
        <div class="flex justify-center gap-4 mb-6">
          <a v-for="link in socialLinks"
             :key="link.name"
             :href="link.url"
             target="_blank"
             rel="noopener noreferrer"
             class="icon-link"
             :aria-label="link.name">
            <component :is="link.icon" class="icon" />
          </a>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-muted text-sm">
          <span>&copy; {{ new Date().getFullYear() }} {{ $t('footer-component-title') }}</span>
          <span>&bull;</span>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted hover:text-accent transition-colors duration-200 inline-flex items-center gap-1"
            :aria-label="$t('footer-component-sitemap')"
          >
            <IconSitemap class="w-4 h-4" />
            <span>{{ $t('footer-component-sitemap') }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
