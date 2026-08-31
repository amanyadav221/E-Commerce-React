import { DELETE_USER_BY_ADMIN_RED, GET_ALL_USER_RED, UPDATE_USER_STATUS_RED } from "../Constrants";

let initial = {
    user: [],
    updateSuccess: false,
    deleteSuccess: false
}
export default function GetAllUserReducer(state = initial, action) {
    switch (action.type) {
        case GET_ALL_USER_RED: {
            return {
                ...state,
                user: action.payload
            }
        }
        case UPDATE_USER_STATUS_RED: {
            return {
                ...state,
                updateSuccess: !state.updateSuccess
            }
        }
        case DELETE_USER_BY_ADMIN_RED: {
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