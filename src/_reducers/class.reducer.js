import { classConstants } from "../_constants/class.constants"

const initialState = {
    classes: []
}

export function classes(state = initialState, action) {
    switch (action.type) {
        case classConstants.GET_CLASSES_REQUEST:
            return { loading: true }
        case classConstants.GET_CLASSES_SUCCESS:
            return {
                loading: false,
                classes: action.classes
            }
        case classConstants.GET_CLASSES_FAILURE:
            return {
                error: action.error
            }

        default:
            return state
    }
}
