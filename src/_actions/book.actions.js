import { bookConstants } from "../_constants"
import { favoriteConstants } from "../_constants/favorite.constants"
import { bookService } from "../_services"
import { alertActions } from "./alert.actions"

export const bookActions = {
    getAll,
    getById,
    getContents,
    selectPage,
    clearSelectedBook,
    clearSelectedPage,
    clearBooks
}

function getAll() {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())

        bookService.getAll().then(
            (books) => {
                dispatch(success(books))
                dispatch(getAllFavoritedBooks(books))
            },
            // (error) => dispatch(failure(error))
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request() {
        return { type: bookConstants.GETALL_REQUEST }
    }

    function success(books) {
        return { type: bookConstants.GETALL_SUCCESS, books }
    }

    function failure(error) {
        return { type: bookConstants.GETALL_FAILURE, error }
    }

    function getAllFavoritedBooks(books) {
        return { type: favoriteConstants.GET_ALL_FAVORITED_BOOKS, books }
    }
}

function getById(id) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())

        bookService.getById(id).then(
            (book) => {
                dispatch(success(book))
                dispatch(getFavoritedBook(book))
            },
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request() {
        return { type: bookConstants.GETBYID_REQUEST }
    }

    function success(book) {
        return { type: bookConstants.GETBYID_SUCCESS, book }
    }

    function failure(error) {
        return { type: bookConstants.GETBYID_FAILURE, error }
    }
    function getFavoritedBook(book) {
        return { type: favoriteConstants.GET_FAVORITED_BOOK, book }
    }
}

function getContents(book_id, page_order) {
    return (dispatch) => {
        dispatch(alertActions.clear())
        dispatch(request())

        bookService.getContents(book_id, page_order).then(
            (contents) => {
                dispatch(success(contents))
            },
            (error) => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            }
        )
    }

    function request() {
        return { type: bookConstants.GETCONTENTS_REQUEST }
    }

    function success(contents) {
        return { type: bookConstants.GETCONTENTS_SUCCESS, contents }
    }

    function failure(error) {
        return { type: bookConstants.GETCONTENTS_FAILURE, error }
    }
}

function selectPage(page) {
    return { type: bookConstants.SELECT_PAGE, page }
}

function clearSelectedBook() {
    return { type: bookConstants.CLEAR_SELECTED_BOOK }
}

function clearSelectedPage() {
    return { type: bookConstants.CLEAR_SELECTED_PAGE }
}

function clearBooks() {
    return { type: bookConstants.CLEAR_BOOKS }
}
