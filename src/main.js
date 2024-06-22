import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'
import 'bootstrap'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(store)
    .mount('#app')
