<template>
  <AppHeader>
    <template #action>
      <AppLanguageSwitch v-model="lang" @change="store.onLangChange" />
    </template>
  </AppHeader>

  <slot />
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppLanguageSwitch from '@/components/AppLanguageSwitch/AppLanguageSwitch.vue'
import { useI18nStore } from '@/stores/useI18nStore.ts'
import { storeToRefs } from 'pinia'

const store = useI18nStore()
const { lang } = storeToRefs(store)
</script>
