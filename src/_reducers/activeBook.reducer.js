import { bookConstants, contentConstants } from "../_constants"

export function activeBook(state = {}, action) {
    switch (action.type) {
        case bookConstants.GETBYID_REQUEST:
            return {
                loading: true,
                date: Date.now() + 120000
            }
        case bookConstants.GETBYID_SUCCESS:
            return {
                book: action.book
            }
        case bookConstants.GETBYID_FAILURE:
            return {
                error: action.error
            }
        case bookConstants.CLEAR_SELECTED_BOOK:
            return {}
        case contentConstants.STORE_CONTENT_SUCCESS:
            return {
                book:
                    action.response.content_type_id === 10
                        ? {
                              ...state.book,
                              quick_note_pages: [
                                  ...state.book.quick_note_pages,
                                  { ...action.response, id: action.page_id }
                              ]
                          }
                        : state.book
            }
        case contentConstants.DELETE_CONTENT_SUCCESS:
            return {
                book: {
                    ...state.book,
                    quick_note_pages: state.book.quick_note_pages.filter((page) => page.id !== action.page_id)
                }
            }
        default:
            return state
    }
}
