<script setup>
const { t } = useI18n();

const config = useRuntimeConfig();
const statusUrl = config.public.uptimeKumaUrl;
</script>

<template>
  <section class="homelab px-6 py-16">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="text-center mb-4">
        <h2 class="animate__animated animate__fadeInLeft animate__delay-2s text-4xl md:text-5xl font-extrabold text-heading inline-block underline decoration-[var(--ctp-teal)] decoration-4 underline-offset-8">
          {{ $t('homelab-component-title') }}
        </h2>
      </div>
      <p class="animate__animated animate__fadeInLeft animate__delay-2s text-secondary text-center max-w-2xl mx-auto mb-12 leading-relaxed">
        {{ $t('homelab-component-description') }}
      </p>

      <!-- Status embed card -->
      <div class="animate__animated animate__fadeInUp animate__delay-3s homelab-card">
        <!-- Card header -->
        <div class="homelab-card-header">
          <div class="status-dot"></div>
          <span class="text-sm font-medium text-heading">{{ $t('homelab-component-status-title') }}</span>
          <a
            :href="statusUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-auto btn btn-secondary text-sm"
          >
            {{ $t('homelab-component-status-link') }}
          </a>
        </div>

        <!-- Uptime Kuma iframe -->
        <div class="homelab-iframe-wrapper">
          <iframe
            :src="statusUrl"
            title="Homelab Status — Uptime Kuma"
            class="homelab-iframe"
            style="color-scheme: dark;"
            loading="lazy"
            tabindex="-1"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            scrolling="auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Card shell ─────────────────────────────────────────────────────── */
.homelab-card {
  border-radius: 1rem;
  border: 1px solid var(--border-default, rgba(255, 255, 255, 0.1));
  background: var(--secondary-bg);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s ease;
}

.homelab-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.36);
}

/* ── Card top bar ───────────────────────────────────────────────────── */
.homelab-card-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--border-default, rgba(255, 255, 255, 0.08));
  background: var(--primary-bg);
}

/* Animated green dot signalling "live" */
.status-dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: #22c55e;
  flex-shrink: 0;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.3); }
}

/* ── iframe container ───────────────────────────────────────────────── */
.homelab-iframe-wrapper {
  width: 100%;
  /* Fixed height — tall enough for a typical Uptime Kuma public page */
  height: 600px;
  overflow: hidden;
  background: var(--primary-bg);
  color-scheme: dark;
}

.homelab-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  color-scheme: dark;
  /* Scale a ~1280-wide desktop viewport into the container */
  transform-origin: top left;
}

/* ── Responsive tweaks ──────────────────────────────────────────────── */
@media (max-width: 768px) {
  .homelab-iframe-wrapper {
    height: 480px;
  }
}
</style>
