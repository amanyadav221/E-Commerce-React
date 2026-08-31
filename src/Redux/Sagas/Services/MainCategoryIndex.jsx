import axios from "axios"
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_MAIN_CAT_PUBLIC || 'https://e-commerce-java-springboot.onrender.com/public/main-cat'
import MainCatAdminAPI from "../../../Utils/MainCatAdminAPI"

export async function createRecord(collection, payload) {
    try {
        let res = await MainCatAdminAPI.post(`${collection}`, payload,
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
        let res = await MainCatAdminAPI.put(`${collection}`, payload)
        return res
    } catch (error) {
        console.log(error)
        return []
    }

}
export async function deletedByName(collection, payload) {
    try {
        let res = await MainCatAdminAPI.delete(`${collection}/${payload.id}`)
        return res
    } catch (error) {
        console.log(error)
        return []

    }

}