import { lastViewedConstants, bookConstants } from "../_constants"
import { lastViewedPageService } from "../_services/lastViewedPage.service"

export const lastViewedAction = {
    getLastVisited
}

function getLastVisited() {
    return (dispatch) => {
        dispatch(request())
        dispatch(activeBookRequest())
        lastViewedPageService.getLastVisited().then(
            (response) => {
                if (response.data.book !== null) {
                    dispatch(success(response)),
                        dispatch(activeBookSuccess(response.data.book)),
                        response.data.book.book_pages.find(
                            (page) =>
                                page.id === response.data.last_viewed_page.book_page_id &&
                                dispatch(activePageSuccess(page))
                        )
                } else {
                    dispatch(clearSelectedBook())
                }
            },
            (error) => dispatch(failure(error))
        )
    }
    function request() {
        return { type: lastViewedConstants.GET_LAST_VIEWED_REQUEST }
    }
    function success(response) {
        return {
            type: lastViewedConstants.GET_LAST_VIEWED_SUCCESS,
            response
        }
    }
    function failure(error) {
        return { type: lastViewedConstants.GET_LAST_VIEWED_FAILURE, error }
    }

    function activeBookRequest() {
        return { type: bookConstants.GETBYID_REQUEST }
    }
    function activeBookSuccess(book) {
        return {
            type: bookConstants.GETBYID_SUCCESS,
            book
        }
    }
    function activePageSuccess(page) {
        return {
            type: bookConstants.SELECT_PAGE,
            page
        }
    }
    function clearSelectedBook() {
        return { type: bookConstants.CLEAR_SELECTED_BOOK }
    }
}
