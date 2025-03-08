<script setup>
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-vue';

const socialLinks = ref([
  { name: 'GitHub', url: 'https://github.com/Vivelis', icon: IconBrandGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mac%C3%A9o-jalbert-200025222/', icon: IconBrandLinkedin }
]);
</script>

<template>
  <footer class="footer pt-10">
    <p class="text-center text-secondary">
      &copy; {{ new Date().getFullYear() }} {{ $t('footer-component-title') }}
    </p>
    <div class="flex justify-center gap-4 mt-2">
      <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" class="icon-link">
        <component :is="link.icon" class="icon" />
      </a>
    </div>
  </footer>
</template>