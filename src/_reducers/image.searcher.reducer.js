import { imageSearcherConstants } from "../_constants"

const initialState = {
    images: []
}

export function imageSearcher(state = initialState, action) {
    switch (action.type) {
        case imageSearcherConstants.GET_IMAGES_BY_TEXT_REQUEST:
            return {
                loading: true
            }
        case imageSearcherConstants.GET_IMAGES_BY_TEXT_SUCCESS:
            return {
                loading: false,
                images: action.data.hits,
                totalHits: action.data.totalHits
            }
        case imageSearcherConstants.GET_IMAGES_BY_TEXT_FAILURE:
            return {
                loading: false,
                error: action.error
            }
        case imageSearcherConstants.CLEAR_STATE:
            return {
                images: []
            }

        default:
            return state
    }
}
