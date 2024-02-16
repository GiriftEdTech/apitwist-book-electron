/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "../fabrictool"

class Eraser extends FabricCanvasTool {
    configureCanvas(props) {
        let canvas = this._canvas
        canvas.isDrawingMode = false
        canvas.selection = true
        canvas.forEachObject((o) => {
            o.selectable = o.evented = true
        })
    }
}

export default Eraser
