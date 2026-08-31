import { ADD_WISHLIST_RED, DELETE_WISHLIST_RED, GET_ALL_WISHLIST_RED } from "../Constrants";
const initialState = {
    ids: [],
    addSuccess: false,
    deleteSuccess: false,
    message: ""
}
export default function WishlistReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_WISHLIST_RED: {
            console.log(action.payload)
            return {
                ...state,
                addSuccess: true
            }
        }
        case GET_ALL_WISHLIST_RED: {
            console.log(action)
            console.log("Hello world")
            return {
                ...state,
                ids: action.payload
            }
        }
        case DELETE_WISHLIST_RED: {
            console.log(action)
            console.log(state)
            console.log(state.ids.filter(a => a !== action.payload))
            return {
                ...state,
                ids: state.ids.filter(id => Number(id) !== Number(action.payload)),

                deleteSuccess: true
            }
        }
        default: {
            return {
                ...state
            }
        }
    }


}