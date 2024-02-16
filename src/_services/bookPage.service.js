import { authHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const bookPageService = {
    getAll
}

function getAll(bookId) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/books/${bookId}/getPages`, requestOptions)
        .then(utils.handleResponse)
        .then((pages) => {
            return pages
        })
}
