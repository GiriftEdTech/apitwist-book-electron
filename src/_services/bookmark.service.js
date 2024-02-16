import { authHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const bookmarkService = {
    getAll,
    storeOrDelete,
    bulkAddBookmarks
}
function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/bookmarks/`, requestOptions)
        .then(utils.handleResponse)
        .then((response) => {
            return response
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function storeOrDelete(book_id, book_page_id) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ book_page_id })
    }

    return fetch(`${config.apiUrl}/bookmarks/`, requestOptions)
        .then(utils.handleResponse)
        .then((res) => {
            return res
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function bulkAddBookmarks(bookmarks) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ bookmarks })
    }
    return fetch(`${config.apiUrl}/bookmarks/bulk`, requestOptions)
        .then(utils.handleResponse)
        .then((response) => {
            return response
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
