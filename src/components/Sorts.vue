<template>
    <div>
        <h1>Sorts</h1>
        <input type="text" v-model="search" placeholder="Rechercher un sort">
        <ul class="sort-list">
            <li v-for="sort in sorts" :key="sort.id">
                <router-link :to="`/sorts/${sort.id}`">
                    <div class="sort-item">
                        <img :src="sort.attributes ? sort.attributes.image : ''" alt="Sort image">
                        <div class="sort-name">{{ sort.attributes ? sort.attributes.name : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 1">Précédent</button>
        <button @click="nextPage" :disabled="isLastPage">Suivant</button>
    </div>
</template>

<script>
import { getSorts, searchSorts } from '../PotterDbAPI.js'
import _ from 'lodash'

export default {
    data() {
        return {
            sorts: [],
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
                    this.sorts = await searchSorts(newSearch)
                } else {
                    this.sorts = await getSorts(this.pageNumber)
                }
            }, 300),
            immediate: true
        }
    },
    methods: {
        async nextPage() {
            const nextPageNumber = this.pageNumber + 1
            const nextPageData = await getSorts(nextPageNumber)
            if (nextPageData.length > 0) {
                this.pageNumber = nextPageNumber
                this.sorts = nextPageData
                this.isLastPage = false
            } else {
                this.isLastPage = true
            }
        },
        async previousPage() {
            if (this.pageNumber > 1) {
                this.pageNumber--
                this.sorts = await getSorts(this.pageNumber)
                this.isLastPage = false
            }
        }
    },
    async mounted() {
        try {
            this.sorts = await getSorts(1)
        } catch (error) {
            this.error = error.message
            console.error(error)
        }
    }
}
</script>

<style scoped>
.sort-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    justify-content: space-between;
}

.sort-list li {
    flex: 0 0 auto;
    width: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    border-width: 2.5px;
}

.sort-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.sort-name {
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