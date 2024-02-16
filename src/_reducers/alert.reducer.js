import { alertConstants } from "../_constants"

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: "alert-success",
                code: action.error.code,
                message: action.error.message
            }
        case alertConstants.ERROR:
            return {
                type: "alert-danger",
                code: action.error.code,
                message: action.error.message
            }
        case alertConstants.CLEAR:
            return {}
        default:
            return state
    }
}
