import { CREATE_MAINCATEGORY, DELETE_MAINCATEGORY, GET_ALL_MAINCATEGORY, GET_MAINCATEGORY_BY_NAME, UPDATE_MAINCATEGORY } from "../Constrants";

export function createMainCategory(data){
    return {
        type : CREATE_MAINCATEGORY,
        payload:data
    }
}
export function getAllMainCategory(){
    return {
        type : GET_ALL_MAINCATEGORY
    }
}
export function getMainCategoryByName(data){
    return {
        type : GET_MAINCATEGORY_BY_NAME,
        payload:data
    }
}
export function updateMainCategory(id,data){
    return {
        type : UPDATE_MAINCATEGORY,
        id:id,
        payload:data
    }
}
export function deleteMainCategory(data){
    return {
        type : DELETE_MAINCATEGORY,
        payload:data
    }
}