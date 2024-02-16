import { authHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const favoriteService = {
    storeOrDelete
}

function storeOrDelete(book_id) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ book_id })
    }

    return fetch(`${config.apiUrl}/favorite_books/`, requestOptions)
        .then(utils.handleResponse)
        .then((res) => {
            return res
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
