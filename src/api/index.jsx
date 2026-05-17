import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://frontend-api.gbeeglow.id'
})

export default Api
