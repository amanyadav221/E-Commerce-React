import axios from "axios";
const api = import.meta.env.VITE_APP_BACKEND_SERVER_SUB_CAT_ADMIN || 'https://e-commerce-java-springboot.onrender.com/admin/sub-cat'

const subCatAdminAPI = axios.create({
  baseURL: api
})

subCatAdminAPI.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"))
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default subCatAdminAPI
