/*eslint no-unused-vars: 0*/
// @ts-nocheck
import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import History from "./history"
import { uuid4 } from "./utils"
import Arrow from "./tools/Arrow"
import Tool from "./tools/tools"
import DefaultTool from "./tools/defaul-tool"
import Select from "./tools/Select"
import Pencil from "./tools/Pencil"
import Line from "./tools/Line"
import Rectangle from "./tools/Rectangle"
import RectangleLabel from "./tools/Rectangle/rectangle-label"
import Circle from "./tools/Circle"
import EmptyCircle from "./tools/empty-circle"
import EmptyRectangle from "./tools/empty-rectangle"
import Highlighter from "./tools/Highlighter"
import Text from "./tools/text"
import Pan from "./tools/Pan"
import Eraser from "./tools/Eraser"
import { fabric } from "fabric"
import Tools from "../sketch/tools/tools"
/**
 * Sketch Tool based on FabricJS for React Applications
 */
const imageSize = 1000
class SketchField extends PureComponent {
    static propTypes = {
        // the color of the line
        lineColor: PropTypes.string,
        // The width of the line
        lineWidth: PropTypes.number,
        //Highlighter Line width
        highlighterLineWidth: PropTypes.number,
        // the text size
        textSize: PropTypes.number,
        // the fill color of the shape when applicable
        fillColor: PropTypes.string,
        // the background color of the sketch
        backgroundColor: PropTypes.string,
        // the opacity of the object
        opacity: PropTypes.number,
        // number of undo/redo steps to maintain
        undoSteps: PropTypes.number,
        // The tool to use, can be pencil, rectangle, circle, brush;
        tool: PropTypes.string,
        // image format when calling toDataURL
        imageFormat: PropTypes.string,
        // Sketch data for controlling sketch from
        // outside the component
        value: PropTypes.object,
        // Set to true if you wish to force load the given value, even if it is  the same
        forceValue: PropTypes.bool,
        // Specify some width correction which will be applied on auto resize
        widthCorrection: PropTypes.number,
        // Specify some height correction which will be applied on auto resize
        heightCorrection: PropTypes.number,
        // Specify action on change
        onChange: PropTypes.func,
        // Default initial value
        defaultValue: PropTypes.object,
        // Sketch width
        width: PropTypes.number,
        // Sketch height
        height: PropTypes.number,
        // event object added
        onObjectAdded: PropTypes.func,
        // event object modified
        onObjectModified: PropTypes.func,
        // event object removed
        onObjectRemoved: PropTypes.func,
        // event mouse down
        onMouseDown: PropTypes.func,
        // event mouse move
        onMouseMove: PropTypes.func,
        // event mouse up
        onMouseUp: PropTypes.func,
        // event mouse out
        onMouseOut: PropTypes.func,
        // event object move
        onObjectMoving: PropTypes.func,
        // event object scale
        onObjectScaling: PropTypes.func,
        // event object rotating
        onObjectRotating: PropTypes.func,
        // Class name to pass to container div of canvas
        className: PropTypes.string,
        // Style options to pass to container div of canvas
        style: PropTypes.object
    }
    static defaultProps = {
        lineColor: "black",
        lineWidth: 3,
        highlighterLineWidth: 20,
        fillColor: "transparent",
        backgroundColor: "transparent",
        opacity: 1.0,
        undoSteps: 25,
        tool: null,
        widthCorrection: 0,
        heightCorrection: 0,
        forceValue: false,
        onObjectAdded: () => null,
        onObjectModified: () => null,
        onObjectRemoved: () => null,
        onMouseDown: () => null,
        onMouseMove: () => null,
        onMouseUp: () => null,
        onMouseOut: () => null,
        onObjectMoving: () => null,
        onObjectScaling: () => null,
        onObjectRotating: () => null
    }
    state = {
        action: true,
        annotationList: [],
        scl: 1,
        sidebarState: true,
        timeout: null
    }
    _initTools = (fabricCanvas) => {
        this._tools = {}
        this._tools[Tool.Select] = new Select(fabricCanvas)
        this._tools[Tool.Pencil] = new Pencil(fabricCanvas)
        this._tools[Tool.Line] = new Line(fabricCanvas)
        this._tools[Tool.Arrow] = new Arrow(fabricCanvas)
        this._tools[Tool.Rectangle] = new Rectangle(fabricCanvas)
        this._tools[Tool.EmptyRectangle] = new EmptyRectangle(fabricCanvas)
        this._tools[Tool.RectangleLabel] = new RectangleLabel(fabricCanvas)
        this._tools[Tool.Circle] = new Circle(fabricCanvas)
        this._tools[Tool.EmptyCircle] = new EmptyCircle(fabricCanvas)
        this._tools[Tool.Pan] = new Pan(fabricCanvas)
        this._tools[Tool.Highlighter] = new Highlighter(fabricCanvas)
        this._tools[Tool.DefaultTool] = new DefaultTool(fabricCanvas)
        this._tools[Tool.Text] = new Text(fabricCanvas)
        this._tools[Tool.Eraser] = new Eraser(fabricCanvas)
    }
    onKeyUp = (event) => {
        let canvas = this._fc
        let textArray = canvas?.toJSON().objects.pop()
        const { timeout } = this.state
        clearTimeout(timeout)

        if (
            !event ||
            this.props.contentEditModal ||
            this.props.isAssistantOpen ||
            this.props.isTranslatorOpen ||
            this.props.isImageSearcherOpen ||
            this.props.resizableModalShow ||
            this.props.isQuickNoteOpen
        )
            return
        if (event?.keyCode === 27) {
            //Escape => Select
            this.props.onChangeTool(Tools.Select)
            canvas.renderAll()
        }

        let inText =
            this._selectedTool === this._tools[Tool.Text] ||
            (this._selectedTool === this._tools[Tool.Select] &&
                canvas.getActiveObject()?.type === "i-text" &&
                canvas.getActiveObject().isEditing)

        if (inText) {
            if (textArray && textArray.type === "i-text") {
                if (textArray.text !== "") {
                    this.props.saveCanvas()
                }
            }
            return
        }

        switch (event?.keyCode) {
            case 8:
                //backspace
                this.props.removeSelectedObject()
                break
            case 46:
                //delete
                this.props.removeAllObjects()
                break
            case 39:
                //next page
                this.nextPage()
                break
            case 37:
                //prev page
                this.previousPage()
                break
            case 72:
                //Highlight
                this.props.onChangeTool(Tools.Highlighter)
                break
            case 76:
                //Line
                this.props.onChangeTool(Tools.Line)
                break
            case 84:
                //Text
                this.props.onChangeTool(Tools.Text)
                break
            case 83:
                //Select
                this.props.onChangeTool(Tools.Select)
                break
            case 80:
                //Pen
                this.props.onChangeTool(Tools.Pencil)
                break
            case 67:
                //c
                this.props.onChangeTool(Tools.EmptyCircle)
                break
            case 82:
                //r
                this.props.onChangeTool(Tools.EmptyRectangle)
                break

            default:
                break
        }
    }

