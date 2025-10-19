import { setup } from '@storybook/vue3';
import '../src/assets/styles/main.scss';
import { createI18n } from 'vue-i18n'
import ru from '../src/i18n/locales/ru.json'
import en from '../src/i18n/locales/en.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: { ru, en },
})

setup(app => app.use(i18n))
