import { alertActions } from "./index"
import { userConstants } from "../_constants"
import { userService } from "../_services"
import { bookActions } from "./book.actions"

export const userActions = {
    login,
    profile,
    logout,
    register,
    forgotPassword,
    resetPassword,
    update
}

function login(email, password) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request({ email }))

        userService
            .login(email, password)
            .then(
                (user) => {
                    dispatch(success(user))
                },
                (error) => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error))
                }
            )
            .catch((error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            })
    }

    function request(user) {
        return { type: userConstants.LOGIN_REQUEST, user }
    }

    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }

    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error }
    }
}

function profile() {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())
        userService.getProfile().then(
            (user) => {
                dispatch(success(user))
            },
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request() {
        return { type: userConstants.GETUSER_REQUEST }
    }

    function success(user) {
        return { type: userConstants.GETUSER_SUCCESS, user }
    }

    function failure(error) {
        return { type: userConstants.GETUSER_FAILURE, error }
    }
}

function logout() {
    alertActions.clear()
    userService.logout()

    return (dispatch) => {
        dispatch(bookActions.clearBooks())
        dispatch(logoutSuccess())
    }

    function logoutSuccess() {
        return { type: userConstants.LOGOUT }
    }
}

function register(
    name,
    surname,
    username,
    email,
    phone,
    password,
    country_id,
    book_code,
    institution_id,
    invitation_token
) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request(email))

        userService
            .register(
                name,
                surname,
                username,
                email,
                phone,
                password,
                country_id,
                book_code,
                institution_id,
                invitation_token
            )
            .then(
                (user) => {
                    dispatch(success(user))
                    dispatch(clearRegister())
                },
                (error) => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error))
                }
            )
    }

    function request(email) {
        return { type: userConstants.REGISTER_REQUEST, email }
    }

    function success(user) {
        return { type: userConstants.REGISTER_SUCCESS, user, hasRegister: true }
    }

    function failure(error) {
        return { type: userConstants.REGISTER_FAILURE, error }
    }
    function clearRegister() {
        return { type: userConstants.CLEAR_REGISTER }
    }
}

function forgotPassword(email) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request(email))

        userService.forgotPassword(email).then(
            (message) => {
                dispatch(success(message))
            },
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request(email) {
        return { type: userConstants.FORGOT_PASSWORD_REQUEST, email }
    }

    function success(message) {
        return { type: userConstants.FORGOT_PASSWORD_SUCCESS, message }
    }

    function failure(error) {
        return { type: userConstants.FORGOT_PASSWORD_FAILURE, error }
    }
}

function resetPassword({ email, password, token }) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request({ email, password, token }))

        userService.resetPassword({ email, password, token }).then(
            (user) => {
                dispatch(success(user))
                dispatch(clearReset())
            },
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request(email) {
        return { type: userConstants.RESET_PASSWORD_REQUEST, email }
    }

    function success(user) {
        return { type: userConstants.RESET_PASSWORD_SUCCESS, user, hasReset: true }
    }

    function failure(error) {
        return { type: userConstants.RESET_PASSWORD_FAILURE, error }
    }

    function clearReset() {
        return { type: userConstants.CLEAR_RESET_PASSWORD }
    }
}

function update(
    name,
    surname,
    username,
    avatar,
    email,
    //country,
    phone,
    old_password,
    password,
    confirm_password
) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())
        userService
            .update(
                name,
                surname,
                username,
                avatar,
                email,
                //country,
                phone,
                old_password,
                password,
                confirm_password
            )
            .then(
                (user) => {
                    dispatch(success(user))
                    dispatch(alertActions.success({ message: "VAL_SUCCESS" }))
                },
                (error) => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error))
                }
            )
    }

    function request() {
        return { type: userConstants.UPDATE_REQUEST }
    }

    function success(user) {
        return { type: userConstants.UPDATE_SUCCESS, user }
    }

    function failure(error) {
        return { type: userConstants.UPDATE_FAILURE, error }
    }
}
