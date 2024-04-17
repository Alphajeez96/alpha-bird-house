import './assets/main.scss'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

pinia.use(
  createPersistedState({
    storage: sessionStorage
  })
)

app.mount('#app')
