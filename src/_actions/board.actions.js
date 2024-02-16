import { boardConstants } from "../_constants"
import { store } from "../_helpers"

export const boardActions = {
    toggleBoard,
    setBoardOpen,
    setSmartBoardOpen
}

function setSmartBoardOpen() {
    return (dispatch) => {
        dispatch({
            type: boardConstants.SET_SMARTBOARD_OPEN,
            payload: store.getState().boards.openSmartBoard ? false : true
        })
    }
}

function setBoardOpen() {
    return (dispatch) => {
        dispatch({
            type: boardConstants.SET_BOARD_OPEN,
            payload: store.getState().boards.openBoard ? false : true
        })
    }
}

function toggleBoard() {
    return (dispatch) => {
        dispatch({
            type: boardConstants.TOGGLE_BOARD_TYPE,
            payload: store.getState().boards.boardType === "whiteBoard" ? "blackBoard" : "whiteBoard"
        })
    }
}
