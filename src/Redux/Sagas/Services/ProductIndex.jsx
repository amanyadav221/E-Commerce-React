import axios from "axios"
import productAdminAPI from "../../../Utils/productAdminAPI"
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_PRODUCT_PUBLIC || 'https://e-commerce-java-springboot.onrender.com/public/product'

export async function createRecord(collection, payload) {
    try {
        let res = await productAdminAPI.post(`${collection}`, payload,
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
export async function getById(collection, payload) {
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
        let res = await productAdminAPI.put(`${collection}`, payload)
        return res
    } catch (error) {
        console.log(error)
        return []
    }

}
export async function deletedByName(collection, payload) {
    try {
        let res = await productAdminAPI.delete(`${collection}/${payload.id}`)
        return res
    } catch (error) {
        console.log(error)
        return []

    }

}
export async function deleteProductImageApi(collection, payload) {
    try {
        await productAdminAPI.delete(
            `${collection}/${payload.imageId.imageId}`
        )
        let res = await axios.get(`${PublicApi}/getById/${payload.imageId.productId}`)
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
