import { translateConstants } from "../_constants"

const initialState = {
    translatedText: ""
}

export function translate(state = initialState, action) {
    switch (action.type) {
        case translateConstants.GET_TRANSLATED_TEXT_REQUEST:
            return {
                loading: true
            }
        case translateConstants.GET_TRANSLATED_TEXT_SUCCESS:
            return {
                loading: false,
                translatedText: action.data[0][0][0]
            }
        case translateConstants.GET_TRANSLATED_TEXT_FAILURE:
            return {
                loading: false,
                error: action.error
            }
        case translateConstants.CLEAR_TRANSLATED_TEXT:
            return {
                translatedText: ""
            }

        default:
            return state
    }
}
