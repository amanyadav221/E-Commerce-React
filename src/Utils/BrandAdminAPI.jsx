import axios from "axios";
const api = import.meta.env.VITE_APP_BACKEND_SERVER_BRAND_ADMIN || 'https://e-commerce-java-springboot.onrender.com/admin/brand'

const BrandAdminAPI = axios.create({
  baseURL: api
})

BrandAdminAPI.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default BrandAdminAPI
