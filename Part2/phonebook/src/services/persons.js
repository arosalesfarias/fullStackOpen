import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
    .then( res => res.data)
}

const post = (person) => {
    return axios.post(url, person)
    .then( res => res.data)
}

export default {
    getAll,
    post
}