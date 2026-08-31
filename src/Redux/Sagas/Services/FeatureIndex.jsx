import axios from "axios"
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_FEATURE_PUBLIC
import FeatureAdminAPI from "../../../Utils/FeatureAdminAPI";
export async function createRecord(collection, payload) {
    try {
        let res = await FeatureAdminAPI.post(`${collection}`, payload)
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
        let res = await FeatureAdminAPI.patch(`${collection}`, payload)
        return res
    } catch (error) {
        console.log(error)
        return []
    }

}
export async function deletedByName(collection, payload) {
    try {
        let res = await FeatureAdminAPI.delete(`${collection}/${payload.id}`)
        return res
    } catch (error) {
        console.log(error)
        return []

    }

}