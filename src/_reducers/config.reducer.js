import { configConstants } from "../_constants/config.constants"

export function config(state = { isEditModeOpen: false }, action) {
    switch (action.type) {
        case configConstants.SET_EDIT_MODE:
            return {
                isEditModeOpen: action.payload
            }

        default:
            return state
    }
}
