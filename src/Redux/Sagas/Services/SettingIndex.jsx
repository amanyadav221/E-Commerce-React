import axios from "axios"
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_SETTING_PUBLIC || 'https://e-commerce-java-springboot.onrender.com/public/setting'
import adminAPI from "../../../Utils/AdminAPI";
export async function createRecord(collection, payload) {
    try {
        let res = await adminAPI.post(`${collection}`, payload)
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

export async function updateRecord(collection, payload) {
    try {
        let res = await adminAPI.patch(`${collection}`, payload)
        return res
    } catch (error) {
        console.log(error)
        return []
    }

}