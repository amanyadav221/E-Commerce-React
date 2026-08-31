import axios from "axios"
import BrandAdminAPI from "../../../Utils/BrandAdminAPI";
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_BRAND_PUBLIC || 'https://e-commerce-java-springboot.onrender.com/public/brand'
export async function createRecord(collection, payload) {
    try {
        let res = await BrandAdminAPI.post(`${collection}`, payload,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}
export async function getAllRecord(collection) {
    try {
        let res = await axios.get(`${PublicApi}${collection}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
        return []
    }

}
export async function getByName(collection, payload) {
    try {
        let res = await axios.get(`${PublicApi}${collection}/${payload}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
        return []

    }
}
//  /update
export async function updateRecord(collection, payload) {
    try {
        let res = await BrandAdminAPI.put(`${collection}`, payload)
        return res
    } catch (error) {
        console.log(error)
        return []
    }
}
export async function deletedByName(collection, payload) {
    try {
        let res = await BrandAdminAPI.delete(`${collection}/${payload.id}`)
        console.log(res)
        return res
    } catch (error) {
        return []

    }

}