import { CREATE_CONTACT_US_RED, DELETE_CONTACT_US_RED, GET_ALL_CONTACT_US_RED, UPDATE_CONTACT_US_RED } from "../Constrants"
let initial = {
    contactUs: [],
    updateSuccess: false,
    deleteSuccess: false
}
export default function ContactUsReducer(state = initial, action) {
    switch (action.type) {
        case CREATE_CONTACT_US_RED: {
            return {
                ...state
            }
        }
        case GET_ALL_CONTACT_US_RED: {
            return {
                ...state,
                contactUs: action.payload
            }
        }
        case UPDATE_CONTACT_US_RED: {
            return {
                ...state,
                updateSuccess: !state.updateSuccess
            }
        }
        case DELETE_CONTACT_US_RED: {
            return {
                ...state,
                deleteSuccess: !state.deleteSuccess
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}