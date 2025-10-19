import { createI18n } from 'vue-i18n'
import ru from './locales/ru.json'
import en from './locales/en.json'

export type Locale = 'ru' | 'en'

const i18n = createI18n({
  legacy: false,
  locale: (localStorage.getItem('locale') as Locale) || 'ru',
  fallbackLocale: 'en',
  messages: { ru, en },
  globalInjection: true
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}

export default i18n
