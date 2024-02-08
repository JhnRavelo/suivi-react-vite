import axios from "axios"

const serverUrl = import.meta.env.VITE_SERVER_PATH


const defaultAxios = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

const privateAxios = axios.create({
    baseURL:serverUrl,
    withCredentials: true,
    headers:{"Content-Type": "multipart/form-data"}
  })

export {defaultAxios, privateAxios}