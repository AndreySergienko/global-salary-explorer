<template>
  <section class="page">
    <div class="page__header">
      <h1 class="page__title">{{ $t('title') }}</h1>
      <p class="page__subtitle">
        {{ $t('subtitle1') }}
      </p>

      <div class="page__legend-hint">
        <span class="page__dot page__dot--low" aria-hidden="true"></span>
        {{ $t('legend.low') }}
        <span class="page__sep">{{ $t('legend.sep') }}</span>
        <span class="page__dot page__dot--high" aria-hidden="true"></span>
        {{ $t('legend.high') }}
      </div>

      <p class="page__subtitle">
        <i>{{ $t('subtitle2') }}</i>
      </p>
    </div>

    <div class="page__map">
      <MapController />
    </div>
  </section>
</template>

<script setup lang="ts">
import MapController from '@/features/map/controllers/MapController.vue'
</script>

<style scoped lang="scss">
.page {
  padding: 2rem 1.6rem;
  color: var(--color-text);
  font-family: var(--font-main), sans-serif;
}

.page__header {
  max-width: 72rem;
  margin: 0 auto 2rem auto;
  text-align: center;
}

.page__title {
  margin: 0 0 0.6rem 0;
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 700;
  color: var(--color-text);
}

.page__subtitle {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.5;
  opacity: 0.9;
}

.page__legend-hint {
  margin-top: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;
  opacity: 0.85;
}

.page__sep {
  opacity: 0.5;
}

.page__dot {
  display: inline-block;
  width: 1.2em;
  height: 0.9em;
  border-radius: 0.2em;
  box-shadow: 0 0.05em 0.2em var(--color-shadow);
  border: 0.08em solid var(--color-border);
  vertical-align: middle;
}

.page__dot--low  { background: var(--color-start-hex); }
.page__dot--high { background: var(--color-end-hex); }

.page__map {
  max-width: 110rem;
  margin: 0 auto;
  display: grid;
  place-items: center;
}
</style>
