import { utils } from "../_helpers"

export const translateServices = {
    getTranslatedText
}

function getTranslatedText(data) {
    const requestOptions = {
        method: "GET"
    }

    //example: https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=testing
    return fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${data.sl}&tl=${data.tl}&dt=t&q=${data.q}`,
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
