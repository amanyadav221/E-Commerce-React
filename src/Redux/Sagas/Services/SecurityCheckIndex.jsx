import axios from "axios";
import api from "../../../Utils/ApiInstance";
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_SECURITY_PUBLIC
import adminAPI from "../../../Utils/AdminAPI";

export async function registerUser(collection, payload) {
    try {
        let res = await axios.post(`${PublicApi}${collection}`, payload)
        res = await res.data
        return res

    } catch (error) {
        console.log(error)
    }
}
export async function loginUser(collection, payload) {
    try {
        let res = await axios.post(`${PublicApi}${collection}`, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function getUserIndex(collection, payload) {
    try {
        let res = await api.get(`${collection}/${payload}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }
}
export async function updateUserIndex(collection, payload) {
    try {
        let res = await api.patch(`${collection}`, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function addNewAddressIndex(collection, payload) {
    try {
        let res = await api.post(`${collection}`, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function getAllAddressIndex(collection) {
    try {
        let res = await api.get(`${collection}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function adminGetAllAddress(collection) {
    try {
        let res = await adminAPI.get(`${collection}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function deleteAddressIndex(collection, payload) {
    try {
        let res = await api.delete(`${collection}/${payload}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function updateAddressIndex(collection, payload, id) {
    try {
        let res = await api.patch(`${collection}/${id}`, payload)
        res = await res.data
        return res
    } catch (error) {

    }

}
export async function getAllUserForAdminIndex(collection) {
    try {
        let res = await adminAPI.get(collection)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)

    }

}
export async function updateUserStatusIndex(collection, payload, id) {
    try {
        let res = await adminAPI.patch(`${collection}/${id}`, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function deleteUserByAdminIndex(collection, payload) {
    try {
        let res = await adminAPI.delete(`${collection}/${payload}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}