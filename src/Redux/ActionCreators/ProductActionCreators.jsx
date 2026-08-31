import { CREATE_PRODUCT, DELETE_IMAGE, DELETE_PRODUCT, GET_ALL_PRODUCT,  GET_PRODUCT_BY_ID,  GET_PRODUCT_BY_NAME,  UPDATE_PRODUCT } from "../Constrants";

export function createProduct(data){
    return {
        type : CREATE_PRODUCT,
        payload:data
    }
}
export function getAllProduct(){
    console.log("hello")
    return {
        type : GET_ALL_PRODUCT
        
    }
}
export function getProductById(data){
    return {
        type:GET_PRODUCT_BY_ID,
        payload:data
    }
}
export function getProductByName(data){
    return {
        type : GET_PRODUCT_BY_NAME,
        payload:data
    }
}
export function updateProduct(id,data){
    return {
        type : UPDATE_PRODUCT,
        id:id,
        payload:data
    }
}

export const deleteImage = (imageId, productId) => ({
    type: DELETE_IMAGE,
    payload: { imageId, productId }
})

export function deleteProduct(data){
    console.log(data)
    return {
        type : DELETE_PRODUCT,
        payload:data
    }
}