    nextPage = () => {
        if (!this.props.isTourOpen) {
            const book = this.props.book
            const index =
                book &&
                book.book &&
                book.book.book_pages.findIndex((page) => page.page_order === this.props.page.page_order)
            if (book && book.book) {
                if (index < book.book.book_pages.length - 1) {
                    this.props.history.push(`${book.book.book_pages[index + 1].page_order}`)
                } else {
                    this.props.history.push(`${book.book.book_pages[0].page_order}`)
                }
            }
        }
    }

    previousPage = () => {
        if (!this.props.isTourOpen) {
            const book = this.props.book
            const index =
                book &&
                book.book &&
                book.book.book_pages.findIndex((page) => page.page_order === this.props.page.page_order)
            if (book && book.book) {
                if (index > 0) {
                    this.props.history.push(`${book.book.book_pages[index - 1].page_order}`)
                }
            }
        }
    }

    /**
     * Enable touch Scrolling on Canvas
     */
    enableTouchScroll = () => {
        let canvas = this._fc
        if (canvas.allowTouchScrolling) return
        canvas.allowTouchScrolling = true
    }
    /**
     * Disable touch Scrolling on Canvas
     */
    disableTouchScroll = () => {
        let canvas = this._fc
        if (canvas.allowTouchScrolling) {
            canvas.allowTouchScrolling = false
        }
    }
    /**
     * Add an image as object to the canvas
     *
     * @param dataUrl the image url or Data Url
     * @param options object to pass and change some options when loading image, the format of the object is:
     *
     * {
     *   left: <Number: distance from left of canvas>,
     *   top: <Number: distance from top of canvas>,
     *   scale: <Number: initial scale of image>
     * }
     */
    // addImg = (dataUrl, options = {}) => {
    //   let canvas = this._fc
    //   fabric.Image.fromURL(dataUrl, (oImg) => {
    //     let opts = {
    //       left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
    //       top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
    //       scale: 0.5
    //     }
    //     Object.assign(opts, options)
    //     oImg.scale(opts.scale)
    //     oImg.set({
    //       left: opts.left,
    //       top: opts.top
    //     })
    //     canvas.add(oImg)
    //   })
    // }

