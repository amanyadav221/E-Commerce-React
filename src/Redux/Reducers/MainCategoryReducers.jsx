import React, { act } from 'react'
import { CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY_RED, GET_ALL_MAINCATEGORY_RED, GET_MAINCATEGORY_BY_NAME_RED, UPDATE_MAINCATEGORY_RED } from '../Constrants';

export default function MainCategoryReducers(state = [], action) {
    switch (action.type) {
        case CREATE_MAINCATEGORY_RED:
            return [...state, action.payload]
        case GET_ALL_MAINCATEGORY_RED: {
            return action.payload
        }
        case GET_MAINCATEGORY_BY_NAME_RED:
            return action.payload
        case UPDATE_MAINCATEGORY_RED: {
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
            // INSERT
            return [...state, item]
        }
        case DELETE_MAINCATEGORY_RED:
            return state.filter(x => x.name !== action.payload)
        default:
            return state
    }
}
