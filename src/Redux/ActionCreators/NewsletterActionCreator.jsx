import { CREATE_CONTACT_US, CREATE_NEWSLETTER, DELETE_CONTACT_US, DELETE_NEWSLETTER, GET_ALL_CONTACT_US, GET_ALL_NEWSLETTER, UPDATE_CONTACT_US, UPDATE_NEWSLETTER } from "../Constrants";

export function createNewsLetter(data){
    return {
        type:CREATE_NEWSLETTER,
        payload:data
    }
}
export function getAllNewsLetter(){
    return{
        type:GET_ALL_NEWSLETTER
    }
}
export function updateNewsletter(data){
    console.log(data)
    return{
        type:UPDATE_NEWSLETTER,
        payload:data
    }
}
export function deleteNewsletter(data){
    return {
        type:DELETE_NEWSLETTER,
        payload:data
    }
}
export function createContactUs(data){
    console.log(data)
    return{
        type:CREATE_CONTACT_US,
        payload:data
    }
}
export function getAllContactUs(){
    return{
        type:GET_ALL_CONTACT_US
    }

}
export function updateContactUs(data){
    return {
        type:UPDATE_CONTACT_US,
        payload : data
    }
}
export function deleteContactUs(data){
    return {
        type : DELETE_CONTACT_US,
        payload:data
    }
}