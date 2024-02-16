import { scaleConstants } from "../_constants"

export const scaleActions = {
    setScalePageUp,
    setScalePageDown,
    setDefaultScale
}

function setScalePageDown(scaleFactor, isPageHorizontal) {
    return { type: scaleConstants.PAGE_SCALE_DOWN, scaleFactor, isPageHorizontal }
}

function setScalePageUp(scaleFactor, isPageHorizontal) {
    return { type: scaleConstants.PAGE_SCALE_UP, scaleFactor, isPageHorizontal }
}
function setDefaultScale(scaleFactor) {
    return { type: scaleConstants.SET_PAGE_SCALE_DEFAULT, scaleFactor }
}
