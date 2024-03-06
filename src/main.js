import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import Potions from './components/Potions.vue'
import PotionDetails from './components/PotionDetails.vue' // Importez le nouveau composant

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/potions', component: Potions },
    { path: '/potions/:id', name: 'PotionDetails', component: PotionDetails }
  ]
})

createApp(App).use(router).mount('#app')