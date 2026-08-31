import { CREATE_FAQ, DELETE_FAQ, GET_ALL_FAQ, GET_FAQ_BY_NAME, UPDATE_FAQ } from "../Constrants";

export function createFaq(data){
    return {
        type : CREATE_FAQ,
        payload:data
    }
}
export function getAllFaq(){
    return {
        type : GET_ALL_FAQ
    }
}
export function getMainCategoryByName(data){
    return {
        type : GET_FAQ_BY_NAME,
        payload:data
    }
}
export function updateFaq(id,data){
    return {
        type : UPDATE_FAQ,
        id:id,
        payload:data
    }
}
export function deleteFaq(data){
    return {
        type : DELETE_FAQ,
        payload:data
    }
}