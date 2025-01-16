import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useBaseInfoStore } from './stores'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useBaseInfoStore()

app.mount('#app')