    /**
     * Action when an object is added to the canvas
     */
    _onObjectAdded = (e) => {
        const { onObjectAdded, annotations, page } = this.props

        // if (
        //   this._selectedTool === this._tools[Tool.Rectangle] ||
        //   this._selectedTool === this._tools[Tool.Circle] ||
        //   this._selectedTool === this._tools[Tool.EmptyRectangle] ||
        //   this._selectedTool === this._tools[Tool.EmptyCircle] ||
        //   this._selectedTool === this._tools[Tool.Text]
        // ) {
        //   setTimeout(() => {
        //     this.props.saveCanvas()
        //   }, 200)
        // } else {
        // }

        const filteredPage =
            annotations &&
            annotations.annotation &&
            annotations.annotation.length > 0 &&
            annotations.annotation.filter((perPage) => perPage.book_page_id === page && page.id)
        let canvas = this._fc

        if (!this.state.action) {
            this.setState({
                action: true
            })
            return
        }
        let obj = e.target
        obj.__version = 1
        // record current object state as json and save as originalState
        let objState = obj?.toJSON()
        obj.__originalState = objState
        let state = JSON.stringify(objState)
        // object, previous state, current state
        this._history.keep([obj, state, state])

        if (filteredPage && filteredPage.length > 0) {
            if (canvas?.toJSON().objects.length !== JSON.parse(filteredPage[0].annotation).objects.length) {
                let lastItem = objState
                if (
                    (lastItem.type === "i-text" && lastItem.text === "") ||
                    lastItem.type === "circle" ||
                    lastItem.type === "rect"
                ) {
                    return
                }
            }
        } else if (canvas?.toJSON().objects.length !== 0) {
            let lastItem = canvas.toJSON().objects.pop()
            if (
                (lastItem.type === "i-text" && lastItem.text === "") ||
                lastItem.type === "circle" ||
                lastItem.type === "rect"
            ) {
                return
            }
        }

        onObjectAdded(e)
    }

    /**
     * Action when an object is moving around inside the canvas
     */
    _onObjectMoving = (e) => {
        const { onObjectMoving } = this.props
        onObjectMoving(e)
    }

    /**
     * Action when an object is scaling inside the canvas
     */
    _onObjectScaling = (e) => {
        const { onObjectScaling } = this.props
        onObjectScaling(e)
    }

    /**
     * Action when an object is rotating inside the canvas
     */
    _onObjectRotating = (e) => {
        const { onObjectRotating } = this.props
        onObjectRotating(e)
    }

