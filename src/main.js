import Vue, { createApp } from 'vue'
import App from './App.vue'
import './reset.css'

if (createApp) {
    createApp(App).mount('#app');
} else {
    new Vue({
        el: '#app',
        components: {
            App
        },
        render(h) {
            return h(App)
        },
        // template:'<App />'
    })
}
