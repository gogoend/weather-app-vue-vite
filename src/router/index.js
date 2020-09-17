import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../pages/404.vue'

import WeatherPage from '../pages/weather-page'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home/:code',
        name: 'home',
        component: WeatherPage
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }
]

let router = new VueRouter({
    // mode:'hash',
    base: process.env.BASE_URL,
    routes
})
export default router