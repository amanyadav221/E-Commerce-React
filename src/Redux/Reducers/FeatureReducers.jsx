import React, { act } from 'react'
import { CREATE_FEATURE_RED, DELETE_FEATURE_RED, GET_ALL_FEATURE_RED, GET_FEATURE_BY_NAME_RED, UPDATE_FEATURE_RED } from '../Constrants';

export default function FeatureReducers(state = [], action) {
    switch (action.type) {
        case CREATE_FEATURE_RED:
            return [...state, action.payload]
        case GET_ALL_FEATURE_RED: {
            return action.payload
        }
        case GET_FEATURE_BY_NAME_RED:
            return action.payload
        case UPDATE_FEATURE_RED: {
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
        case DELETE_FEATURE_RED:
            return state.filter(x => x.name !== action.payload)
        default:
            return state
    }
}
