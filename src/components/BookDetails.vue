<template>
    <div class="container">
        <div class="content">
            <div class="box">
                <h1>{{ book.data && book.data.attributes ? book.data.attributes.title : '' }}</h1>
                <img v-if="book.data && book.data.attributes && book.data.attributes.cover" :src="book.data.attributes.cover" alt="Book cover">
                <p v-if="book.data && book.data.attributes && book.data.attributes.author">Auteur: {{ book.data.attributes.author }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.pages">Nombre de pages: {{ book.data.attributes.pages }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.release_date">Date de sortie: {{ book.data.attributes.release_date }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.summary">Résumé: {{ book.data.attributes.summary }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.dedication">Dédicace: {{ book.data.attributes.dedication }}</p>
                <p v-if="book.data && book.data.attributes && book.data.attributes.wiki"><a :href="book.data.attributes.wiki" target="_blank">Plus d'informations</a></p>
            </div>
            <div class="box" v-if="chapters.length">
                <details>
                    <summary>Chapitres</summary>
                    <ul>
                        <li v-for="(chapter, index) in chapters" :key="index">
                            <h2>Chapitre {{ index + 1 }}: {{ chapter.attributes.title }}</h2>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
        <router-link to="/books" class="button-container">
            <button type="button">Retour à la page des livres</button>
        </router-link>
    </div>
</template>

<script>
import { getBook, getChapters } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            book: {},
            chapters: [],
            error: null
        }
    },
    async mounted() {
        try {
            const id = this.$route.params.id
            this.book = await getBook(id)
            this.chapters = await getChapters(id)
            console.log(this.book)
            console.log(this.chapters)
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

.content img {
    max-width: 25%;
    height: auto;
}

.box {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    border-radius: 15px;
}

h2 {
    font-size: 1.2em; /* Adjust as needed */
}
</style>