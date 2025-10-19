import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { shallowRef } from 'vue'
import { setLocale } from '@/i18n'
import type { Lang } from '@/types'


export const useI18nStore = defineStore('i18n', () => {
  const { locale,  } = useI18n()
  const lang = shallowRef<Lang | string>(locale.value || 'ru')

  function onLangChange(value: Lang) {
    setLocale(value)
    lang.value = value
  }

  return {
    lang,
    onLangChange
  }
})
