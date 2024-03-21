<template>
    <div class="container">
        <div class="box">
            <img class="character-image" v-if="character.attributes && character.attributes.image" :src="character.attributes.image" alt="Character image">
            <div class="content">
                <h1>{{ character.attributes ? character.attributes.name : '' }}</h1>
                <p v-if="character.attributes && character.attributes.nationality">Nationalité: {{ character.attributes.nationality }}</p>
                <p v-if="character.attributes && character.attributes.born">Date et lieu de naissance: {{ character.attributes.born }}</p>
                <p v-if="character.attributes && character.attributes.house">Affiliation: {{ character.attributes.house }}</p>
                <div v-if="character.attributes && character.attributes.wands" v-for="wand in character.attributes.wands">
                    <p >Baguette : {{ wand }}</p>
                </div>
            </div>
        </div>
        <router-link to="/characters" class="button-container">
            <button type="button">Retour à la page des characters</button>
        </router-link>
    </div>
</template>

<script>
import { getCharacter } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            character: {},
            error: null
        }
    },
    async mounted() {
        try {
            const id = this.$route.params.id
            this.character = await getCharacter(id)
            console.log(this.character)
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
    border-radius: 15px;
}

.character-image {
    margin-right: 20px;
}

.content {
    flex: 1;
}

.character-image {
    margin-right: 20px;
    object-fit: contain;
    max-width: 70%; 
}
</style>