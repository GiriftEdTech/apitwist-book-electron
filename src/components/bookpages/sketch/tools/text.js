/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "./fabrictool"

const fabric = require("fabric").fabric

class Text extends FabricCanvasTool {
    configureCanvas(props) {
        let canvas = this._canvas
        canvas.isDrawingMode = false
        canvas.defaultCursor = "text"
        this._color = props.fillColor
        this._fill = props.lineColor
        this._textSize = props.textSize
    }

    doMouseDown(o) {
        this.isDown = true
        let canvas = this._canvas
        this.text = new fabric.IText("", {
            fontWeight: "bold",
            left: 0,
            top: 0,
            fontSize: this._textSize,
            fill: this._fill
        })
        if (o.target) {
            this.text.exitEditing()
            return
        }
        this.text.setPositionByOrigin(new fabric.Point(o.pointer.x, o.pointer.y))
        canvas.add(this.text)
        this.text.enterEditing()
    }

    doMouseMove(o) {}

    doMouseUp(o) {
        this.isDown = false
    }

    doMouseOut(o) {
        this.isDown = false
    }
}

export default Text
