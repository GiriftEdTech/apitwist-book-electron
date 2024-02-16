import { openAiConstants } from "../_constants"
import { openAiService } from "../_services/openAI.service"

export const openAiActions = {
    askChatGpt,
    clearMessages,
    getSpeechToText
}

function askChatGpt(messages, model, chatId) {
    return (dispatch) => {
        dispatch(request(messages))

        openAiService.askChatGpt(messages, model).then(
            (data) => dispatch(success(data, chatId)),
            (error) => dispatch(failure(error))
        )
    }

    function request(data) {
        return { type: openAiConstants.ASK_CHATGPT_REQUEST, data }
    }

    function success(message, chatId) {
        return {
            type: openAiConstants.ASK_CHATGPT_SUCCESS,
            message,
            chatId
        }
    }

    function failure(error) {
        return { type: openAiConstants.ASK_CHATGPT_FAILURE, error }
    }
}

function clearMessages() {
    return (dispatch) => {
        dispatch({ type: openAiConstants.CLEAR_MESSAGES })
    }
}

function getSpeechToText(audiofile) {
    return (dispatch) => {
        dispatch(request())

        openAiService.getSpeechToText(audiofile).then(
            (data) => dispatch(success(data)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: openAiConstants.GET_SPEECH_TO_TEXT_REQUEST }
    }

    function success(text) {
        return {
            type: openAiConstants.GET_SPEECH_TO_TEXT_SUCCESS,
            text
        }
    }

    function failure(error) {
        return { type: openAiConstants.GET_SPEECH_TO_TEXT_FAILURE, error }
    }
}
