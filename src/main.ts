import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import '@styles/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
})


app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
