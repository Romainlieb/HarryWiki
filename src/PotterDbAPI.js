import axios from 'axios'

const API_URL = 'https://api.potterdb.com/v1'

export async function getPotions() {
    const response = await axios.get(`${API_URL}/potions`)
    return response.data.data // Ajoutez .data ici
}

export async function getPotion(id) {
    const response = await axios.get(`${API_URL}/potions/${id}`)
    return response.data
}

export async function getSorts() {
    // Remplacez cette URL par l'URL de votre API
    const response = await axios.get(`${API_URL}/spells`)
    return response.data.data 
}

export async function getSort(id) {
    const response = await axios.get(`${API_URL}/spells/${id}`)
    return response.data
}

export async function getBooks() {
    // Remplacez cette URL par l'URL de votre API
    const response = await axios.get(`${API_URL}/books`)
    return response.data.data 
}

export async function getBook(id) {
    // Remplacez cette URL par l'URL de votre API
    const response = await axios.get(`${API_URL}/books/${id}`)
    return response.data
}

export async function getCharacters() {
    // Remplacez cette URL par l'URL de votre API
    const response = await axios.get(`${API_URL}/characters`)
    return response.data.data 
}

export async function getCharacter(id) {
    // Remplacez cette URL par l'URL de votre API
    const response = await axios.get(`${API_URL}/characters/${id}`)
    return response.data
}