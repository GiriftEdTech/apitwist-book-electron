import { favoriteConstants } from "../_constants/favorite.constants"
import { favoriteService } from "../_services/favorite.service"

export const favoriteActions = {
    storeOrDelete
}

function storeOrDelete(book_id) {
    return (dispatch) => {
        favoriteService.storeOrDelete(book_id).then(
            (response) => dispatch(success(response)),
            (error) => dispatch(failure(error))
        )
    }

    function success(response) {
        return {
            type: favoriteConstants.STORE_OR_DELETE_FAVORITE_SUCCESS,
            response
        }
    }
    function failure(error) {
        return {
            type: favoriteConstants.STORE_OR_DELETE_FAVORITE_FAILURE,
            error
        }
    }
}
