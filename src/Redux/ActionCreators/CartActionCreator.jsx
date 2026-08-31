import { ADD_CART_ITEM, ADD_WISHLIST, CREATE_CHECKOUT, CREATE_TESTIMONIAL, DELETE_CART_ITEM, DELETE_CART_ITEM_BY_PRODUCT_ID, DELETE_TESTIMONIAL, DELETE_WISHLIST, GET_ALL_CHECKOUT, GET_ALL_TESTIMONIAL_PUBLIC, GET_ALL_WISHLIST, GET_MY_CART, GET_TESTIMONAIL_BY_PRODUCT_ID, GET_TESTIMONIAL_BY_NAME, UPDATE_CART_ITEM, UPDATE_CHECKOUT, UPDATE_TESTIMONIAL } from "../Constrants";

export function getMyCart() {
    return {
        type: GET_MY_CART
    }
}

export function addToCartItem(data) {
    console.log("hello", data)
    return {
        type: ADD_CART_ITEM,
        payload: data
    }
}

export function addToWishlistItem(data) {
    return {
        type: ADD_WISHLIST,
        payload: data
    }
}

export function getAllWishlist() {
    return {
        type: GET_ALL_WISHLIST
    }
}
export function deleteWishlist(data) {
    return {
        type: DELETE_WISHLIST,
        payload: data
    }
}
export function deleteCartItem(id) {
    return {
        type: DELETE_CART_ITEM,
        payload: id
    }
}
export function deleteCartItemByProductId(id) {
    return {
        type: DELETE_CART_ITEM_BY_PRODUCT_ID,
        payload: id
    }
}
export function createCheckout(data) {
    console.log(data)
    return {
        type: CREATE_CHECKOUT,
        payload: data
    }
}
export function getAllCheckout() {
    return {
        type: GET_ALL_CHECKOUT
    }
}
export function adminGetAllCheckout() {
    console.log("Admin get address")
    return {
        type: GET_ALL_CHECKOUT + "ADMIN"
    }
}
export function updateCartItem(data, itemId) {
    return {
        type: UPDATE_CART_ITEM,
        payload: data,
        itemId: itemId
    }
}
export function updateCheckout(id, data) {
    return {
        type: UPDATE_CHECKOUT,
        payload: data,
        checkoutId: id
    }
}
export function createTestimonials(data) {
    console.log(data)
    return {
        type: CREATE_TESTIMONIAL,
        payload: data
    }
}
export function getMyTestimonial() {
    return {
        type: GET_TESTIMONIAL_BY_NAME
    }
}
export function updateMyTestimonial(data) {
    console.log(data)
    return {
        type: UPDATE_TESTIMONIAL,
        payload: data
    }
}
export function deleteMyTestimonials(data) {
    return {
        type: DELETE_TESTIMONIAL,
        payload: data
    }
}
export function getTestimonialByProductId(id){
    return {
        type: GET_TESTIMONAIL_BY_PRODUCT_ID,
        payload:id
    }
}
export function getAllTestimonialPublic() {
    const action = {
        type: GET_ALL_TESTIMONIAL_PUBLIC
    }
    return action;
}
