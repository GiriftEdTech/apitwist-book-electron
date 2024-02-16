import { authFileHeader, authHeader, utils } from "../_helpers"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const contentService = {
    store,
    update,
    detach
}

function store(page_id, content_type_id, top, left, detail) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ content_type_id, top, left, detail })
    }

    return fetch(`${config.apiUrl}/book_pages/${page_id}/create_content`, requestOptions)
        .then(utils.handleResponse)
        .then((res) => {
            return res.content
        })
        .catch((error) => {
            return new Promise(error)
        })
}

function update(page_id, id, top, left, detail) {
    if (detail !== null && detail !== undefined && typeof detail === "object") {
        var formData = new FormData()
        formData.append("file", detail)
        formData.append("id", id)

        const requestOptions = {
            method: "POST",
            headers: authFileHeader(),
            body: formData
        }

        return fetch(`${config.apiUrl}/book_pages/${page_id}/update_content`, requestOptions)
            .then(utils.handleResponse)
            .then((res) => {
                return res.content
            })
            .catch((error) => {
                return new Promise(error)
            })
    } else {
        const requestOptions = {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ id, top, left, ...(detail !== null ? { detail: detail } : "") })
        }

        return fetch(`${config.apiUrl}/book_pages/${page_id}/update_content`, requestOptions)
            .then(utils.handleResponse)
            .then((res) => {
                return res.content
            })
            .catch((error) => {
                return new Promise(error)
            })
    }
}

function detach(page_id, content_id) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ content_id })
    }

    return fetch(`${config.apiUrl}/book_pages/${page_id}/detach_content`, requestOptions)
        .then(utils.handleResponse)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return new Promise(error)
        })
}