    _onObjectModified = (e) => {
        const { onObjectModified } = this.props
        let obj = e.target
        obj.__version += 1
        let prevState = JSON.stringify(obj.__originalState)
        let objState = obj?.toJSON()
        // record current object state as json and update to originalState

        if (objState.type === "i-text") {
            if (objState.text !== "") {
                obj.__originalState = objState
                let currState = JSON.stringify(objState)
                // object, previous state, current state
                this._history.keep([obj, prevState, currState])
            }
        }

        if (prevState && JSON.parse(prevState).type === "i-text") {
            if (JSON.parse(prevState).text !== "") {
                this.props.saveCanvas()
            }
        } else {
            this.props.saveCanvas()
        }

        onObjectModified(e)
    }
    /**
     * Action when an object is removed from the canvas
     */
    _onObjectRemoved = (e) => {
        const { onObjectRemoved } = this.props
        let obj = e.target
        if (obj.__removed) {
            obj.__version += 1
            return
        }
        obj.__version = 0
        onObjectRemoved(e)
    }
    /**
     * Action when the mouse button is pressed down
     */
    _onMouseDown = (e) => {
        const { onMouseDown } = this.props
        this._selectedTool.doMouseDown(e)
        onMouseDown(e)
    }
    /**
     * Action when the mouse cursor is moving around within the canvas
     */
    _onMouseMove = (e) => {
        const { onMouseMove } = this.props
        this._selectedTool.doMouseMove(e)
        onMouseMove(e)
    }
    /**
     * Action when the mouse cursor is moving out from the canvas
     */
    _onMouseOut = (e) => {
        const { onMouseOut } = this.props
        this._selectedTool.doMouseOut(e)
        if (this.props.onChange) {
            let onChange = this.props.onChange
            setTimeout(() => {
                onChange(e.e)
            }, 10)
        }
        onMouseOut(e)
    }
    _onMouseUp = (e) => {
        const { onMouseUp } = this.props
        if (
            this._selectedTool === this._tools[Tool.Rectangle] ||
            this._selectedTool === this._tools[Tool.Circle] ||
            this._selectedTool === this._tools[Tool.EmptyRectangle] ||
            this._selectedTool === this._tools[Tool.EmptyCircle] ||
            this._selectedTool === this._tools[Tool.Line] ||
            this._selectedTool === this._tools[Tool.Highlighter] ||
            this._selectedTool === this._tools[Tool.Pencil]
        ) {
            this.props.saveCanvas()
        }
        this._selectedTool.doMouseUp(e)
        // Update the final state to new-generated object
        // Ignore Path object since it would be created after mouseUp
        // Assumed the last object in canvas.getObjects() in the newest object
        if (this.props.tool !== Tool.Pencil) {
            const canvas = this._fc
            const objects = canvas.getObjects()
            const newObj = objects[objects.length - 1]
            if (newObj && newObj.__version === 1) {
                newObj.__originalState = newObj?.toJSON()
            }
        }
        if (this.props.onChange) {
            let onChange = this.props.onChange
            setTimeout(() => {
                onChange(e.e)
            }, 10)
        }
        onMouseUp(e)
    }
    _wheelZoom = (opt) => {
        if (opt.e.ctrlKey) {
            var delta = opt.e.deltaY
            if (delta < 0) {
                this.props.zoomIn()
                opt.e.preventDefault()
                opt.e.stopPropagation()
            } else {
                this.props.zoomOut()
                opt.e.preventDefault()
                opt.e.stopPropagation()
            }
        }
    }
    /**
     * Track the resize of the window and update our state
     *
     * @param e the resize event
     * @private
     */
    // _resize = (e, canvasWidth = null, canvasHeight = null) => {
    //   if (e) e.preventDefault()
    //   let { widthCorrection, heightCorrection } = this.props
    //   let canvas = this._fc
    //   let { offsetWidth, clientHeight } = this._container
    //   let prevWidth = canvasWidth || canvas.getWidth()
    //   let prevHeight = canvasHeight || canvas.getHeight()
    //   let wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2)
    //   let hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2)
    //   canvas.setWidth(offsetWidth - widthCorrection)
    //   canvas.setHeight(clientHeight - heightCorrection)
    //   if (canvas.backgroundImage) {
    //     // Need to scale background images as well
    //     let bi = canvas.backgroundImage
    //     bi.width = bi.width * wfactor
    //     bi.height = bi.height * hfactor
    //   }
    //   let objects = canvas.getObjects()
    //   for (let i in objects) {
    //     let obj = objects[i]
    //     let scaleX = obj.scaleX
    //     let scaleY = obj.scaleY
    //     let left = obj.left
    //     let top = obj.top
    //     let tempScaleX = scaleX * wfactor
    //     let tempScaleY = scaleY * hfactor
    //     let tempLeft = left * wfactor
    //     let tempTop = top * hfactor
    //     obj.scaleX = tempScaleX
    //     obj.scaleY = tempScaleY
    //     obj.left = tempLeft
    //     obj.top = tempTop
    //     obj.setCoords()
    //   }
    //   canvas.renderAll()
    //   canvas.calcOffset()
    // }

    _resize = (e) => {
        if (e) e.preventDefault()
        let canvas = this._fc
        this.vpW = window.innerWidth - 115

        if (this.props.sidebarIsOpened) {
            this.vpW -= 250
        }
        this.vpH = window.innerHeight - 115

        let sclOld = (this.vpW - imageSize) / imageSize
        this.setState({ scl: sclOld })

        canvas.setWidth(this.vpW)
        canvas.setHeight(this.vpH)
        let newScaleX
        let newScaleY

        if (canvas.backgroundImage) {
            if (canvas.backgroundImage.width > canvas.backgroundImage.height) {
                let newHorizontalScaleX = this.vpW / canvas.backgroundImage.width
                let newHorizontalnewScaleY = this.vpH / canvas.backgroundImage.height

                if (newHorizontalScaleX > newHorizontalnewScaleY) {
                    newHorizontalScaleX = newHorizontalnewScaleY
                } else {
                    newHorizontalnewScaleY = newHorizontalScaleX
                }
                canvas.backgroundImage.scale(newHorizontalScaleX, newHorizontalnewScaleY)

                canvas.backgroundImage.originX = "left"
                canvas.backgroundImage.originY = "top"
                newScaleX = canvas.backgroundImage.getScaledWidth()
                newScaleY = canvas.backgroundImage.getScaledHeight()

                canvas.setHeight(newScaleY)
                canvas.setWidth(newScaleX)

                this.props.bookPageRef.current.style.position = "relative"
                let left = (this.vpW - canvas.backgroundImage.getScaledWidth()) / 2
                this.props.bookPageRef.current.style.left = left + "px"
                this.props.bookPageRef.current.style.width = newScaleX + "px"
            } else {
                canvas.backgroundImage.scaleToWidth(canvas.getWidth())
                canvas.setHeight(canvas.backgroundImage.getScaledHeight())

                newScaleX = canvas.getWidth()
                newScaleY = canvas.backgroundImage.getScaledHeight()
            }
        }
        canvas.forEachObject((obj) => {
            try {
                if (this.objInArray(obj, this.state.annotationList) < 0) {
                    const x = obj.get("left"),
                        y = obj.get("top"),
                        width = obj.width,
                        height = obj.height

                    let newAnnotation = new Annotation(obj, x, y, width, height, newScaleX, newScaleY)

                    this.setState({
                        annotationList: [...this.state.annotationList, newAnnotation]
                    })
                }

                let annotation = this.state.annotationList[this.objInArray(obj, this.state.annotationList)]
                if (annotation) {
                    try {
                        const scaleW = newScaleX / annotation.viewportWidth
                        const scaleX = annotation.xCoord * scaleW
                        const scaleY = annotation.yCoord * scaleW

                        obj.set("scaleX", scaleW)
                        obj.set("scaleY", scaleW)
                        obj.set("left", scaleX)
                        obj.set("top", scaleY)
                        obj.setCoords()
                    } catch (e) {
                        console.error(e)
                    }
                }
            } catch (err) {
                console.error(err)
            }
        })

        canvas.renderAll()
    }

