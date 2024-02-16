import React, { forwardRef, useState } from "react"
const fabric = require("fabric").fabric
import { useEffect } from "react"
import LargeImageModal from "../image/LargeImageModal"

const Capture = forwardRef(({ setShowCapture }, ref) => {
    const [capturedImg, setCapturedImg] = useState(null)

    let canvas = ref.current._fc
    canvas.isDrawingMode = canvas.selection = false
    let rect
    let isDown
    let startX
    let startY

    const handleMouseDown = (event) => {
        isDown = true
        const pointer = canvas.getPointer(event.e)

        startX = pointer.x
        startY = pointer.y
        rect = new fabric.Rect({
            left: startX,
            top: startY,
            originX: "left",
            originY: "top",
            width: pointer.x - startX,
            height: pointer.y - startY,
            stroke: "rgba(0,0,0,0.9)",
            strokeWidth: 1,
            fill: "rgba(0,0,0,0.1)",
            transparentCorners: false,
            selectable: false,
            evented: false,
            angle: 0
        })
        canvas.add(rect)
    }

    const handleMouseMove = (event) => {
        if (!isDown) return

        const pointer = canvas.getPointer(event.e)
        if (startX > pointer.x) {
            rect.set({ left: Math.abs(pointer.x) })
        }
        if (startY > pointer.y) {
            rect.set({ top: Math.abs(pointer.y) })
        }

        rect.set({
            width: Math.abs(pointer.x - startX),
            height: Math.abs(pointer.y - startY)
        })

        rect.setCoords()
        canvas.renderAll()
    }

    const handleMouseUp = (event) => {
        isDown = false
        rect.fill = "rgba(0,0,0,0.0)"
        rect.strokeWidth = 0

        if (rect.width > 0 && rect.height > 0) {
            const dataURL = canvas.toDataURL({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
            })
            canvas.remove(rect)
            setCapturedImg(dataURL)
        }
    }

    useEffect(() => {
        if (ref && ref.current) {
            ref.current._fc.defaultCursor = "crosshair"
            ref.current._fc.on("mouse:down", handleMouseDown)
            ref.current._fc.on("mouse:move", handleMouseMove)
            ref.current._fc.on("mouse:up", handleMouseUp)
        }

        return () => {
            canvas.off("mouse:down", handleMouseDown)
            canvas.off("mouse:move", handleMouseMove)
            canvas.off("mouse:up", handleMouseUp)
            ref.current._fc.defaultCursor = "default"
        }
    }, [ref])

    return (
        <LargeImageModal
            zoomImage={capturedImg}
            show={capturedImg !== null}
            onHide={() => {
                setCapturedImg(null)
                setShowCapture(false)
            }}
        />
    )
})
export default Capture
