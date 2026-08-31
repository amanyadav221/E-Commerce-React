import React, { act } from 'react'
import { CREATE_BRAND_RED, DELETE_BRAND_RED, GET_ALL_BRAND_RED, GET_BRAND_BY_NAME_RED, UPDATE_BRAND_RED } from '../Constrants';

export default function BrandReducers(state = [], action) {
    switch (action.type) {
        case CREATE_BRAND_RED:
            return [...state, action.payload]
        case GET_ALL_BRAND_RED: {
            return action.payload
        }
        case GET_BRAND_BY_NAME_RED:
            return action.payload
        case UPDATE_BRAND_RED: {
            const item = Array.isArray(action.payload)
                ? action.payload[0]
                : action.payload

            const index = state.findIndex(x => x.name === item.name)

            //  UPDATE
            if (index !== -1) {
                return state.map((cat, i) =>
                    i === index ? { ...cat, ...item } : cat
                )
            }
            //  INSERT
            return [...state, item]
        }
        case DELETE_BRAND_RED:
            return state.filter(x => x.name !== action.payload)
        default:
            return state
    }
}
