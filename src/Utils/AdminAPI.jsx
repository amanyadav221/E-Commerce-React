import axios from "axios";
const AdminApi = import.meta.env.VITE_APP_BACKEND_SERVER_ADMIN || 'https://e-commerce-java-springboot.onrender.com/admin'

const adminAPI = axios.create({
  baseURL: AdminApi
})

adminAPI.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default adminAPI
