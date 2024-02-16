import { authHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const lastViewedPageService = {
    getLastVisited
}

function getLastVisited() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/last_visited/`, requestOptions)
        .then(utils.handleResponse)
        .then((response) => {
            return response
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
