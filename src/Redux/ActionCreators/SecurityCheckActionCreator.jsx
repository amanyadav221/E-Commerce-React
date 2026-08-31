import { ADD_ADDRESS, DELETE_ADDRESS, DELETE_USER_BY_ADMIN, GET_ADDRESS, GET_ALL_USER, LOGIN_USER, LOGOUT, REGISER_USER, UPDATE_ADDRESS, UPDATE_USER, UPDATE_USER_STATUS, USER_INFO } from "../Constrants";

export function registerUserNew(data) {
    return {
        type: REGISER_USER,
        payload: data
    }
}
export function LoginUser(data) {
    console.log("Login form user action creator called")
    return {
        type: LOGIN_USER,
        payload: data
    }
}
export function logout() {
    return {
        type: LOGOUT
    }
}
export function getUserByUsername(data) {
    console.log(data)
    return {
        type: USER_INFO,
        payload: data
    }
}
export function updateUser(data, username) {
    return {
        type: UPDATE_USER,
        payload: data,
        username: username
    }
}
export function addNewAddress(data) {
    console.log(data)
    return {
        type: ADD_ADDRESS,
        payload: data
    }
}
export function getAllAddress() {
    return {
        type: GET_ADDRESS
    }
}
export function adminGetAllAddress() {
    console.log("Getting adrs from action creator")
    return {
        type: "GET_ALL_ADRS_ADMIN"
    }
}
export function deleteAddress(id) {
    return {
        type: DELETE_ADDRESS,
        payload: id
    }
}
export function updateAddress(data, id) {
    return {
        type: UPDATE_ADDRESS,
        payload: data,
        addressId: id
    }
}
export function getAllUser() {
    return {
        type: GET_ALL_USER
    }
}
export function updateUserStatus(id,data){
    return{
        type:UPDATE_USER_STATUS,
        payload:data,
        userId:id
    }
}
export function deleteUserByAdmin(id){
    return{
        type:DELETE_USER_BY_ADMIN,
        payload:id
    }
}
