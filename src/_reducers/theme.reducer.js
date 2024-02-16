import { themeConstants } from "../_constants"
import { utils } from "../_helpers"

export function theme(state = { isDark: JSON.parse(localStorage.getItem("isDark")) }, action) {
    switch (action.type) {
        case themeConstants.SET_THEME_DARK:
            utils.setStore("isDark", true)
            document.body.classList.add("dark")
            return {
                isDark: true
            }
        case themeConstants.SET_THEME_LIGHT:
            utils.setStore("isDark", false)
            document.body.classList.remove("dark")
            return {
                isDark: false
            }
        default:
            return state
    }
}
