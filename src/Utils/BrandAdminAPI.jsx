import axios from "axios";
const api = 'http://localhost:8080/admin/brand'

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
