<template>
  <header class="app-header">
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Главная</RouterLink>
      <RouterLink to="/graphic" class="nav-link">График</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border-bottom: 0.1em solid var(--color-border);
  box-shadow: 0 0.2em 0.4em var(--color-shadow);
  padding: 1em 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  gap: 3em;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.6em;
  font-weight: 500;
  padding-bottom: 0.4em;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.2em;
  width: 0%;
  background-color: var(--color-accent);
  transition: width 0.25s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.is-active {
  color: var(--color-accent);
}

.nav-link.is-active::after {
  width: 100%;
}
</style>
