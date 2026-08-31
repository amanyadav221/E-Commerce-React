import axios from "axios";
const UserAPI = import.meta.env.VITE_APP_BACKEND_SERVER_SECURITY_USER
const api = axios.create({
  baseURL: UserAPI
})

api.interceptors.request.use(config => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`
  }
  return config
})

export default api
