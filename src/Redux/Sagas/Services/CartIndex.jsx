import axios from "axios";
import adminAPI from "../../../Utils/AdminAPI";
import api from "../../../Utils/ApiInstance";
const PublicApi = import.meta.env.VITE_APP_BACKEND_SERVER_SECURITY_PUBLIC
export async function getMyCartIndex(collection) {
    try {
        let res = await api.get(`${collection}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }
}
export async function addCartItemIndex(collection, payload) {
    try {
        let res = await api.post(`${collection}`, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function addWishlistIndex(collection, payload) {
    try {
        let res = await api.post(`${collection}`, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }
}
export async function getAllWishlistIndex(collection) {
    try {
        let res = await api.get(`${collection}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function deletewishlistIndex(collection, payload) {
    try {
        let res = await api.delete(`${collection}/${payload}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function deleteCartItemIndex(collection, payload) {
    try {
        let res = await api.delete(`${collection}/${payload}`)
        return res.data
    } catch (error) {
        console.log(error)
    }

}
export async function createCheckoutIndex(collection, payload) {

    try {
        let res = await api.post(`${collection}`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function deleteCartItemByProductIdIndex(collection, payload) {
    try {
        let res = await api.delete(`${collection}/${payload}`)
        return res.data
    } catch (error) {
        console.log(error)
    }

}
export async function getAllCheckoutIndex(collection) {
    try {
        let res = await api.get(collection)
        return res.data
    } catch (error) {
        console.log(error)
    }

}
export async function adminGetAllCheckoutIndex(collection) {
    try {
        let res = await adminAPI.get(collection)
        return res.data
    } catch (error) {
        console.log(error)
    }

}
export async function updateCartItemIndex(collection, payload, itemId) {
    try {
        let res = await api.patch(`${collection}/${itemId}`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function updateCheckoutIndex(collection, payload, id) {
    try {
        let res = await adminAPI.patch(`${collection}/${id}`, payload)
        return res.data
    } catch (error) {
        console.log(error)
    }

}
export async function createTestimonialsIndex(collection, payload) {
    try {
        let res = await api.post(collection, payload)
        res = await res.data
    } catch (error) {
        console.log(error)
    }

}
export async function getMyTestimonialIndex(collection) {
    try {
        let res = await api.get(collection)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function updateMyTestimonialIndex(collection, payload) {
    try {
        let res = await api.patch(collection, payload)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function deleteTestimonialIndex(collection, payload) {
    try {
        let res = await api.delete(`${collection}/${payload}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}
export async function getTestimonialByProductIdIndex(collection, payload) {
    try {
        let res = await axios.get(`${PublicApi}${collection}/${payload}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }
}
export async function gettingAllTestimonialPublicIndex(collection) {
    try {
        let res = await axios.get(`${PublicApi}${collection}`)
        res = await res.data
        return res
    } catch (error) {
        console.log(error)
    }

}