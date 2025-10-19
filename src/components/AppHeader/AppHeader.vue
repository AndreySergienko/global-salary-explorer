<template>
  <header class="header">
    <nav class="nav">
      <template v-for="item in items" :key="item.to">
        <slot
          name="link"
          :to="item.to"
          :label="$t(item.labelKey)"
          class="nav-link"
        >
          <RouterLink :to="item.to" class="nav-link">
            {{ $t(item.labelKey) }}
          </RouterLink>
        </slot>
      </template>
    </nav>

    <div class="header__action">
      <slot name="action" />
    </div>
  </header>
</template>

<script setup lang="ts">
const items = [
  { to: '/',        labelKey: 'nav.home' },
  { to: '/graphic', labelKey: 'nav.graphic' },
] as const
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg);
  border-bottom: 0.1em solid var(--color-border);
  box-shadow: 0 0.2em 0.4em var(--color-shadow);
  padding: 1em 1.6em;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav { display: flex; gap: 3em; }
.nav-link {
  position: relative;
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.6em;
  font-weight: 500;
  padding-bottom: 0.4em;
  transition: color 0.2s ease;
}
.nav-link:hover { color: var(--color-accent); }

.nav-link::after {
  content: ""; position: absolute; bottom: 0; left: 0;
  height: 0.2em; width: 0%; background-color: var(--color-accent);
  transition: width 0.25s ease;
}
.nav-link:hover::after { width: 100%; }

.header__action { display: flex; align-items: center; }
</style>