    // Annotation(obj, x, y, width, height, vpW, vpH) {
    //   this.obj = obj
    //   this.xCoord = x
    //   this.yCoord = y
    //   this.widthVal = width
    //   this.heightVal = height
    //   this.viewportWidth = vpW
    //   this.viewportHeight = vpH
    // }

    objInArray(obj, annotationArray) {
        if (annotationArray) {
            for (let i = 0; i < annotationArray.length; i++) {
                if (annotationArray[i].obj === obj) {
                    return i
                }
            }
        }
        return -1
    }

    /**
     * Sets the background color for this sketch
     * @param color in rgba or hex format
     */
    _backgroundColor = (color) => {
        if (!color) return
        let canvas = this._fc
        canvas.setBackgroundColor(color, () => canvas.renderAll())
    }
    /**
     * Zoom the drawing by the factor specified
     *
     * The zoom factor is a percentage with regards the original, for example if factor is set to 2
     * it will double the size whereas if it is set to 0.5 it will half the size
     *
     * @param factor the zoom factor
     */
    // zoom = (factor) => {
    //   let canvas = this._fc
    //   let objects = canvas.getObjects()
    //   for (let i in objects) {
    //     objects[i].scaleX = objects[i].scaleX * factor
    //     objects[i].scaleY = objects[i].scaleY * factor
    //     objects[i].left = objects[i].left * factor
    //     objects[i].top = objects[i].top * factor
    //     objects[i].setCoords()
    //   }
    //   canvas.renderAll()
    //   canvas.calcOffset()
    // }

