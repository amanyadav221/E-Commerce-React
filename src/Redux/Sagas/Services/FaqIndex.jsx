import axios from "axios"
const PublicApi=import.meta.env.VITE_APP_BACKEND_SERVER_FAQ_PUBLIC

import FaqAdminAPI from "../../../Utils/FaqAdminAPI";
export async function createRecord(collection, payload) {
    try {
        let res = await FaqAdminAPI.post(`${collection}`, payload)
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
        let res = await FaqAdminAPI.patch(`${collection}`, payload)
        return res
    } catch (error) {
        console.log(error)
        return []
    }

}
export async function deletedByName(collection, payload) {
    try {
        let res = await FaqAdminAPI.delete(`${collection}/${payload.id}`)
        return res
    } catch (error) {
        console.log(error)
        return []

    }

}