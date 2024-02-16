import { lastViewedConstants } from "../_constants"

const initialState = { loading: null, lastViewed: {} }

export function lastViewed(state = initialState, action) {
    switch (action.type) {
        case lastViewedConstants.GET_LAST_VIEWED_REQUEST:
            return {
                loading: true
            }
        case lastViewedConstants.GET_LAST_VIEWED_SUCCESS:
            return {
                loading: false,
                lastViewed: action.response.data
            }
        case lastViewedConstants.GET_LAST_VIEWED_FAILURE:
            return {
                loading: true,
                error: action.error.message
            }
        default:
            return state
    }
}
