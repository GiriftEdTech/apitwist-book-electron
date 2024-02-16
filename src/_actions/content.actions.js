import { contentConstants } from "../_constants"
import { contentService } from "../_services/content.service"
import { bookmarkActions } from "./bookmark.actions"

export const contentActions = {
    handleContentFilter,
    store,
    update,
    detach
}

function handleContentFilter(creator) {
    return (dispatch) => {
        dispatch({
            type: contentConstants.HANDLE_CONTENT_FILTER,
            creator
        })
    }
}

function store(page_id, content, top, left, createdAsStatically, book_id, createdBy, detail) {
    return (dispatch) => {
        dispatch(request())
        contentService.store(page_id, content.id, top, left, detail).then(
            (response) => {
                dispatch(success(response, content, page_id, top, left, createdAsStatically, createdBy, detail))
                book_id && dispatch(bookmarkActions.storeOrDelete(book_id, page_id))
            },
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: contentConstants.STORE_CONTENT_REQUEST }
    }

    function success(response, content, page_id, top, left, createdAsStatically, createdBy, detail) {
        return {
            type: contentConstants.STORE_CONTENT_SUCCESS,
            response,
            content,
            page_id,
            top,
            left,
            createdAsStatically,
            createdBy,
            detail
        }
    }

    function failure(error) {
        return {
            type: contentConstants.STORE_CONTENT_FAILURE,
            error
        }
    }
}

function update(page_id, id, top, left, detail, content) {
    return (dispatch) => {
        dispatch(request(id, detail, content, top, left))
        contentService.update(page_id, id, top, left, detail).then(
            (response) => {
                dispatch(success(id, response))
            },
            (error) => dispatch(failure(error))
        )
    }

    function request(id, detail, content, top, left) {
        return { type: contentConstants.UPDATE_CONTENT_REQUEST, id, detail, content, top, left }
    }

    function success(id, response) {
        return {
            type: contentConstants.UPDATE_CONTENT_SUCCESS,
            id,
            response
        }
    }

    function failure(error) {
        return {
            type: contentConstants.UPDATE_CONTENT_FAILURE,
            error
        }
    }
}

function detach(page_id, id, book_id) {
    return (dispatch) => {
        dispatch(request())
        contentService.detach(page_id, id).then(
            () => {
                dispatch(success(id, page_id))
                book_id && dispatch(bookmarkActions.storeOrDelete(book_id, page_id))
            },
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: contentConstants.DELETE_CONTENT_REQUEST }
    }

    function success(id, page_id) {
        return {
            type: contentConstants.DELETE_CONTENT_SUCCESS,
            id,
            page_id
        }
    }

    function failure(error) {
        return {
            type: contentConstants.DELETE_CONTENT_FAILURE,
            error
        }
    }
}
