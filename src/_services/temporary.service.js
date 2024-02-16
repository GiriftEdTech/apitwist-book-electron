import { clientHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    loginUrl: process.env.REACT_APP_LOGIN_URL
}

export const temporaryService = {
    temporaryGetById,
    temporaryGetContents
}

function temporaryGetById(id) {
    let bookUUid = ""
    bookUUid = getBookUUID(id)
    const requestOptions = {
        method: "GET",
        headers: clientHeader()
    }

    return fetch(`${config.loginUrl}/books/${bookUUid}`, requestOptions)
        .then(utils.handleResponse)
        .then((book) => {
            book.color = `var(--c-box-bg-${book.id % 10})`
            return book
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function temporaryGetContents(id, page_order) {
    let bookUUid = ""
    bookUUid = getBookUUID(id)
    const requestOptions = {
        method: "GET",
        headers: clientHeader()
    }

    return fetch(`${config.loginUrl}/books/${bookUUid}/pages/${page_order}`, requestOptions)
        .then(utils.handleResponse)
        .then((contents) => {
            return contents
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function getBookUUID(id) {
    switch (parseInt(id)) {
        case 22:
            return "f7006228-541e-4d2a-9047-c3f118a7ee53"
        case 24:
            return "acb05937-9f67-40fa-93e4-b7d7d9403bde"
    }
}
