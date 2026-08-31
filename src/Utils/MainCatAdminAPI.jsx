import axios from "axios";
const api = import.meta.env.VITE_APP_BACKEND_SERVER_MAIN_CAT_ADMIN || 'https://e-commerce-java-springboot.onrender.com/admin/main-cat'

const MainCatAdminAPI = axios.create({
  baseURL: api
})

MainCatAdminAPI.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"))
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default MainCatAdminAPI
