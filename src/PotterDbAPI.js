import axios from 'axios'

const API_URL = 'https://api.potterdb.com/v1'

export async function getPotions() {
    let potions = [];
    let pageNumber = 1;
    let response;

    do {
        response = await axios.get(`${API_URL}/potions?page[size]=100&page[number]=${pageNumber}`);
        const data = response.data;

        potions = potions.concat(data.data);
        pageNumber++;
    } while (response.data.links.next);

    return potions;
}

export async function getPotion(id) {
    const response = await axios.get(`${API_URL}/potions/${id}`)
    return response.data
}

export async function getSorts() {
    let sorts = [];
    let pageNumber = 1;
    let response;

    do {
        response = await axios.get(`${API_URL}/spells?page[size]=100&page[number]=${pageNumber}`);
        const data = response.data;

        sorts = sorts.concat(data.data);
        pageNumber++;
    } while (response.data.links.next);

    return sorts;
}

export async function getSort(id) {
    const response = await axios.get(`${API_URL}/spells/${id}`)
    return response.data
}

export async function getBooks() {
    let books = [];
    let pageNumber = 1;
    let response;

    do {
        response = await axios.get(`${API_URL}/books?page[size]=100&page[number]=${pageNumber}`);
        const data = response.data;

        books = books.concat(data.data);
        pageNumber++;
    } while (response.data.links.next);

    return books;
}

export async function getBook(id) {
    const response = await axios.get(`${API_URL}/books/${id}`)
    return response.data
}

export async function getCharacters(pageNumber = 0) {
    const response = await axios.get(`${API_URL}/characters?page[size]=12&page[number]=${pageNumber}`);
    return response.data.data;
}

export async function getCharacter(id) {
    const response = await axios.get(`${API_URL}/characters/${id}`)
    return response.data.data;
}

export async function getChapters(id) {
    const response = await axios.get(`${API_URL}/books/${id}/chapters`)
    return response.data.data
}