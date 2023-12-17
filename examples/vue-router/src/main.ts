import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: defineAsyncComponent(() => import('./pages/home.vue')) },
    { path: '/about', component: defineAsyncComponent(() => import('./pages/about.vue')) },
  ],
})

createApp(App).use(router).mount('#app')
