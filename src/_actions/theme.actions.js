import { themeConstants } from "../_constants"
import { store } from "../_helpers"

export const themeActions = {
    toggleTheme
}

function toggleTheme() {
    return (dispatch) => {
        dispatch({
            type: store.getState().theme.isDark ? themeConstants.SET_THEME_LIGHT : themeConstants.SET_THEME_DARK
        })
    }
}
