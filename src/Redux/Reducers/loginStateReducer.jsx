import { LOGIN_USER_RED, LOGOUT } from "../Constrants";
const session = JSON.parse(localStorage.getItem("session"));
const initialState = {
    jwt: session?.jwt || null,
    role: session?.role || null,
    fullName: session?.fullName || null,
    username: session?.username || null
}

export default function loginStateReducer(state = initialState, action) {

    switch (action.type) {

        case LOGIN_USER_RED: {
            const sessionData = {
                jwt: action.payload.jwt,
                role: action.payload.role,
                fullName: action.payload.fullName,
                username: action.payload.username
            };

            localStorage.setItem("session", JSON.stringify(sessionData));
            return {
                ...state,
                fullName: action.payload.fullName ? action.payload.fullName : "",
                username: action.payload.username || "",
                usernameError: action.payload.usernameError || "",
                passwordError: action.payload.passwordError || "",
                message: action.payload.message || "",
                role: action.payload.role || "",
                jwt: action.payload.jwt || "",
                loading: false
            }
        }

        case LOGOUT:
            localStorage.removeItem("session");
            return {
                jwt: null,
                role: null,
                fullName: null,
                username: null
            };

        default:
            return state;
    }
}
