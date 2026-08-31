import React from 'react'
import { ADD_ADDRESS_RED, DELETE_ADDRESS_RED, GET_ADDRESS_RED, UPDATE_ADDRESS_RED } from '../Constrants';
const initial = {
    message: "",
    address: [{
        name: "",
        area: "",
        city: "",
        hno: "",
        landmark: "",
        phone: "",
        pinCode: "",
        state: "",
        user: "",
        username: ""
    }],
    addSuccess: false,
    deleteSuccess: false,
    updateSuccess: false

}
export default function AddressReducer(state = initial, action) {
    switch (action.type) {
        case ADD_ADDRESS_RED: {
            
            return {
                ...state,
                address: [...state?.address, action.payload],
                addSuccess: true
            }
        }
        case GET_ADDRESS_RED: {
            return {
                ...state,
                address: action.payload,
                addSuccess: false,
                deleteSuccess: false,
                updateSuccess: false
            }
        }
        case DELETE_ADDRESS_RED: {
            return {
                ...state,
                address: state?.address.filter(a => a.id !== action.payload),
                deleteSuccess: true
            }
        }
        case UPDATE_ADDRESS_RED: {
            return {
                ...state,
                address: state?.address.map(a =>
                    a.id === action.payload.id ? action.payload : a
                ),
                updateSuccess: true
            }
        }
        default: {
            return state
        }
    }

}