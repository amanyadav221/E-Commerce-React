import { ADD_CART_ITEM_RED, DELETE_CART_ITEM_RED, DELETE_WISHLIST_RED, GET_MY_CART_RED, UPDATE_CART_ITEM_RED } from "../Constrants";
const initialState = {
    items: [],
    grandTotal: 0,
    addSuccess: false,
    deleteSuccess: false,
    update: false
}

export default function CartReducer(state = initialState, action) {

    switch (action.type) {
        case GET_MY_CART_RED: {
            const items = Array.isArray(action.payload) ? action.payload : [];
            const total = items.reduce(
                (sum, item) => sum + item.subTotal,
                0
            )
            return {
                ...state,
                items: action.payload,
                grandTotal: total

            }
        }
        case ADD_CART_ITEM_RED: {
            return {
                ...state,
                items: [...state.items, action.payload],
                addSuccess: true
            }

        }
        case DELETE_CART_ITEM_RED: {
            return {
                ...state,
                items: state.items.filter(id => Number(id) !== Number(action.payload)),
                deleteSuccess: !state.deleteSuccess
            }
        }
        case UPDATE_CART_ITEM_RED: {
            return {
                ...state,
                update: !state.update
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}