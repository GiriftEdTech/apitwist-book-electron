import { scaleConstants } from "../_constants"

export function scale(state = { scaleFactor: 1, scale: 1, scaleCss: "zoomPage1-00" }, action) {
    switch (action.type) {
        case scaleConstants.PAGE_SCALE_UP:
            if (parseFloat(action.scaleFactor) === 2) {
                return {
                    scaleFactor: state.scaleFactor,
                    scale: 1,
                    scaleCss: state.scaleCss
                }
            } else {
                let newScaleFactor = parseFloat(parseFloat(action.scaleFactor) + 0.1).toFixed(2)
                let newScaleCss = `zoomPage${newScaleFactor.toString().replace(".", "-")} ${
                    action.isPageHorizontal ? "horizontal" : ""
                }`

                return {
                    scaleFactor: newScaleFactor,
                    scale: 1.1,
                    scaleCss: newScaleCss
                }
            }
        case scaleConstants.PAGE_SCALE_DOWN:
            if (parseFloat(action.scaleFactor) === 0.3) {
                return {
                    scaleFactor: state.scaleFactor,
                    scale: 1,
                    scaleCss: state.scaleCss
                }
            } else {
                let newScaleFactorDown = parseFloat(action.scaleFactor - 0.1).toFixed(2)
                let newScaleCssDown = `zoomPage${newScaleFactorDown.toString().replace(".", "-")} ${
                    action.isPageHorizontal ? "horizontal" : ""
                }`
                return {
                    scaleFactor: newScaleFactorDown,
                    scale: 0.9,
                    scaleCss: newScaleCssDown
                }
            }
        case scaleConstants.SET_PAGE_SCALE_DEFAULT:
            return {
                scaleFactor: 1,
                scale: 1,
                scaleCss: "zoomPage1-00"
            }
        default:
            return state
    }
}
