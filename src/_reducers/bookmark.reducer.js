import { bookmarkConstants } from "../_constants"

const initialState = { bookmarked: [] }

export function bookmark(state = initialState, action) {
    switch (action.type) {
        case bookmarkConstants.ADD_TO_BOOKMARK:
            let existBook = state.bookmarked.find((pinned) => pinned.bookId === action.payload.bookId)
            if (existBook) {
                return {
                    ...state,
                    bookmarked: state.bookmarked.map((x) =>
                        x.bookId === existBook.bookId
                            ? {
                                  ...x,
                                  pageOrder: [...x.pageOrder, action.payload.pageOrder].sort((a, b) => {
                                      return a - b
                                  })
                              }
                            : x
                    )
                }
            } else {
                return {
                    ...state,
                    bookmarked: [
                        ...state.bookmarked,
                        {
                            bookId: action.payload.bookId,
                            pageOrder: [action.payload.pageOrder]
                        }
                    ]
                }
            }
        case bookmarkConstants.REMOVE_FROM_BOOKMARK:
            return {
                ...state,
                bookmarked: state.bookmarked
                    .map((x) =>
                        x.bookId === action.payload.bookId
                            ? {
                                  ...x,
                                  pageOrder: x.pageOrder
                                      .filter((y) => y !== action.payload.pageOrder)
                                      .sort((a, b) => {
                                          return a - b
                                      })
                              }
                            : x
                    )
                    .filter((x) => x.pageOrder.length !== 0)
            }
        case bookmarkConstants.BULK_ADD_BOOKMARKS_REQUEST:
            return {
                loading: true
            }
        case bookmarkConstants.BULK_ADD_BOOKMARKS_SUCCESS:
            return {
                loading: false,
                bookmarked: []
            }
        case bookmarkConstants.BULK_ADD_BOOKMARKS_FAILURE:
            return {
                loading: false,
                error: action.error.message
            }
        default:
            return state
    }
}
