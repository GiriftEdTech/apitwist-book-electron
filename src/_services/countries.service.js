import { clientHeader, utils } from "../_helpers"

const config = {
    guestUrl: process.env.REACT_APP_LOGIN_URL
}

export const countriesService = {
    getAll
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: clientHeader()
    }
    return fetch(`${config.guestUrl}/countries/`, requestOptions)
        .then(utils.handleResponse)
        .then((institutions) => {
            return institutions
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
