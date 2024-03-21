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
        <button @click="previousPage" :disabled="pageNumber <= 1">Précédent</button>
        <button @click="nextPage" :disabled="isLastPage">Suivant</button>
    </div>
</template>

<script>
import { getCharacters, searchCharacters } from '../PotterDbAPI.js'
import _ from 'lodash'

export default {
    data() {
        return {
            characters: [],
            search: '',
            error: null,
            pageNumber: 1,
            pageSize: 12,
            isLastPage: false
        }
    },
    watch: {
        search: {
            handler: _.debounce(async function (newSearch) {
                if (newSearch) {
                    this.characters = await searchCharacters(newSearch)
                } else {
                    this.characters = await getCharacters(this.pageNumber)
                }
            }, 300),
            immediate: true
        }
    },
    methods: {
        async nextPage() {
            const nextPageNumber = this.pageNumber + 1
            const nextPageData = await getCharacters(nextPageNumber)
            if (nextPageData.length > 0) {
                this.pageNumber = nextPageNumber
                this.characters = nextPageData
                this.isLastPage = false
            } else {
                this.isLastPage = true
            }
        },
        async previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber--
                this.characters = await getCharacters(this.pageNumber)
                this.isLastPage = false
            }
        }
    },
    async mounted() {
        try {
            this.characters = await getCharacters(1)
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