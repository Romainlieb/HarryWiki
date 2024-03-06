<template>
    <div>
        <h1>Potions</h1>
        <ul class="potion-list">
            <li v-for="potion in potions" :key="potion.id">
                <router-link :to="`/potions/${potion.id}`">
                    <div class="potion-item">
                        <img :src="potion.attributes ? potion.attributes.image : ''" alt="Potion image">
                        <div class="potion-name">{{ potion.attributes ? potion.attributes.name : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-link to="/">
            <button type="button">Retour à la page principale</button>
        </router-link>
    </div>
</template>

<script>
import { getPotions } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            potions: [],
            error: null
        }
    },
    async mounted() {
        try {
            this.potions = await getPotions()
            console.log(this.potions) // Ajoutez cette ligne
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.potion-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
}

.potion-list li {
    flex: 1 0 25%;
    max-width: 25%;
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.potion-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.potion-name {
    margin-top: 10px;
}
</style>