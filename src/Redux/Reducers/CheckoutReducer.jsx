import { CREATE_CHECKOUT_RED, GET_ALL_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constrants";
const initial = {
    message: "",
    orders: [],
    updateSuccess: false

}
export default function CheckoutReducer(state = initial, action) {

    switch (action.type) {
        case CREATE_CHECKOUT_RED: {
            return {
                ...state,
                message: action.payload
            }
        }
        case GET_ALL_CHECKOUT_RED: {
            return {
                ...state,
                orders: action.payload.orders
            }
        }
        case UPDATE_CHECKOUT_RED: {
            return {
                ...state,
                updateSuccess: !state.updateSuccess
            }
        }
        default: {
            return {
                ...state
            }
        }
    }

}