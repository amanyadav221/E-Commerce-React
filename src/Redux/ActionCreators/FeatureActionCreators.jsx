import { CREATE_FEATURE, DELETE_FEATURE, GET_ALL_FEATURE, UPDATE_FEATURE } from "../Constrants";

export function createFeature(data){
    return {
        type : CREATE_FEATURE,
        payload:data
    }
}
export function getAllFeature(){
    return {
        type : GET_ALL_FEATURE
    }
}
export function getMainCategoryByName(data){
    return {
        type : GET_FEATURE_BY_NAME,
        payload:data
    }
}
export function updateFeature(id,data){
    return {
        type : UPDATE_FEATURE,
        id:id,
        payload:data
    }
}
export function deleteFeature(data){
    return {
        type : DELETE_FEATURE,
        payload:data
    }
}