import { bookmarkConstants } from "../_constants"
import { bookmarkService } from "../_services/bookmark.service"

export const bookmarkActions = {
    addToBookmarks,
    removeFromBookmarks,
    getAll,
    storeOrDelete,
    bulkAddBookmarks
}

function addToBookmarks(bookId, pageOrder) {
    return (dispatch) => {
        dispatch({
            type: bookmarkConstants.ADD_TO_BOOKMARK,
            payload: { bookId, pageOrder }
        })
    }
}

function removeFromBookmarks(bookId, pageOrder) {
    return (dispatch) => {
        dispatch({
            type: bookmarkConstants.REMOVE_FROM_BOOKMARK,
            payload: { bookId, pageOrder }
        })
    }
}

function getAll() {
    return (dispatch) => {
        dispatch(request())
        bookmarkService.getAll().then(
            (response) => dispatch(success(response)),
            (error) => dispatch(failure(error))
        )
    }
    function request() {
        return { type: bookmarkConstants.GET_BOOKMARK_REQUEST }
    }
    function success(response) {
        return {
            type: bookmarkConstants.GET_BOOKMARK_SUCCESS,
            response
        }
    }
    function failure(error) {
        return { type: bookmarkConstants.GET_BOOKMARK_FAILURE, error }
    }
}

function storeOrDelete(book_id, book_page_id) {
    return (dispatch) => {
        dispatch(request())
        bookmarkService.storeOrDelete(book_id, book_page_id).then(
            (response) => dispatch(success(response)),
            (error) => dispatch(failure(error))
        )
    }
    function request() {
        return { type: bookmarkConstants.STORE_OR_DELETE_BOOKMARK_REQUEST }
    }
    function success(response) {
        return {
            type: bookmarkConstants.STORE_OR_DELETE_BOOKMARK_SUCCESS,
            response
        }
    }
    function failure(error) {
        return {
            type: bookmarkConstants.STORE_OR_DELETE_BOOKMARK_FAILURE,
            error
        }
    }
}

function bulkAddBookmarks(bookmarks) {
    return (dispatch) => {
        dispatch(request())
        bookmarkService.bulkAddBookmarks(bookmarks).then(
            (response) => Object.keys(response.data).length > 0 && dispatch(success()),
            (error) => dispatch(failure(error))
        )
    }
    function request() {
        return { type: bookmarkConstants.BULK_ADD_BOOKMARKS_REQUEST }
    }
    function success() {
        return {
            type: bookmarkConstants.BULK_ADD_BOOKMARKS_SUCCESS
        }
    }
    function failure(error) {
        return {
            type: bookmarkConstants.BULK_ADD_BOOKMARKS_FAILURE,
            error
        }
    }
}
