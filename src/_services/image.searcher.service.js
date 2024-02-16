import { utils } from "../_helpers"

export const imageSearcherServices = {
    getByText
}

function getByText(data) {
    const requestOptions = {
        method: "GET"
    }

    //example: https://pixabay.com/api/?key=REACT_APP_PIXABAY_API_KEY&q=yellow+flowers&image_type=photo

    return fetch(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${data.q}&image_type=photo&lang=${data.lang}&per_page=50`,
        requestOptions
    )
        .then(utils.handleResponse)
        .then((data) => {
            return data
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
