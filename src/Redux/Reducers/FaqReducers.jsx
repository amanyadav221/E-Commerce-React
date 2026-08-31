import React, { act } from 'react'
import { CREATE_FAQ_RED, DELETE_FAQ_RED, GET_ALL_FAQ_RED, GET_FAQ_BY_NAME_RED, UPDATE_FAQ_RED } from '../Constrants';

export default function FaqReducers(state = [], action) {
    switch (action.type) {
        case CREATE_FAQ_RED:
            return [...state, action.payload]
        case GET_ALL_FAQ_RED: {
            return action.payload
        }
        case GET_FAQ_BY_NAME_RED:
            return action.payload
        case UPDATE_FAQ_RED: {
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
        case DELETE_FAQ_RED:
            return state.filter(x => x.question !== action.payload)
        default:
            return state
    }
}
