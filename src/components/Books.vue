<template>
    <div>
        <h1>Livres</h1>
        <input type="text" v-model="search" placeholder="Rechercher un livre">
        <ul class="book-list">
            <li v-for="book in paginatedData" :key="book.id">
                <router-link :to="`/livres/${book.id}`">
                    <div class="book-item">
                        <img :src="book.attributes ? book.attributes.cover : ''" alt="book image">
                        <div class="book-name">{{ book.attributes ? book.attributes.title : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 0">Précédent</button>
        <button @click="nextPage" :disabled="pageNumber >= pageCount - 1">Suivant</button>
    </div>
</template>

<script>
import { getBooks } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            books: [],
            search: '',
            error: null,
            pageNumber: 0,
            pageSize: 12
        }
    },
    computed: {
        filteredBooks() {
            return this.books.filter(book => 
                book.attributes.title.toLowerCase().includes(this.search.toLowerCase())
            );
        },
        pageCount() {
            return Math.ceil(this.filteredBooks.length / this.pageSize)
        },
        paginatedData() {
            const start = this.pageNumber * this.pageSize
            const end = start + this.pageSize
            return this.filteredBooks.slice(start, end)
            
        }
    },
    methods: {
        nextPage() {
            if (this.pageNumber < this.pageCount - 1) {
                this.pageNumber++
            }
        },
        previousPage() {
            if (this.pageNumber > 0) {
                this.pageNumber--
            }
        }
    },
    async mounted() {
        try {
            this.books = await getBooks()
            console.log(this.books)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.book-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    justify-content: flex-start;
    align-content: space-between;
}

.book-list li {
    flex: 0 0 auto;
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-width: 2.5px;
}

.book-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: center;
}

.book-item img{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: center;
}

.book-name {
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