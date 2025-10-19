<script setup lang="ts">
import { computed } from 'vue'

export type Props = {
  label: string
  locale?: string
  currency?: string
  yearly: number
  monthly?: number | null
  t: (value: string) => string
}

const props = withDefaults(defineProps<Props>(), {
  locale: 'ru-RU',
  currency: 'USD',
})

const formattedSalaryPerYear = computed(() =>
  new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency,
    maximumFractionDigits: 0,
  }).format(props.yearly)
)

const formattedSalaryPerMonth = computed(() =>
   props.monthly ? (new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency,
    maximumFractionDigits: 0,
  }).format(props.monthly)) : 'No data'
)
</script>

<template>
  <div class="map-legend">
    <div class="map-legend__title">{{ label }}</div>

    <div class="map-legend__row">
      <span class="map-legend__label">{{ t('legend.year') }}</span>
      <span class="map-legend__value">{{ formattedSalaryPerYear }}</span>
    </div>

    <div class="map-legend__row">
      <span class="map-legend__label">{{ t('legend.month') }}</span>
      <span class="map-legend__value">{{ formattedSalaryPerMonth }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.map-legend {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-main), sans-serif;
  font-size: 1.3rem;
  line-height: 1.4;

  padding: 0.3rem .3rem;
  border-radius: 0.8em;
  box-shadow: 0 0.1em 0.4em var(--color-shadow);

  min-width: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &__title {
    font-weight: 700;
    font-size: 1.1em;
    color: var(--color-text);
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  &__row {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
  }

  &__label {
    color: var(--color-text);
    opacity: 0.8;
    font-size: 0.95em;
    white-space: nowrap;
  }

  &__value {
    font-weight: 700;
    color: var(--color-accent);
    font-size: 1em;
    white-space: nowrap;
  }
}
</style>
