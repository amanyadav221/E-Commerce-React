import React, { act } from 'react'
import { CREATE_PRODUCT_RED, DELETE_IMAGE_RED, DELETE_PRODUCT_RED, GET_ALL_PRODUCT_RED, GET_PRODUCT_BY_ID_RED, GET_PRODUCT_BY_NAME_RED, UPDATE_PRODUCT_RED } from '../Constrants';

export default function ProductReducers(state = [], action) {
    switch (action.type) {
        case CREATE_PRODUCT_RED:
            return [...state, action.payload]
        case GET_ALL_PRODUCT_RED: {
            if (action.payload) {
                if (Array.isArray(action.payload)) {
                    return action.payload;
                } else if (Array.isArray(action.payload.data)) {
                    return action.payload.data;
                } else {
                    return [] // fallback
                }
            } else {
                return []
            }
        }
        case GET_PRODUCT_BY_NAME_RED:
            return action.payload
        case GET_PRODUCT_BY_ID_RED: {
            return action.payload
        }
        case UPDATE_PRODUCT_RED: {
            const item = action.payload; //  MUST be object

            if (!item || !item.id) return state

            return state.map(prod =>
                prod.id === item.id ? { ...prod, ...item } : prod
            )
        }
        case DELETE_PRODUCT_RED:
            return state.filter(x => x.name !== action.payload)

        case DELETE_IMAGE_RED:
            let h = state.map(p =>
                p.id === action.payload.id ? action.payload : p
            )
            return state.map(p =>
                p.id === action.payload.id ? action.payload : p
            )
        default:
            return state
    }
}
