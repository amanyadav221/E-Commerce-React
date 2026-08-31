import { CREATE_NEWSLETTER_RED, DELETE_NEWSLETTER_RED, GET_ALL_NEWSLETTER_RED, UPDATE_NEWSLETTER_RED } from "../Constrants";

const initial = {
  newsletters: [],
  message: "",
  updateSuccess: false,
  deleteSuccess: false
}

export default function NewsletterReducer(state = initial, action) {
  switch (action.type) {
    case CREATE_NEWSLETTER_RED:
      return {
        ...state,
        message: action.payload
      }

    case GET_ALL_NEWSLETTER_RED:
      return {
        ...state,
        newsletters: action.payload   // API array directly
      }
    case UPDATE_NEWSLETTER_RED: {
      return {
        ...state,
        updateSuccess: !state.updateSuccess
      }
    }
    case DELETE_NEWSLETTER_RED: {
      return {
        ...state,
        deleteSuccess: !state.deleteSuccess
      }
    }
    default:
      return state
  }

}