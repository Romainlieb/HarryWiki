<template>
    <div class="container">
        <div class="content">
            <h1>{{ potion.data && potion.data.attributes ? potion.data.attributes.name : '' }}</h1>
            <img v-if="potion.data && potion.data.attributes && potion.data.attributes.image" :src="potion.data.attributes.image" alt="Potion image">
            <p v-if="potion.data && potion.data.attributes && potion.data.attributes.difficulty">Difficulté: {{ potion.data.attributes.difficulty }}</p>
            <p v-if="potion.data && potion.data.attributes && potion.data.attributes.effect">Effets: {{ potion.data.attributes.effect }}</p>
            <p v-if="potion.data && potion.data.attributes && potion.data.attributes.time">Temps de préparation: {{ potion.data.attributes.time }}</p>
            <div class="box" v-if="potion.data && potion.data.attributes && potion.data.attributes.ingredients && potion.data.attributes.ingredients.length">
                <details>
                    <summary>Ingrédients</summary>
                    <ul>
                        <li v-for="ingredient in potion.data.attributes.ingredients.split(', ')" :key="ingredient">
                            {{ ingredient }}
                        </li>
                    </ul>
                </details>
            </div>
            <div class="box" v-if="potion.data && potion.data.attributes && potion.data.attributes.characteristics && potion.data.attributes.characteristics.length">
                <details>
                    <summary>Caractéristiques</summary>
                    <ul>
                        <li v-for="characteristic in potion.data.attributes.characteristics.split(', ')" :key="characteristic">
                            {{ characteristic }}
                        </li>
                    </ul>
                </details>
            </div>
            <div class="box" v-if="potion.data && potion.data.attributes && potion.data.attributes.inventors && potion.data.attributes.inventors.length">
                <details>
                    <summary>Inventeurs</summary>
                    <ul>
                        <li v-for="inventor in potion.data.attributes.inventors.split(', ')" :key="inventor">
                            {{ inventor }}
                        </li>
                    </ul>
                </details>
            </div>
            <div class="box" v-if="potion.data && potion.data.attributes && potion.data.attributes.manufacturers && potion.data.attributes.manufacturers.length">
                <details>
                    <summary>Fabricants</summary>
                    <ul>
                        <li v-for="manufacturer in potion.data.attributes.manufacturers.split(', ')" :key="manufacturer">
                            {{ manufacturer }}
                        </li>
                    </ul>
                </details>
            </div>
            <div class="box" v-if="potion.data && potion.data.attributes && potion.data.attributes.side_effects && potion.data.attributes.side_effects.length">
                <details>
                    <summary>Effets secondaires</summary>
                    <ul>
                        <li v-for="sideEffect in potion.data.attributes.side_effects.split(', ')" :key="sideEffect">
                            {{ sideEffect }}
                        </li>
                    </ul>
                </details>
            </div>
        </div>
        <router-link to="/potions" class="button-container">
            <button type="button">Retour à la page des potions</button>
        </router-link>
    </div>
</template>

<script>
import { getPotion } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            potion: {},
            error: null
        }
    },
    async mounted() {
        try {
            const id = this.$route.params.id
            this.potion = await getPotion(id)
            console.log(this.potion)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content {
    flex: 1;
}

.box {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
}
</style>