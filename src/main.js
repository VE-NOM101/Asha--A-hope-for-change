import './assets/main.css'
import 'vue3-toastify/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
// Hide preloader after Vue mounts
const preloader = document.getElementById('preloader')
if (preloader) {
  preloader.style.display = 'none'
}
