import axios from "axios"

const serverUrl = import.meta.env.VITE_SERVER_PATH


const defaultAxios = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export {defaultAxios}