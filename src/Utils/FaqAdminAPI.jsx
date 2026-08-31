import axios from "axios";
const api = import.meta.env.VITE_APP_BACKEND_SERVER_FAQ_ADMIN || 'https://e-commerce-java-springboot.onrender.com/admin/faq'

const FaqAdminAPI = axios.create({
  baseURL: api
})

FaqAdminAPI.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default FaqAdminAPI
