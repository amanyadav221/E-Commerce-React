import { CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, GET_ALL_SUBCATEGORY, GET_SUBCATEGORY_BY_NAME, UPDATE_SUBCATEGORY } from "../Constrants";

export function createSubCategory(data){
    return {
        type : CREATE_SUBCATEGORY,
        payload:data
    }
}
export function getAllSubCategory(){
    return {
        type : GET_ALL_SUBCATEGORY
    }
}
export function getSubCategoryByName(data){
    return {
        type : GET_SUBCATEGORY_BY_NAME,
        payload:data
    }
}
export function updateSubCategory(id,data){
    return {
        type : UPDATE_SUBCATEGORY,
        id:id,
        payload:data
    }
}
export function deleteSubCategory(data){
    return {
        type : DELETE_SUBCATEGORY,
        payload:data
    }
}