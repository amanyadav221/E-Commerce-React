import React from 'react'
import { GET_ALL_TESTIMONIAL_PUBLIC_RED } from '../Constrants'

let initial = {
    item: []
}
export default function PublicTestimonialReducer(state = initial, action) {
    switch (action.type) {
        case GET_ALL_TESTIMONIAL_PUBLIC_RED: {
            return {
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
