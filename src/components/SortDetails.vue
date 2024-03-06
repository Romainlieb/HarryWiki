<template>
    <div class="container">
        <div class="box">
            <img class="sort-image" v-if="sort.data && sort.data.attributes && sort.data.attributes.image" :src="sort.data.attributes.image" alt="Sort image">
            <div class="content">
                <h1>{{ sort.data && sort.data.attributes ? sort.data.attributes.name : '' }}</h1>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.category">Catégorie: {{ sort.data.attributes.category }}</p>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.creator">Créateur: {{ sort.data.attributes.creator }}</p>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.effect">Effet: {{ sort.data.attributes.effect }}</p>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.hand">Mouvement de la main: {{ sort.data.attributes.hand }}</p>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.incantation">Incantation: {{ sort.data.attributes.incantation }}</p>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.light">Lumière: {{ sort.data.attributes.light }}</p>
                <p v-if="sort.data && sort.data.attributes && sort.data.attributes.wiki"><a :href="sort.data.attributes.wiki" target="_blank">Plus d'informations</a></p>
            </div>
        </div>
        <router-link to="/sorts" class="button-container">
            <button type="button">Retour à la page des sorts</button>
        </router-link>
    </div>
</template>

<script>
import { getSort } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            sort: {},
            error: null
        }
    },
    async mounted() {
        try {
            const id = this.$route.params.id
            this.sort = await getSort(id)
            console.log(this.sort)
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

.box {
    display: flex;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
}

.sort-image {
    margin-right: 20px;
}

.content {
    flex: 1;
}

.sort-image {
    margin-right: 20px;
    object-fit: contain;
    max-width: 70%; 
}
</style>