    zoom = (factor) => {
        let canvas = this._fc
        // console.log(document.getElementsByClassName('canvas-container'))
        // console.log('here', canvas.viewportTransform)
        // console.log('here', canvas.viewportTransform)
        // console.log(
        //   'zoom function',
        //   canvas.backgroundImage.getScaledWidth(),
        //   factor
        // )
        if (canvas.backgroundImage) {
            if (canvas.backgroundImage.getScaledWidth() * factor < canvas.getWidth()) {
                canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
                // canvas.backgroundImage.scaleX = 2;
                canvas.renderAll()
                return
            }
            // console.log('here', canvas.viewportTransform)
            let objects = canvas.getObjects()
            // console.log("zoom out");

            // for (let i in objects) {
            //   let opLeft = objects[i].left * factor
            //   let opTop = objects[i].top * factor
            //   // if (factor <= 1) {
            //   //   opLeft = 0;
            //   //   opTop = 0;
            //   // }
            //   objects[i].scaleX = objects[i].scaleX * factor
            //   objects[i].scaleY = objects[i].scaleY * factor
            //   objects[i].left = opLeft
            //   objects[i].top = opTop
            //   // console.log(" objects[i].left", objects[i].left);
            //   // console.log(" objects[i].top", objects[i].top);
            //   objects[i].setCoords()
            // }

            // console.log(objects);
            // if (canvas.backgroundImage) {
            //   // console.log("buraya girdi");
            //   if (
            //     canvas.backgroundImage.getScaledWidth() * factor <
            //     canvas.getWidth()
            //   ) {
            //     // console.log("here", canvas.viewportTransform);
            //     // console.log("here", canvas);
            //     canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
            //     // canvas.backgroundImage.scaleX = 2;
            //     canvas.renderAll()
            //     return
            //   }
            //   canvas.backgroundImage.scaleToWidth(
            //     canvas.backgroundImage.getScaledWidth() * factor
            //   )
            //   canvas.setHeight(canvas.backgroundImage.getScaledHeight())
            // }
            canvas.renderAll()
        }
    }
    /**
     * Perform an undo operation on canvas, if it cannot undo it will leave the canvas intact
     */
    undo = () => {
        let history = this._history
        if (!history.current) return false
        let [obj, prevState, currState] = history.getCurrent()
        history.undo()
        if (obj.__removed) {
            this.setState(
                {
                    action: false
                },
                () => {
                    this._fc.add(obj)
                    obj.__version -= 1
                    obj.__removed = false
                }
            )
        } else if (obj.__version <= 1) {
            this._fc.remove(obj)
            this.props.saveCanvas()
        } else {
            obj.__version -= 1
            obj.setOptions(JSON.parse(prevState))
            obj.setCoords()
            this._fc.renderAll()
        }
        if (this.props.onChange) {
            this.props.onChange()
        }
    }
    /**
     * Perform a redo operation on canvas, if it cannot redo it will leave the canvas intact
     */
    redo = () => {
        let history = this._history
        if (history.canRedo()) {
            let canvas = this._fc
            //noinspection Eslint
            let [obj, prevState, currState] = history.redo()
            if (obj.__version === 0) {
                this.setState(
                    {
                        action: false
                    },
                    () => {
                        canvas.add(obj)
                        obj.__version = 1
                        this.props.saveCanvas()
                    }
                )
            } else {
                obj.__version += 1
                obj.setOptions(JSON.parse(currState))
                this.props.saveCanvas()
            }
            obj.setCoords()
            canvas.renderAll()
            if (this.props.onChange) {
                this.props.onChange()
            }
        }
    }
    /**
     * Delegation method to check if we can perform an undo Operation, useful to disable/enable possible buttons
     *
     * @returns {*} true if we can undo otherwise false
     */
    canUndo = () => {
        return this._history.canUndo()
    }
    /**
     * Delegation method to check if we can perform a redo Operation, useful to disable/enable possible buttons
     *
     * @returns {*} true if we can redo otherwise false
     */
    canRedo = () => {
        return this._history.canRedo()
    }
    /**
     * Exports canvas element to a dataurl image. Note that when multiplier is used, cropping is scaled appropriately
     *
     * Available Options are
     * <table style="width:100%">
     *
     * <tr><td><b>Name</b></td><td><b>Type</b></td><td><b>Argument</b></td><td><b>Default</b></td><td><b>Description</b></td></tr>
     * <tr><td>format</td> <td>String</td> <td><optional></td><td>png</td><td>The format of the output image. Either "jpeg" or "png"</td></tr>
     * <tr><td>quality</td><td>Number</td><td><optional></td><td>1</td><td>Quality level (0..1). Only used for jpeg.</td></tr>
     * <tr><td>multiplier</td><td>Number</td><td><optional></td><td>1</td><td>Multiplier to scale by</td></tr>
     * <tr><td>left</td><td>Number</td><td><optional></td><td></td><td>Cropping left offset. Introduced in v1.2.14</td></tr>
     * <tr><td>top</td><td>Number</td><td><optional></td><td></td><td>Cropping top offset. Introduced in v1.2.14</td></tr>
     * <tr><td>width</td><td>Number</td><td><optional></td><td></td><td>Cropping width. Introduced in v1.2.14</td></tr>
     * <tr><td>height</td><td>Number</td><td><optional></td><td></td><td>Cropping height. Introduced in v1.2.14</td></tr>
     *
     * </table>
     *
     * @returns {String} URL containing a representation of the object in the format specified by options.format
     */
    toDataURL = (options) => this._fc.toDataURL(options)
    /**
     * Returns JSON representation of canvas
     *
     * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
     * @returns {string} JSON string
     */
    toJSON = (propertiesToInclude) => this._fc?.toJSON(propertiesToInclude)
    /**
     * Populates canvas with data from the specified JSON.
     *
     * JSON format must conform to the one of fabric.Canvas#toDatalessJSON
     *
     * @param json JSON string or object
     */
    fromJSON = (json) => {
        if (!json) return
        let canvas = this._fc
        setTimeout(() => {
            canvas.loadFromJSON(json, () => {
                if (this.props.tool === Tool.DefaultTool) {
                    canvas.isDrawingMode = canvas.selection = false
                    canvas.forEachObject((o) => (o.selectable = o.evented = false))
                }
                canvas.renderAll()
                if (this.props.onChange) {
                    this.props.onChange()
                }
            })
        }, 100)
    }
    /**
     * Clear the content of the canvas, this will also clear history but will return the canvas content as JSON to be
     * used as needed in order to undo the clear if possible
     *
     * @param propertiesToInclude Array <optional> Any properties that you might want to additionally include in the output
     * @returns {string} JSON string of the canvas just cleared
     */
    clear = (propertiesToInclude) => {
        let discarded = this.toJSON(propertiesToInclude)
        this._fc.clear()
        this._history.clear()
        return discarded
    }

