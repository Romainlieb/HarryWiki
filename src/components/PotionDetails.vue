<template>
    <div class="container">
        <div class="content">
            <h1>{{ potion.data && potion.data.attributes ? potion.data.attributes.name : '' }}</h1>
            <img :src="potion.data && potion.data.attributes ? potion.data.attributes.image : ''" alt="Potion image">
            <!-- Affichez ici d'autres détails sur la potion -->
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
            console.log(this.potion) // Ajoutez cette ligne
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

.button-container {
    margin-bottom: 20px;
}
</style>