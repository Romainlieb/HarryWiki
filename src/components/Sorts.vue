<template>
    <div>
        <h1>Sorts</h1>
        <input type="text" v-model="search" placeholder="Rechercher un sort">
        <ul class="sort-list">
            <li v-for="sort in paginatedData" :key="sort.id">
                <router-link :to="`/sorts/${sort.id}`">
                    <div class="sort-item">
                        <img :src="sort.attributes ? sort.attributes.image : ''" alt="Sort image">
                        <div class="sort-name">{{ sort.attributes ? sort.attributes.name : '' }}</div>
                    </div>
                </router-link>
            </li>
        </ul>
        <button @click="previousPage" :disabled="pageNumber <= 0">Précédent</button>
        <button @click="nextPage" :disabled="pageNumber >= pageCount - 1">Suivant</button>
    </div>
</template>

<script>
import { getSorts } from '../PotterDbAPI.js'

export default {
    data() {
        return {
            sorts: [],
            search: '',
            error: null,
            pageNumber: 0,
            pageSize: 12
        }
    },
    computed: {
        filteredSorts() {
            return this.sorts.filter(sort => 
                sort.attributes.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
        pageCount() {
            return Math.ceil(this.filteredSorts.length / this.pageSize)
        },
        paginatedData() {
            const start = this.pageNumber * this.pageSize
            const end = start + this.pageSize
            return this.filteredSorts.slice(start, end)
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
            this.sorts = await getSorts()
            console.log(this.sorts)
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