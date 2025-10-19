<template>
  <div class="lang-switch" role="group" aria-label="Language switch">
    <button
      class="btn"
      :class="{ 'is-active': modelValue === 'ru' }"
      @click="$emit('update:modelValue', 'ru'); $emit('change', 'ru')"
      type="button"
    >ru</button>

    <button
      class="btn"
      :class="{ 'is-active': modelValue === 'en' }"
      @click="$emit('update:modelValue', 'en'); $emit('change', 'en')"
      type="button"
    >en</button>
  </div>
</template>

<script setup lang="ts">
import type { Lang } from '@/types'

interface Props {
  modelValue?: Lang;
}

interface Emits {
  (e: 'update:modelValue', v: Lang): void
  (e: 'change', v: Lang): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.lang-switch {
  display: inline-flex;
  gap: 0.6em;
  background: var(--color-bg);
  padding: 0.4em;
  border: 0.1em solid var(--color-border);
  border-radius: 1.2em;
  box-shadow: 0 0.2em 0.4em var(--color-shadow) inset;
}

.btn {
  font: inherit;
  padding: 0.4em 0.9em;
  border: 0.1em solid transparent;
  background: transparent;
  color: var(--color-text);
  border-radius: 0.9em;
  cursor: pointer;
}

.btn.is-active {
  background: var(--color-accent);
  color: #fff;
}
</style>
