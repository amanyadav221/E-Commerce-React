import React from 'react'
import { CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONAIL_BY_PRODUCT_ID_RED, GET_TESTIMONIAL_BY_NAME_RED, UPDATE_TESTIMONIAL_RED } from '../Constrants';
let initial = {
    item: [],
    addSuccess: false,
    updateSuccess: false,
    deleteSuccess: false
}
export default function TestimonialReducer(state = initial, action) {
    switch (action.type) {
        case CREATE_TESTIMONIAL_RED: {
            return {
                ...state,
                addSuccess: !state.addSuccess
            }
        }
        case GET_TESTIMONIAL_BY_NAME_RED: {
            console.log(action.payload)
            return {
                ...state,
                item: action.payload
            }
        }
        case UPDATE_TESTIMONIAL_RED: {
            return {
                ...state,
                updateSuccess: !state.updateSuccess
            }
        }
        case DELETE_TESTIMONIAL_RED: {
            return {
                ...state,
                deleteSuccess: !state.deleteSuccess
            }
        }
        case GET_TESTIMONAIL_BY_PRODUCT_ID_RED: {
            console.log(action.payload)
            return {
                ...state,
                item: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