    hasSelection = () => {
        let canvas = this._fc
        if (this._selectedTool === this._tools[Tool.Eraser] && canvas.getActiveObject()) {
            this.props.removeSelectedObject()
        }
    }

    clearSelection = () => {
        let canvas = this._fc
        canvas.discardActiveObject()
        canvas.requestRenderAll()
    }

    /**
     * Remove all objects from the canvas
     */
    removeAllObjects = () => {
        let canvas = this._fc
        let objs = canvas.getObjects()
        objs.forEach((obj) => {
            this.removeObject(obj)
        })
        canvas.discardActiveObject()
        canvas.requestRenderAll()
    }

    /**
     * Remove selected object from the canvas
     */
    removeSelected = () => {
        let canvas = this._fc
        let activeObj = canvas.getActiveObject()
        if (activeObj) {
            let selected = []
            if (activeObj.type === "activeSelection") {
                activeObj.forEachObject((obj) => selected.push(obj))
            } else {
                selected.push(activeObj)
            }
            selected.forEach((obj) => {
                this.removeObject(obj)
            })
            canvas.discardActiveObject()
            canvas.requestRenderAll()
        }
    }

    removeObject = (obj) => {
        let canvas = this._fc
        obj.__removed = true
        let objState = obj?.toJSON()
        obj.__originalState = objState
        let state = JSON.stringify(objState)
        this._history.keep([obj, state, state])
        canvas.remove(obj)
    }

    copy = () => {
        let canvas = this._fc
        canvas.getActiveObject().clone((cloned) => (this._clipboard = cloned))
    }

