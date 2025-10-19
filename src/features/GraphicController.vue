<template>
  <section class="chart-wrap" :style="{ height: heightEm }" aria-label="Top salaries chart">
    <svg ref="svgRef" class="chart"></svg>

    <div class="overlay" v-if="error">{{ error }}</div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, nextTick, toRef, onUnmounted } from 'vue'

import { storeToRefs } from 'pinia'
import { useFeaturesStore } from '@/stores/useFeaturesStore'
import { useGraphicDraw } from '@/composables/useGraphicDraw.ts'

interface Props {
  counter?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  counter: 15,
  height: 30
})

const store = useFeaturesStore()
const { items, error } = storeToRefs(store)

const svgRef = ref<SVGSVGElement | null>(null)
const heightEm = computed<string>(() => `${props.height}em`)
const counter = toRef(props, 'counter')

let resizeObserver: ResizeObserver | null = null

const { draw } = useGraphicDraw({
  svgRef,
  items,
  counter
})

onMounted(async () => {
  if (!items.value.length) {
    await store.fetchFeatures()
  }

  await nextTick()
  draw()

  if (svgRef.value) {
    resizeObserver = new ResizeObserver(() => draw())
    resizeObserver.observe(svgRef.value.parentElement!)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<style scoped>
.chart-wrap {
  width: 100%;
  height: 100%;
  padding: 1.2em 1.6em;
  box-sizing: border-box;
  background: var(--color-bg);
  border: 0.1em solid var(--color-border);
  border-radius: 0.8em;
  box-shadow: 0 0.2em 0.6em var(--color-shadow);
  position: relative;
}
.chart {
  width: 100%;
  height: 100%;
  display: block;
}
.overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 1.6em;
  color: var(--color-accent);
  background: rgba(255,255,255,0.6);
  border-radius: 0.8em;
}
</style>
