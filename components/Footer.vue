<script setup>
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-vue';

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
        <p class="text-muted text-sm">
          &copy; {{ new Date().getFullYear() }} {{ $t('footer-component-title') }}
        </p>
      </div>
    </div>
  </footer>
</template>