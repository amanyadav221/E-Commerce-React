import { CREATE_SETTING, GET_ALL_SETTING, UPDATE_SETTING} from "../Constrants";

export function createSetting(data){
    return {
        type : CREATE_SETTING,
        payload:data
    }
}
export function getAllSetting(){
    return {
        type : GET_ALL_SETTING
    }
}
export function updateSetting(data){
    return {
        type : UPDATE_SETTING,
        payload:data
    }
}
