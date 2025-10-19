<template>
  <section class="page">
    <header class="page__header">
      <h1 class="page__title">Мировые зарплаты на карте</h1>
      <p class="page__subtitle">
        Чем насыщеннее цвет — тем выше значение. Наведите на страну, чтобы увидеть годовую и месячную сумму.
      </p>

      <div class="page__legend-hint">
        <span class="page__dot page__dot--low" aria-hidden="true"></span>
        ниже средних
        <span class="page__sep">•</span>
        <span class="page__dot page__dot--high" aria-hidden="true"></span>
        выше средних
      </div>

      <p class="page__subtitle">
        <i>Если область не имеет окраса на карте, значит по ней не удалось найти достоверную информацию</i>
      </p>
    </header>

    <div class="page__map">
      <MapSection />
    </div>
  </section>
</template>

<script setup lang="ts">
import MapSection from '@/features/MapController.vue'
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
