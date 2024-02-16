import { translateConstants } from "../_constants"
import { translateServices } from "../_services/translate.service"

export const translateActions = {
    getTranslatedText,
    clearTranslatedText
}

function getTranslatedText(data) {
    return (dispatch) => {
        dispatch(request())

        translateServices.getTranslatedText(data).then(
            (data) => dispatch(success(data)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return {
            type: translateConstants.GET_TRANSLATED_TEXT_REQUEST
        }
    }

    function success(data) {
        return {
            type: translateConstants.GET_TRANSLATED_TEXT_SUCCESS,
            data
        }
    }

    function failure(error) {
        return {
            type: translateConstants.GET_TRANSLATED_TEXT_FAILURE,
            error
        }
    }
}

function clearTranslatedText() {
    return (dispatch) => {
        dispatch({ type: translateConstants.CLEAR_TRANSLATED_TEXT })
    }
}
