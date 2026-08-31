import axios from "axios";
const api='http://localhost:8080/admin/faq'

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
