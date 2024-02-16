import { favoriteConstants } from "../_constants/favorite.constants"

const initialState = { favorited: [] }

export function favorite(state = initialState, action) {
    switch (action.type) {
        case favoriteConstants.GET_ALL_FAVORITED_BOOKS:
            return {
                favorited: action.books.reduce(
                    (previousValue, { id, is_favorited }) => [...previousValue, ...(is_favorited ? [id] : [])],
                    []
                )
            }
        case favoriteConstants.GET_FAVORITED_BOOK:
            return {
                favorited: [action.book.is_favorited && action.book.id]
            }
        case favoriteConstants.STORE_OR_DELETE_FAVORITE_SUCCESS:
            return {
                favorited: action.response.data
            }
        case favoriteConstants.STORE_OR_DELETE_FAVORITE_FAILURE:
            return {
                error: action.error.message
            }
        default:
            return state
    }
}
