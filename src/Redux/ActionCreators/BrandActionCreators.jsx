import { CREATE_BRAND, DELETE_BRAND, GET_ALL_BRAND, GET_BRAND_BY_NAME, UPDATE_BRAND } from "../Constrants";

export function createBrand(data){
    return {
        type : CREATE_BRAND,
        payload:data
    }
}
export function getAllBrand(){
    return {
        type : GET_ALL_BRAND
    }
}
export function getBrandByName(data){
    return {
        type : GET_BRAND_BY_NAME,
        payload:data
    }
}
export function updateBrand(id,data){
    return {
        type : UPDATE_BRAND,
        id:id,
        payload:data
    }
}
export function deleteBrand(data){
    return {
        type : DELETE_BRAND,
        payload:data
    }
}