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

