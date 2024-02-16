import { alertConstants } from "../_constants"

export const alertActions = {
    success,
    error,
    clear
}

function success(error) {
    return { type: alertConstants.SUCCESS, error }
}

function error(error) {
    return { type: alertConstants.ERROR, error }
}

function clear() {
    return { type: alertConstants.CLEAR }
}
