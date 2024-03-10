import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import Potions from './components/Potions.vue'
import PotionDetails from './components/PotionDetails.vue'
import Sorts from './components/Sorts.vue'
import SortDetails from './components/SortDetails.vue' // Importez le nouveau composant
import Books from './components/Books.vue'
import Characters from './components/Characters.vue'
import CharactersDetails from './components/CharactersDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HelloWorld },
    { path: '/potions', component: Potions },
    { path: '/potions/:id', name: 'PotionDetails', component: PotionDetails },
    { path: '/sorts', component: Sorts },
    { path: '/sorts/:id', name: 'SortDetails', component: SortDetails }, // Ajoutez cette ligne
    { path: '/books', component: Books },
    { path: '/characters', component: Characters },
    { path: '/characters/:id', name: 'CharactersDetails', component: CharactersDetails }
  ]
})

createApp(App).use(router).mount('#app')