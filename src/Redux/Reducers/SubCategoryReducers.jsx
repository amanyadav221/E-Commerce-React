import React, { act } from 'react'
import { CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_ALL_SUBCATEGORY_RED, GET_SUBCATEGORY_BY_NAME_RED, UPDATE_SUBCATEGORY_RED } from '../Constrants';

export default function SubCategoryeducers(state = [], action) {
    switch (action.type) {
        case CREATE_SUBCATEGORY_RED:
            return [...state, action.payload]
        case GET_ALL_SUBCATEGORY_RED: {
            return action.payload
        }
        case GET_SUBCATEGORY_BY_NAME_RED:
            return action.payload
        case UPDATE_SUBCATEGORY_RED: {
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
        case DELETE_SUBCATEGORY_RED:
            return state.filter(x => x.name !== action.payload)
        default:
            return state
    }
}
