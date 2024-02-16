import { classConstants } from "../_constants"
import { classService } from "../_services"

export const classActions = {
    getAll
}

function getAll() {
    return (dispatch) => {
        dispatch(request())

        classService.getAll().then(
            (classes) => dispatch(success(classes)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: classConstants.GET_CLASSES_REQUEST }
    }

    function success(classes) {
        return { type: classConstants.GET_CLASSES_SUCCESS, classes }
    }

    function failure(error) {
        return { type: classConstants.GET_CLASSES_FAILURE, error }
    }
}
