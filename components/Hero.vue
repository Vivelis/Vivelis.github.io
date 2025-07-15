<template>
  <section class="hero px-6 py-20 lg:py-32">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="animate__animated animate__backInDown text-4xl md:text-6xl font-bold text-heading mb-6 leading-tight">
        {{ $t('hero-component-title') }}
      </h1>
      <p class="animate__animated animate__backInLeft animate__delay-1s text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
        {{ $t('hero-component-description') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 100%);
}
</style>
