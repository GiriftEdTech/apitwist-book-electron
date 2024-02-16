import { bookConstants, contentConstants } from "../_constants"
import { utils } from "../_helpers"

export function pageDetails(state = {}, action) {
    switch (action.type) {
        case bookConstants.GETCONTENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case bookConstants.GETCONTENTS_SUCCESS:
            let creators = action.contents.contents
                .filter((value, index, self) => index === self.findIndex((t) => t.creator === value.creator))
                .map((value) => value.creator)

            return {
                contents: action.contents.contents
                    .map((content) => ({
                        ...content,
                        pivot: {
                            ...content.pivot,
                            top: content.pivot.top ?? "0.00",
                            left: content.pivot.left ?? "0.00"
                        }
                    }))
                    .sort((a, b) => a.pivot.top - b.pivot.top),
                loading: false,
                contentFilter: creators.reduce(
                    (object, creator) => ({
                        ...object,
                        [creator]:
                            JSON.parse(utils.getStore("contentFilter")) !== null
                                ? JSON.parse(utils.getStore("contentFilter"))[creator] ?? true
                                : true
                    }),
                    {}
                )
            }
        case bookConstants.GETCONTENTS_FAILURE:
            return {
                error: action.error,
                loading: false
            }

        case contentConstants.HANDLE_CONTENT_FILTER:
            utils.setStore(
                "contentFilter",
                JSON.stringify({ ...state.contentFilter, [action.creator]: !state.contentFilter[action.creator] })
            )

            return {
                ...state,
                contentFilter: { ...state.contentFilter, [action.creator]: !state.contentFilter[action.creator] }
            }
        case contentConstants.STORE_CONTENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case contentConstants.STORE_CONTENT_SUCCESS:
            let data = {
                id: action.response.id,
                content_type_id: action.response.content_type_id,
                created_by: action.response.created_by,
                taxonomy_id: null,
                detail: action.detail,
                sharing: action.response.sharing,
                creator: "self",
                editable: true,
                pivot: {
                    contentable_id: action.page_id,
                    content_id: action.response.id,
                    contentable_type: "App\\Models\\BookPage",
                    left: action.response.content_type_id !== 10 ? action.left.toString() : null,
                    top: action.response.content_type_id !== 10 ? action.top.toString() : null
                },
                content_type: action.content,
                user: null,
                createdAsStatically: action.createdAsStatically,
                isCreatedNew: true,
                isAddingChatbotContent: action.createdBy === "chatbot"
            }

            return {
                ...state,
                loading: false,
                contents: [...state.contents, data].sort((a, b) => a.pivot.top - b.pivot.top),
                contentFilter: { ...state.contentFilter, [data.creator]: true }
            }
        case contentConstants.STORE_CONTENT_FAILURE:
            return {
                loading: false,
                error: action.error
            }
        case contentConstants.UPDATE_CONTENT_REQUEST:
            return {
                ...state,
                contents: state.contents
                    .map((content) =>
                        content.id === action.id
                            ? {
                                  ...content,
                                  loading: true,
                                  detail: action.detail,
                                  content_type: action.content.content_type,
                                  left: action.left,
                                  top: action.top,
                                  pivot: {
                                      ...content.pivot,
                                      left: action.content.content_type_id !== 10 ? action.left.toString() : null,
                                      top: action.content.content_type_id !== 10 ? action.top.toString() : null
                                  }
                              }
                            : content
                    )
                    .sort((a, b) => a.pivot.top - b.pivot.top)
            }
        case contentConstants.UPDATE_CONTENT_SUCCESS:
            return {
                ...state,
                contents: state.contents.map((content) =>
                    content.id === action.id ? { ...content, loading: false, detail: action.response.detail } : content
                )
            }
        case contentConstants.UPDATE_CONTENT_FAILURE:
            return {
                error: action.error
            }
        case contentConstants.DELETE_CONTENT_REQUEST:
            return {
                ...state
            }
        case contentConstants.DELETE_CONTENT_SUCCESS:
            return {
                ...state,
                contents: state.contents
                    .filter((content) => content.id !== action.id)
                    .sort((a, b) => a.pivot.top - b.pivot.top)
            }
        case contentConstants.DELETE_CONTENT_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}
