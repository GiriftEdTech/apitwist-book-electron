import { openAiConstants } from "../_constants"

const initialState = {
    messages: []
}

export function openAi(state = initialState, action) {
    switch (action.type) {
        case openAiConstants.ASK_CHATGPT_REQUEST:
            return {
                ...state,
                textLoading: true,
                messages: action.data
            }
        case openAiConstants.ASK_CHATGPT_SUCCESS:
            return {
                textLoading: false,
                chatId: action.chatId,
                messages: [
                    ...state.messages,
                    {
                        ...action.message.choices[0].message,
                        content: action.message.choices[0].message.content.replace(/^(\n)/, "")
                    }
                ]
            }
        case openAiConstants.ASK_CHATGPT_FAILURE:
            return {
                textLoading: false,
                error: action.error,
                messages: []
            }
        case openAiConstants.CLEAR_MESSAGES:
            return {
                messages: []
            }

        case openAiConstants.GET_SPEECH_TO_TEXT_REQUEST:
            return {
                ...state,
                speechLoading: true
            }
        case openAiConstants.GET_SPEECH_TO_TEXT_SUCCESS:
            return {
                ...state,
                speechLoading: false,
                text: action.text
            }
        case openAiConstants.GET_SPEECH_TO_TEXT_FAILURE:
            return {
                ...state,
                speechLoading: false,
                error: action.error
            }

        default:
            return state
    }
}
