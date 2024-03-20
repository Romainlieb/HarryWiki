<template>
    <div>
        <h1>Personnage</h1>
        <input type="text" v-model="search" placeholder="Rechercher un personnage">
        <ul class="character-list">
            <li v-for="character in characters" :key="character.id">
                <router-link :to="`/characters/${character.id}`">
                    <div class="character-item">
                        <img :src="character.attributes ? character.attributes.image : ''" alt="Character image">
                        <div class="character-name">{{ character.attributes ? character.attributes.name : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 0">Précédent</button>
        <button @click="nextPage" >Suivant</button>
    </div>
</template>

<script>
import { getCharacters } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            characters: [],
            search: '',
            error: null,
            pageNumber: 1, // Ajoutez cette ligne
            pageSize: 12 // Ajoutez cette ligne
        }
    },
    computed: {
        filteredCharacters() {
            return this.characters.filter(character => 
                character.attributes.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
        pageCount() { // Ajoutez ce bloc
            return Math.ceil(this.filteredCharacters.length / this.pageSize)
        },
        paginatedData() { // Ajoutez ce bloc
            const start = this.pageNumber * this.pageSize
            const end = start + this.pageSize
            return this.filteredCharacters.slice(start, end)
        }
    },
    methods: {
        async nextPage() {
            //if (this.pageNumber < this.pageCount - 1) {
                this.pageNumber++
                this.characters = await getCharacters(this.pageNumber)
                console.log(this.characters) // Ajoutez cette ligne
            //}
        },
        previousPage() {
            if (this.pageNumber > 0) {
                this.pageNumber--
            }
        }
    },
    async mounted() {
        try {
            this.characters = await getCharacters(1)
            console.log(this.characters) // Ajoutez cette ligne
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.character-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    justify-content: space-between;
}

.character-list li {
    flex: 0 0 auto;
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-width: 2.5px;
}

.character-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.character-name {
    margin-top: 10px;
}

input[type="text"] {
    width: calc(100% - 40px);
    padding: 10px 20px;
    margin: 20px;
    box-sizing: border-box;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}
</style>