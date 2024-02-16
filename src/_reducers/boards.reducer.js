import { boardConstants } from "../_constants"
import { utils } from "../_helpers"

const initialState = {
    openSmartBoard: false,
    openBoard: false,
    boardType: localStorage.getItem("boardMode") === null ? "whiteBoard" : localStorage.getItem("boardMode"),
    resolution: "m-"
}

export function boards(state = initialState, action) {
    switch (action.type) {
        case boardConstants.SET_SMARTBOARD_OPEN:
            return {
                ...state,
                openSmartBoard: action.payload,
                resolution: action.payload ? "h-" : "m-",
                openBoard: false
            }

        case boardConstants.TOGGLE_BOARD_TYPE:
            utils.setStore("boardMode", action.payload)
            return {
                ...state,
                boardType: action.payload
            }

        case boardConstants.SET_BOARD_OPEN:
            return {
                ...state,
                openBoard: action.payload,
                openSmartBoard: false
            }
        default:
            return state
    }
}
