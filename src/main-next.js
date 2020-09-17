import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index-next'
import './reset.css'

let app = createApp(App)

app.use(router)

app.mount('#app');
