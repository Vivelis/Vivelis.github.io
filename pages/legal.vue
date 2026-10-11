<script setup lang="ts">
import {
  IconArrowLeft,
  IconUserCheck,
  IconServer,
  IconCopyright,
  IconShieldCheck,
  IconExternalLink
} from '@tabler/icons-vue';

const { t } = useI18n();
const localePath = useLocalePath();

useHead({
  title: () => `${t('legal-page-title')} | Macéo Jalbert`,
  meta: [
    {
      name: 'description',
      content: () => t('legal-page-meta-description')
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:title',
      content: () => `${t('legal-page-title')} | Macéo Jalbert`
    },
    {
      property: 'og:description',
      content: () => t('legal-page-meta-description')
    }
  ]
});
</script>

<template>
  <div class="bg-primary min-h-screen text-primary flex flex-col justify-between">
    <Navigation />

    <main class="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
      <!-- Back button -->
      <div class="mb-8">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors duration-200 text-sm font-medium group"
        >
          <IconArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{{ t('legal-page-back') }}</span>
        </NuxtLink>
      </div>

      <!-- Header -->
      <header class="mb-12 border-b border-default pb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-heading mb-3">
          {{ t('legal-page-title') }}
        </h1>
        <p class="text-muted text-sm">
          {{ t('legal-page-updated') }}
        </p>
      </header>

      <!-- Sections -->
      <div class="space-y-8">
        <!-- 1. Éditeur du site -->
        <section class="card space-y-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-[var(--ctp-surface1)] text-accent">
              <IconUserCheck class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-semibold text-heading">
              {{ t('legal-editor-title') }}
            </h2>
          </div>
          <p class="text-secondary leading-relaxed">
            {{ t('legal-editor-desc') }}
          </p>
          <ul class="text-secondary space-y-2 list-disc list-inside pl-2">
            <li>
              <span class="font-medium text-primary">{{ t('legal-editor-author') }}</span>
              <span class="text-muted"> — {{ t('legal-editor-status') }}</span>
            </li>
            <li>
              <span class="font-medium text-primary">{{ t('legal-editor-contact') }}</span>
              <a
                href="https://www.linkedin.com/in/mac%C3%A9o-jalbert-200025222/"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-1 text-accent hover:underline inline-flex items-center gap-1"
              >
                LinkedIn
                <IconExternalLink class="w-3.5 h-3.5" />
              </a>
              <span class="text-muted"> / </span>
              <a
                href="https://github.com/Vivelis"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline inline-flex items-center gap-1"
              >
                GitHub
                <IconExternalLink class="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </section>

        <!-- 2. Hébergement (Vercel) -->
        <section class="card space-y-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-[var(--ctp-surface1)] text-accent">
              <IconServer class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-semibold text-heading">
              {{ t('legal-host-title') }}
            </h2>
          </div>
          <p class="text-secondary leading-relaxed">
            {{ t('legal-host-desc') }}
          </p>
          <div class="bg-[var(--ctp-mantle)] p-4 rounded-lg border border-default space-y-2 text-sm text-secondary">
            <p class="font-semibold text-primary">
              {{ t('legal-host-name') }}
            </p>
            <p>{{ t('legal-host-address') }}</p>
            <p>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline inline-flex items-center gap-1"
              >
                https://vercel.com
                <IconExternalLink class="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </section>

        <!-- 3. Propriété intellectuelle -->
        <section class="card space-y-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-[var(--ctp-surface1)] text-accent">
              <IconCopyright class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-semibold text-heading">
              {{ t('legal-ip-title') }}
            </h2>
          </div>
          <p class="text-secondary leading-relaxed">
            {{ t('legal-ip-desc') }}
          </p>
          <p class="text-muted text-sm leading-relaxed">
            {{ t('legal-ip-oss') }}
          </p>
        </section>

        <!-- 4. Données personnelles & Cookies -->
        <section class="card space-y-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-[var(--ctp-surface1)] text-accent">
              <IconShieldCheck class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-semibold text-heading">
              {{ t('legal-privacy-title') }}
            </h2>
          </div>
          <p class="text-secondary leading-relaxed">
            {{ t('legal-privacy-desc') }}
          </p>
          <p class="text-secondary leading-relaxed">
            {{ t('legal-privacy-analytics') }}
          </p>
          <p class="text-muted text-sm leading-relaxed">
            {{ t('legal-privacy-data') }}
          </p>
        </section>

        <!-- 5. Liens externes -->
        <section class="card space-y-4">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-[var(--ctp-surface1)] text-accent">
              <IconExternalLink class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-semibold text-heading">
              {{ t('legal-links-title') }}
            </h2>
          </div>
          <p class="text-secondary leading-relaxed">
            {{ t('legal-links-desc') }}
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>
