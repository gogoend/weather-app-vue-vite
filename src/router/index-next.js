import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/404.vue'

import WeatherPage from '../pages/weather-page/index.vue'

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/home',
            name: 'home',
            component: WeatherPage
        },
        // {
        //     path: '*',
        //     name: '404',
        //     component: NotFound
        // }
    ]
  })

  export default router
