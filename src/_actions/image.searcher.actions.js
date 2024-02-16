import { imageSearcherConstants } from "../_constants"
import { imageSearcherServices } from "../_services"

export const imageSearcherActions = {
    getByText,
    clearState
}

function getByText(data) {
    return (dispatch) => {
        dispatch(request())

        imageSearcherServices.getByText(data).then(
            (data) => dispatch(success(data)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return {
            type: imageSearcherConstants.GET_IMAGES_BY_TEXT_REQUEST
        }
    }

    function success(data) {
        return {
            type: imageSearcherConstants.GET_IMAGES_BY_TEXT_SUCCESS,
            data
        }
    }

    function failure(error) {
        return {
            type: imageSearcherConstants.GET_IMAGES_BY_TEXT_FAILURE,
            error
        }
    }
}

function clearState() {
    return (dispatch) => {
        dispatch({ type: imageSearcherConstants.CLEAR_STATE })
    }
}
