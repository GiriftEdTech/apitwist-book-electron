import { configConstants } from "../_constants/config.constants"
import { store } from "../_helpers"

export const configActions = {
    toggleEditMode
}

function toggleEditMode(payload) {
    return (dispatch) => {
        dispatch({
            type: configConstants.SET_EDIT_MODE,
            payload: payload ?? !store.getState().config.isEditModeOpen
        })
    }
}
