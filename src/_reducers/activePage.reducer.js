import { bookConstants } from "../_constants"

export function activePage(state = {}, action) {
    switch (action.type) {
        case bookConstants.SELECT_PAGE:
            return {
                page: action.page
            }
        case bookConstants.CLEAR_SELECTED_PAGE:
            return {}

        default:
            return state
    }
}
