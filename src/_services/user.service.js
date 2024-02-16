import { authFileHeader, authHeader, clientHeader, utils } from "../_helpers"
import { getTranslatedText as t } from "../_locale"
import { toast } from "react-toastify"

const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    loginUrl: process.env.REACT_APP_LOGIN_URL
}

export const userService = {
    generateClientToken,
    getProfile,
    login,
    logout,
    getRegistrationForm,
    register,
    forgotPassword,
    resetPassword,
    update
}

async function generateClientToken() {
    try {
        ;["clientToken", "passwordToken", "clientToken_expires_at", "user"].forEach((key) => utils.deleteStore(key))

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                grant_type: "client_credentials",
                scope: "*"
            })
        }

        const response = await fetch(process.env.REACT_APP_CLIENT_TOKEN_URL, requestOptions)
        console.log(response)
        const data = await utils.handleResponse(response)

        utils.setStore("clientToken", data.access_token)
        utils.setStore("clientToken_expires_at", parseInt(data.expires_in) + Date.now())

        return data
    } catch (error) {
        console.error("Client Token Error:", error)
        toast.error(t("CLIENT_TOKEN_ERROR"))
        return Promise.reject(error)
    }
}

function getProfile() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/profile`, requestOptions)
        .then(utils.handleResponse)
        .then((user) => {
            return user
        })
        .catch(function (error) {
            utils.deleteStore("passwordToken")
            return Promise.reject(error)
        })
}

function login(username, password) {
    const requestOptions = {
        method: "POST",
        headers: clientHeader(),
        body: JSON.stringify({
            email: username,
            password: password
        })
    }

    return fetch(`${config.loginUrl}/login`, requestOptions)
        .then(utils.handleResponse)
        .then((data) => {
            data.accessToken && utils.setStore("passwordToken", data.accessToken)
            return data.user
        })
        .catch((error) => {
            if (error.message === "Unauthenticated. Please try again.") {
                generateClientToken()
            }

            return Promise.reject(error)
        })
}

function logout() {
    const requestOptions = {
        method: "POST",
        headers: authHeader()
    }

    // revoke password token on API
    fetch(`${config.apiUrl}/logout`, requestOptions)
        // .then(utils.handleResponse)
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            utils.deleteStore("user")
            utils.deleteStore("passwordToken")

            return true
        })
        .catch((e) => {
            utils.deleteStore("user")
            utils.deleteStore("passwordToken")
        })
}

function getRegistrationForm(token) {
    const requestOptions = {
        method: "GET",
        headers: clientHeader()
    }
    return fetch(`${config.loginUrl}/getRegistrationForm?invitation_token=` + token, requestOptions)
        .then(utils.handleResponse)
        .then((data) => {
            return data.data
        })
        .catch(function (error) {
            toast.error(t("VAL_INVITATION_FAIL"))
            return Promise.reject(error)
        })
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
    let data = {
        name,
        surname,
        username,
        email,
        phone,
        password,
        country_id,
        institution_id
    }
    if (book_code) {
        data.book_code = book_code
    }
    if (invitation_token) {
        data.invitation_token = invitation_token
    }

    const requestOptions = {
        method: "POST",
        headers: clientHeader(),
        body: JSON.stringify(data)
    }

    return fetch(`${config.loginUrl}/register`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
            if (response.user && response.accessToken) {
                utils.setStore("passwordToken", response.accessToken)
                return response.user
            } else {
                let error = {
                    code: response.status,
                    message: response.message
                }
                return Promise.reject(error)
            }
        })
        .catch((error) => {
            let newError = {
                code: error.status,
                message: error.message
            }
            return Promise.reject(newError)
        })
}

function forgotPassword(email) {
    const requestOptions = {
        method: "POST",
        headers: clientHeader(),
        body: JSON.stringify({ email })
    }

    return fetch(`${config.loginUrl}/forgot`, requestOptions)
        .then((response) => response.json())
        .then((res) => toast.success(t("checkMailBox")))
        .catch((e) => {
            toast.error("Server error!")
            return Promise.reject(e)
        })
}

function resetPassword({ email, password, token }) {
    const requestOptions = {
        method: "POST",
        headers: clientHeader(),
        body: JSON.stringify({
            email,
            password,
            token,
            password_confirmation: password
        })
    }

    return fetch(`${config.loginUrl}/password/reset/${token}`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
            if (response.user && response.accessToken) {
                utils.setStore("passwordToken", response.accessToken)
                return response.user
            } else {
                let error = {
                    code: response.status,
                    message: response.message
                }
                return Promise.reject(error)
            }
        })
        .catch(function (error) {
            toast.error(error.message)
            return Promise.reject(error)
        })
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
    password_confirmation
) {
    var formdata = new FormData()
    formdata.append("name", name)
    formdata.append("surname", surname)
    formdata.append("username", username)
    formdata.append("email", email)
    formdata.append("phone", phone)
    //formdata.append("country", country);
    if (avatar) {
        formdata.append("avatar", avatar)
    }
    if (old_password && old_password != "") {
        formdata.append("old_password", old_password)
        formdata.append("password", password)
        formdata.append("password_confirmation", password_confirmation)
    }

    const requestOptions = {
        method: "POST",
        headers: authFileHeader(),
        body: formdata
    }

    return fetch(`${config.apiUrl}/users/update`, requestOptions)
        .then(utils.handleResponse)
        .then((response) => {
            if (response.data) {
                return response.data[0]
            } else {
                return Promise.reject(error)
            }
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}