    paste = () => {
        // clone again, so you can do multiple copies.
        this._clipboard.clone((clonedObj) => {
            let canvas = this._fc
            canvas.discardActiveObject()
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true
            })
            if (clonedObj.type === "activeSelection") {
                // active selection needs a reference to the canvas.
                clonedObj.canvas = canvas
                clonedObj.forEachObject((obj) => canvas.add(obj))
                clonedObj.setCoords()
            } else {
                canvas.add(clonedObj)
            }
            this._clipboard.top += 10
            this._clipboard.left += 10
            canvas.setActiveObject(clonedObj)
            canvas.requestRenderAll()
        })
    }
    /**
     * Sets the background from the dataUrl given
     *
     * @param dataUrl the dataUrl to be used as a background
     * @param options
     */
    setBackgroundFromDataUrl = (dataUrl, options = {}, fn = null) => {
        let canvas = this._fc
        let img = new Image()
        img.setAttribute("crossOrigin", "anonymous")
        const { stretched, stretchedX, stretchedY, ...fabricOptions } = options
        img.onload = () => {
            const imgObj = new fabric.Image(img)
            // if (stretched || stretchedX) imgObj.scaleToWidth(canvas.width)
            // if (stretched || stretchedY) imgObj.scaleToHeight(canvas.height)
            if (this.props.openBoard) {
                canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas))
            } else {
                canvas.setBackgroundImage(
                    imgObj,
                    () => {
                        // canvas.renderAll()
                        this._resize()
                        if (fn) fn()
                    }
                    // fabricOptions
                )
            }
        }
        img.src = dataUrl
    }

    removeBackgroundImage = () => {
        let canvas = this._fc
        canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas))
    }

    addText = (text, options = {}) => {
        let canvas = this._fc
        let iText = new fabric.IText(text, options)
        let opts = {
            left: (canvas.getWidth() - iText.width) * 0.5,
            top: (canvas.getHeight() - iText.height) * 0.5
        }
        Object.assign(options, opts)
        iText.set({
            left: options.left,
            top: options.top
        })
        canvas.add(iText)
    }

    callEvent = (e, eventFunction) => {
        if (this._selectedTool) eventFunction(e)
    }
    componentDidMount = () => {
        let { tool, value, undoSteps, defaultValue, backgroundColor } = this.props
        let canvas = (this._fc = new fabric.Canvas(
            this._canvas
            /*, {
              preserveObjectStacking: false,
              renderOnAddRemove: false,
              skipTargetFind: true
              }*/
        ))
        this._initTools(canvas)
        // set initial backgroundColor
        this._backgroundColor(backgroundColor)
        let selectedTool = this._tools[tool]
        if (selectedTool) selectedTool.configureCanvas(this.props)
        this._selectedTool = selectedTool
        // Control resize
        window.addEventListener("resize", this._resize, false)
        // Initialize History, with maximum number of undo steps
        this._history = new History(undoSteps)
        // Events binding
        canvas.on("object:added", (e) => this.callEvent(e, this._onObjectAdded))
        canvas.on("object:modified", (e) => this.callEvent(e, this._onObjectModified))
        canvas.on("object:removed", (e) => this.callEvent(e, this._onObjectRemoved))
        canvas.on("mouse:down", (e) => this.callEvent(e, this._onMouseDown))
        canvas.on("mouse:move", (e) => this.callEvent(e, this._onMouseMove))
        canvas.on("mouse:up", (e) => this.callEvent(e, this._onMouseUp))
        canvas.on("mouse:out", (e) => this.callEvent(e, this._onMouseOut))
        canvas.on("selection:created", (e) => this.callEvent(e, this.hasSelection))
        canvas.on("object:moving", (e) => this.callEvent(e, this._onObjectMoving))
        canvas.on("object:scaling", (e) => this.callEvent(e, this._onObjectScaling))
        canvas.on("object:rotating", (e) => this.callEvent(e, this._onObjectRotating))
        canvas.on("mouse:wheel", (e) => this.callEvent(e, this._wheelZoom))
        // IText Events fired on Adding Text
        // canvas.on("text:event:changed", console.log)
        // canvas.on("text:selection:changed", console.log)
        // canvas.on("text:editing:entered", console.log)
        // canvas.on("text:editing:exited", console.log)
        this.disableTouchScroll()
        // this._resize()
        // initialize canvas with controlled value if exists
        ;(value || defaultValue) && this.fromJSON(value || defaultValue)
        fabric.util.addListener(document.body, "keyup", this.onKeyUp)
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        let { tool } = this.props
        let selectedTool = this._tools[tool]
        if (nextProps.tool !== "text") {
            if (selectedTool.text) {
                selectedTool.text.exitEditing()
            }
        }

        selectedTool.configureCanvas(this.props)
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this._resize)
        fabric.util.removeListener(document.body, "keyup", this.onKeyUp)
    }

    componentDidUpdate = (prevProps, prevState) => {
        // if (this.state.scl !== prevState.scl) {
        //   this._resize()
        // }
        //this._resize()
        if (this.props.sidebarIsOpened !== this.state.sidebarState) {
            this._resize()
            this.state.sidebarState = this.props.sidebarIsOpened
        }
        if (this.props.tool !== prevProps.tool) {
            this._selectedTool = this._tools[this.props.tool]
            //Bring the cursor back to default if it is changed by a tool
            this._fc.defaultCursor = "default"
            if (this._selectedTool) {
                this._selectedTool.configureCanvas(this.props)
            }
        }
        if (this.props.backgroundColor !== prevProps.backgroundColor) {
            this._backgroundColor(this.props.backgroundColor)
        }
        if (this.props.value !== prevProps.value || (this.props.value && this.props.forceValue)) {
            this.fromJSON(this.props.value)
        }
        if (prevProps.textSize !== this.props.textSize) {
            this._selectedTool.configureCanvas(this.props)
        }
        if (this._selectedTool !== this._tools[Tool.Select]) {
            this._fc.discardActiveObject().renderAll()
        }
        if (prevProps.lineColor !== this.props.lineColor) {
            this._selectedTool.configureCanvas(this.props)
        }
        let canvas = this._fc

        if (this.props.tool !== prevProps.tool && prevProps.tool === "text") {
            if (canvas._objects.length > 0) {
                for (let i = canvas._objects.length - 1; i >= 0; i--) {
                    if (canvas._objects[i].text === "") {
                        canvas.remove(canvas._objects[i])
                    }
                }
            }
        }
    }
    render = () => {
        let { className, style, width, height } = this.props
        let canvasDivStyle = Object.assign(
            {},
            style ? style : {},
            width
                ? {
                      width: width
                  }
                : {},
            height
                ? {
                      height: height
                  }
                : {
                      height: "100%"
                  }
        )
        return (
            <div className={className} ref={(c) => (this._container = c)} style={canvasDivStyle}>
                <canvas id={uuid4()} ref={(c) => (this._canvas = c)}>
                    Sorry, Canvas HTML5 element is not supported by your browser :(
                </canvas>
            </div>
        )
    }
}

class Annotation {
    constructor(obj, x, y, width, height, vpW, vpH) {
        this.obj = obj
        this.xCoord = x
        this.yCoord = y
        this.widthVal = width
        this.heightVal = height
        this.viewportWidth = vpW
        this.viewportHeight = vpH
    }
}
export default SketchField
