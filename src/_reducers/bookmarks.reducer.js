import { bookmarkConstants } from "../_constants"

const initialState = { bookmarked: {} }

export function bookmarks(state = initialState, action) {
    switch (action.type) {
        case bookmarkConstants.GET_BOOKMARK_REQUEST:
            return {
                loading: true
            }
        case bookmarkConstants.GET_BOOKMARK_SUCCESS:
            return {
                loading: false,
                bookmarked: action.response.data
            }
        case bookmarkConstants.GET_BOOKMARK_FAILURE:
            return {
                loading: true,
                error: action.error.message
            }

        case bookmarkConstants.STORE_OR_DELETE_BOOKMARK_REQUEST:
            return {
                loading: true
            }
        case bookmarkConstants.STORE_OR_DELETE_BOOKMARK_SUCCESS:
            return {
                loading: false,
                bookmarked: action.response.data
            }
        case bookmarkConstants.STORE_OR_DELETE_BOOKMARK_FAILURE:
            return {
                loading: false,
                error: action.error.message
            }
        default:
            return state
    }
}
