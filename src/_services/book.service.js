import { authHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const bookService = {
    getAll,
    getById,
    getContents,
    subscribe
    // update,
    // delete: _delete
}

function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/books`, requestOptions)
        .then(utils.handleResponse)
        .then((books) => {
            utils.arrayHasLength(books) &&
                books.sort(function (a, b) {
                    return a.name.localeCompare(b.name)
                })
            books.map((book) => (book.color = `book-color-${book.id % 10}`))
            return books
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/books/${id}`, requestOptions)
        .then(utils.handleResponse)
        .then((book) => {
            book.color = `var(--c-box-bg-${book.id % 10})`
            return book
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function getContents(book_id, page_order) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/books/${book_id}/pages/${page_order}`, requestOptions)
        .then(utils.handleResponse)
        .then((contents) => {
            return contents
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function subscribe(book_code) {
    const requestOptions = {
        method: "POST",
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/books/${book_code}/subscribe`, requestOptions)
        .then((response) => response.json())
        .catch(function (error) {
            toast.error(error.message)
            return Promise.reject(error)
        })
}

// function update(user) {
//   const requestOptions = {
//     method: 'PUT',
//     mode: "no-cors",
//     headers: {...authHeader(), 'Content-Type': 'application/json'},
//     body: JSON.stringify(user)
//   };
//
//   return fetch(`${config.apiUrl}/books/${user.id}`, requestOptions).then(handleResponse);
//   ;
// }
//
// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     mode: "no-cors",
//     headers: authHeader()
//   };
//
//   return fetch(`${config.apiUrl}/books/${id}`, requestOptions).then(handleResponse);
// }
