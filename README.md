# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

Afin de configuré et démarrer le projet sans problème voici les étapes à suivre:

après avoir cloné le projet, il faut taper dans le terminal les commandes suivantes:

- npm install (pour installer toutes les dépendances nécessaire au projet)
- npm list(pour lister toutes les dépendances installées)
  Assurez vous qu'après avoir tapé cette commande vous ayez bien cette liste :
  ├── @vitejs/plugin-vue@5.0.4
  ├── axios@1.6.7
  ├── lodash@4.17.21
  ├── vite@5.1.3
  ├── vue-router@4.3.0
  └── vue@3.4.19

Ensuite effectuez la commande npm run dev, vous devriez avoir quelque chose comme ça:
VITE v5.1.3 ready in 457 ms

➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help

tapez dans la barre d'adresse de votre moteur de recherche l'adresse inscrite dans "local" et vous devriez avoir accès au site internet.

Concernant la structure du projet celle ci s'organise principalement avec tous les components c'est à dire toutes les différents pages de notre wiki. Ces components sont situés dans src/assets/components.
Ensuite le main.js sert de redirection vers les différentes pages avec le chemin de toutes les pages de notr wiki
Le fichier PotterDbAPI.js contient toutes les requêtes qui sont faites à l'API
Et enfin nous avons un fichier de configuration de vite.js intitulé vite.config.js
