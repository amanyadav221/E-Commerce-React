import axios from "axios";
const api = 'http://localhost:8080/admin/feature'

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
