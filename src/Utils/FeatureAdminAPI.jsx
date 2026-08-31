import axios from "axios";
const api = import.meta.env.VITE_APP_BACKEND_SERVER_FEATURE_ADMIN || 'https://e-commerce-java-springboot.onrender.com/admin/feature'

const FeatureAdminAPI = axios.create({
  baseURL: api
})

FeatureAdminAPI.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default FeatureAdminAPI
