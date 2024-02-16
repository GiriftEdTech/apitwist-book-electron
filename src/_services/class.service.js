import { authHeader, utils } from "../_helpers"

const config = {
    apiUrl: "https://studio.class.apitwist.com/api"
}

export const classService = {
    getAll
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/classrooms`, requestOptions)
        .then(utils.handleResponse)
        .then((classes) => {
            return classes.data
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}
