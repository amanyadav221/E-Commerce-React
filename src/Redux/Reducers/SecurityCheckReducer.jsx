import React from 'react'
import { LOGOUT, REGISTER_USER_RED, UPDATE_USER_RED, USER_INFO_RED } from '../Constrants';
const session = JSON.parse(localStorage.getItem("session"));
const initialState = {
    fullName: "",
    username: "",
    email: "",
    phone: "",
    message: "",
    loading: false,
    usernameError: "",
    passwordError: "",
    role: session?.role || "",
    jwt: session?.jwt || ""
};
export default function SecurityCheckReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER_RED: {
            return {
                ...state,
                message: action.payload,   // backend message
                loading: false
            };

        }

        case LOGOUT: {
            console.log("in logout reducer")
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            localStorage.removeItem("session");
            return { ...initialState };
        }
        case USER_INFO_RED: {
            return {
                ...state,
                fullName: action.payload.fullName,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone
            }
        }
        case UPDATE_USER_RED: {
            return {
                ...state,
                message: action.payload,
                fullName: action.payload.fullName,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone
            }
        }

        default:
            return state
    }
}