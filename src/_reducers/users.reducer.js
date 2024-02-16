import { userConstants } from "../_constants"
const initialState = { loading: null, loggedIn: null, user: {} }
export function users(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                loading: true,
                loggedIn: false
            }
        case userConstants.LOGIN_REQUEST:
        case userConstants.GETUSER_REQUEST:
            return {
                ...state,
                loading: true,
                loggedIn: false
            }
        case userConstants.LOGIN_SUCCESS:
        case userConstants.GETUSER_SUCCESS:
            return {
                loading: false,
                loggedIn: true,
                user: action.user
            }

        case userConstants.RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                loggedIn: true,
                user: action.user,
                hasReset: action.hasReset
            }

        case userConstants.CLEAR_RESET_PASSWORD:
            const { hasReset, ...newState } = state
            return newState

        case userConstants.REGISTER_SUCCESS:
            return {
                loading: false,
                loggedIn: true,
                user: action.user,
                hasRegister: action.hasRegister
            }

        case userConstants.CLEAR_REGISTER:
            const { hasRegister, ...registeredState } = state
            return registeredState

        case userConstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstants.UPDATE_SUCCESS:
            return {
                loading: false,
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGIN_FAILURE:
            return {
                loading: false,
                loggedIn: false,
                error: action.error
            }
        case userConstants.LOGOUT:
            return {
                loading: false,
                loggedIn: false
            }
        default:
            return state
    }
}
