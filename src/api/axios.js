import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://stream-family-backend.vercel.app/api',
    withCredentials: true
})

export default instance