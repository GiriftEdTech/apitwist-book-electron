import { bookConstants, userConstants } from "../_constants"
import { temporaryService } from "../_services"
import { alertActions } from "./alert.actions"
import { utils } from "../_helpers"

export const temporaryActions = {
    temporaryLogin,
    temporaryGetById,
    temporaryGetContents
}

function temporaryLogin() {
    let user = {
        id: 3,
        name: "Ankuzef",
        surname: "Student",
        email: "student@ankuzef.com",
        roles: [
            {
                name: "student"
            }
        ]
    }
    return (dispatch) => {
        dispatch(success(user))
    }

    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
}

function temporaryGetById(id) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())

        temporaryService.temporaryGetById(id).then(
            (book) => dispatch(success(book)),
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request() {
        return { type: bookConstants.GETBYID_REQUEST }
    }

    function success(book) {
        return { type: bookConstants.GETBYID_SUCCESS, book }
    }

    function failure(error) {
        return { type: bookConstants.GETBYID_FAILURE, error }
    }
}

function temporaryGetContents(book_id, page_order) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())

        temporaryService.temporaryGetContents(book_id, page_order).then(
            (contents) => dispatch(success(contents)),
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request() {
        return { type: bookConstants.GETCONTENTS_REQUEST }
    }

    function success(contents) {
        return { type: bookConstants.GETCONTENTS_SUCCESS, contents }
    }

    function failure(error) {
        return { type: bookConstants.GETCONTENTS_FAILURE, error }
    }
}
