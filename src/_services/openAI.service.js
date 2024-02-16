import { utils } from "../_helpers"
import { openAiAuthHeader } from "../_helpers/openAi-auth-header"
import { openAiFileHeader } from "../_helpers/openAi-file-header"

export const openAiService = {
    askChatGpt,
    getSpeechToText
}

function askChatGpt(data, model) {
    const requestOptions = {
        method: "POST",
        headers: openAiAuthHeader(),
        body: JSON.stringify({
            model: model,
            messages: data,
            temperature: 0.7
        })
    }
    return fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(utils.handleResponse)
        .then((data) => {
            return data
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}

function getSpeechToText(audiofile) {
    var formdata = new FormData()
    formdata.append("model", "whisper-1")
    formdata.append("file", audiofile)

    const requestOptions = {
        method: "POST",
        headers: openAiFileHeader(),
        body: formdata
    }

    return fetch("https://api.openai.com/v1/audio/transcriptions", requestOptions)
        .then(utils.handleResponse)
        .then((data) => {
            return data
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
