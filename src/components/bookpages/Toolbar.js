import React, { forwardRef, useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import { ColorPicker } from "react-color-palette"
import "react-color-palette/lib/css/styles.css"
import { Trash2, Move, Plus, Minus, Layers, Widgets, Highlighter, Line, Pencil, ZoomIn, Edit } from "../icons"
import ToolbarButton from "./partials/ToolbarButton"
import Tools from "./sketch/tools/tools"
import FillColor from "./partials/FillColor"
import TextStrokeColor from "./partials/TextStrokeColor"
import useClickOutsideDetector from "../../_hooks/useClickOutsideDetector"
import TooltipContainer from "./partials/TooltipContainer"
import { DropdownButton } from "react-bootstrap"
import CircleIcon from "./ToolbarIcons/CircleIcon"
import FilledCircleIcon from "./ToolbarIcons/FilledCircleIcon"
import SquareIcon from "./ToolbarIcons/SquareIcon"
import FilledSquareIcon from "./ToolbarIcons/FilledSquareIcon"
import { boardActions, configActions } from "../../_actions"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getTranslatedText as t } from "../../_locale"
import TextIcon from "./ToolbarIcons/TextIcon"
import useViewport from "../../_hooks/useViewport"
import { utils } from "../../_helpers"
import { contentActions } from "../../_actions/content.actions"
import useBookPageViewport from "../../_hooks/useBookPageViewport"
import { useParams } from "react-router-dom"

const Toolbar = forwardRef((props, ref) => {
    const {
        pageId,
        lineWidth,
        lineColor,
        fillColor,
        selectedTool,
        onChangeTool,
        onChangeFillColor,
        onChangeLineColor,
        onChangeLineWidth,
        removeAll,
        redo,
        undo,
        zoomIn,
        zoomOut,
        sidebarIsOpen,
        textSize,
        setTextSize,
        setHighlighterLineWidth,
        highlighterLineWidth,
        contentTypes,
        isTimerOpen,
        setTimerOpen,
        isAssistantOpen,
        setTranslatorOpen,
        isTranslatorOpen,
        setImageSearcherOpen,
        isImageSearcherOpen,
        setShowCapture,
        resizableModalShow,
        isQuickNoteOpen,
        setQuickNoteOpen
    } = props

    const { topBarRef, bookPageRef } = ref

    const containerRef = useRef()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { width } = useViewport()
    const { pageWidth, pageHeight } = useBookPageViewport(bookPageRef)
    const { isEditModeOpen } = useSelector((state) => state.config)
    const { openSmartBoard, openBoard, boardType } = useSelector((state) => state.boards)
    const { contents, loading } = useSelector((state) => state.pageDetails)
    const { isDark } = useSelector((state) => state.theme)
    const { user } = useSelector((state) => state.users)
    const { bookmarked } = useSelector((state) => state.bookmarks)
    const [fillColorPickerOpen, setFillColorPickerOpen] = useState(false)
    const [lineColorPickerOpen, setLineColorPickerOpen] = useState(false)
    const [lineWidthPickerOpen, setLineWidthPickerOpen] = useState(false)
    const [drawDropdownOpen, setDrawDropdownOpen] = useState(false)
    const [contentsDropdownOpen, setContentsDropdownOpen] = useState(false)
    const [zoomDropdownOpen, setZoomDropdownOpen] = useState(false)
    const [trashDropdownOpen, setTrashDropdownOpen] = useState(false)
    const [widgetDropdownOpen, setWidgetDropdownOpen] = useState(false)
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
    const [screenPosition, setScreenPosition] = useState({
        screenX: 0,
        screenY: 0
    })
    const [dragEvent, setDragEvent] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState("right")
    const [resizeInput, setResizeInput] = useState("")
    const [textDropdown, setTextDropdown] = useState(false)
    const [visibilityTooltip, setVisibilityTooltip] = useState(true)
    const [clicked, setClicked] = useState(false)

    const pageHasQuickNote =
        utils.arrayHasLength(contents) && contents.find((content) => content.content_type_id === 10)

    const setPickersClose = () => {
        setLineColorPickerOpen(false)
        setFillColorPickerOpen(false)
        setLineWidthPickerOpen(false)
    }
    const dropdownsClose = () => {
        setTrashDropdownOpen(false)
        setDrawDropdownOpen(false)
        setZoomDropdownOpen(false)
        setPickersClose()
        setTextDropdown(false)
        setVisibilityTooltip(false)
    }

    useClickOutsideDetector(containerRef, dropdownsClose)

    const drawIcons = {
        [Tools.Pencil]: <Pencil />,
        [Tools.Highlighter]: <Highlighter />,
        [Tools.Line]: <Line />,
        [Tools.EmptyCircle]: <CircleIcon />,
        [Tools.Circle]: <FilledCircleIcon />,
        [Tools.EmptyRectangle]: <SquareIcon />,
        [Tools.Rectangle]: <FilledSquareIcon />
    }

    useEffect(() => {
        if (width > 1024) {
            if (sidebarIsOpen) {
                if (screenPosition.x < width && screenPosition.x > width - 250) {
                    setDeltaPosition({ x: width - 350, y: 0 })
                }
            } else {
                if (deltaPosition.x < 0) {
                    setDeltaPosition({ x: 10, y: 0 })
                }
            }
        } else {
            setDeltaPosition({ x: 0, y: 0 })
        }
    }, [sidebarIsOpen])

    const handleSmartboard = () => {
        dispatch(boardActions.setSmartBoardOpen())
        if (!openSmartBoard) {
            toast.success(t("smartboardOpen"))
            if (deltaPosition.x < 0) {
                setDeltaPosition({ x: 10, y: 0 })
            }
        } else {
            toast.warn(t("smartboardClosed"))
            if (screenPosition.x < width && screenPosition.x > width - 250) {
                setDeltaPosition({ x: width - 350, y: 0 })
            }
        }
        if (openBoard) {
            toast.warn(t("boardModeClosed"))
        }
    }

    const setBoardOpen = () => {
        dispatch(boardActions.setBoardOpen())
        {
            if (openBoard) {
                toast.warn(t("boardModeClosed"))
            } else {
                toast.success(t("boardModeOpen"))
            }
            if (openSmartBoard) {
                toast.warn(t("smartboardClosed"))
            }
        }
    }

    const toggleBoard = () => {
        dispatch(boardActions.toggleBoard())
    }

    const handleDrag = (e, ui) => {
        const { x, y } = deltaPosition
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY
        })
        if (width - deltaPosition.x < width / 2 + 30) {
            setDropdownPosition("left")
        } else {
            setDropdownPosition("right")
        }
        if (e.screenX && e.screenY) {
            setScreenPosition({ x: e.screenX, y: e.screenY })
        } else {
            if (e.touches) {
                setScreenPosition({
                    x: e.touches[0].screenX,
                    y: e.touches[0].screenX
                })
            }
        }
    }
    setTimeout(() => {
        if (!visibilityTooltip) {
            setVisibilityTooltip(true)
        }
        if (clicked) {
            setClicked(false)
        }
    }, 100)

    const tooltipFalse = () => {
        if (dragEvent || !visibilityTooltip || clicked) {
            return false
        } else {
            return
        }
    }
    const handleUserKeyPress = (event) => {
        if (isAssistantOpen) return
        if (isTranslatorOpen) return
        if (isImageSearcherOpen) return
        if (resizableModalShow) return
        if (isQuickNoteOpen) return
        var is_modal_open = document.querySelectorAll(".fade.modal_text_color.modal.show")
        const { keyCode } = event
        if (!keyCode) return
        if (selectedTool !== Tools.Text) {
            if (is_modal_open.length === 0) {
                if (keyCode === 66) {
                    handleSmartboard()
                }
            }
        }

        if (keyCode === 107) {
            zoomIn()
        }
        if (keyCode === 109) {
            zoomOut()
        }

        if (trashDropdownOpen || zoomDropdownOpen || drawDropdownOpen) {
            if (
                keyCode === 27 || //esc
                keyCode === 83 || //s
                keyCode === 80 || //p
                keyCode === 72 || //h
                keyCode === 76 || //l
                keyCode === 84 || //t
                keyCode === 67 || //c
                keyCode === 82 || //r
                keyCode === 107 || //+
                keyCode === 109 //-
            ) {
                event.target.blur()
                setTrashDropdownOpen(false)
                setDrawDropdownOpen(false)
                setZoomDropdownOpen(false)
            }
        }
    }

    useEffect(() => {
        containerRef.current.addEventListener("keydown", handleUserKeyPress)
        window.addEventListener("keydown", handleUserKeyPress)
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress)
        }
    }, [handleUserKeyPress])

    useEffect(() => {
        if (selectedTool === Tools.Select || selectedTool === Tools.Text) {
            setPickersClose()
            setDrawDropdownOpen(false)
            setZoomDropdownOpen(false)
            setTrashDropdownOpen(false)
        }
        if (selectedTool === Tools.Text) {
            setTextDropdown(true)
        }
    }, [selectedTool])

    useEffect(() => {
        if (textDropdown) {
            if (resizeInput === "") {
                if (textSize < 10) {
                    setTextSize(Number(26))
                }
            }
        } else if (textSize == resizeInput) {
            setResizeInput("")
        }
        if (resizeInput !== "") {
            setTextSize(Number(resizeInput))
        }
    }, [textDropdown, resizeInput])

    return (
        <Draggable
            handle=".drag"
            position={deltaPosition}
            defaultPosition={screenPosition}
            onDrag={handleDrag}
            onStart={() => setDragEvent(true)}
            onStop={() => setDragEvent(false)}
        >
            <div className="toolbar-main-container">
                <div className={`shadow rounded single-toolbar rounded-circle`}>
                    <div className="toolbar">
                        <ul
                            className={`buttons text-center d-flex flex-column align-items-center justify-content-center `}
                        >
                            <TooltipContainer
                                placement={dropdownPosition}
                                name={t("moveToolbar")}
                                tooltipFalse={tooltipFalse()}
                            >
                                <div className="toolbar-button d-flex align-items-center justify-content-center rounded-circle drag">
                                    <Move />
                                </div>
                            </TooltipContainer>
                        </ul>
                    </div>
                </div>
                <div className={`shadow rounded-12 single-toolbar `}>
                    <div className="toolbar">
                        <div
                            className={`toolbar-button text-center d-flex flex-column align-items-center justify-content-center position-relative`}
                            onClick={() => setQuickNoteOpen(!isQuickNoteOpen)}
                        >
                            <TooltipContainer
                                placement={dropdownPosition}
                                name={t("quick_note")}
                                tooltipFalse={tooltipFalse()}
                            >
                                <div
                                    className="cursor-pointer d-flex align-items-center justify-content-center"
                                    data-tud="quick_note"
                                >
                                    {pageHasQuickNote && pageHasQuickNote.loading ? (
                                        <div
                                            className="spinner-border position-absolute text-danger spinner-border-sm"
                                            role="status"
                                            style={{ width: "10px", height: "10px", right: "0", top: "0" }}
                                        />
                                    ) : (
                                        pageHasQuickNote && (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div
                                                    className="rounded-circle bg-danger position-absolute text-white d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "10px",
                                                        height: "10px",
                                                        right: "0",
                                                        top: "0",
                                                        fontSize: "10px",
                                                        fontWeight: "bold",
                                                        boxSizing: "border-box"
                                                    }}
                                                />
                                            </div>
                                        )
                                    )}

                                    <Edit
                                        color={isDark ? "var(--c-font-dark)" : "var(--c-font-primary)"}
                                        width="17"
                                        height="17"
                                    />
                                </div>
                            </TooltipContainer>
                        </div>
                    </div>
                </div>

                <div ref={containerRef} className={`toolbar-container shadow rounded`}>
                    <div className="toolbar">
                        <ul
                            className={`buttons text-center d-flex flex-column align-items-center justify-content-center`}
                        >
                            <ToolbarButton
                                image="selector"
                                name={t("select")}
                                icon="S"
                                active={selectedTool === Tools.Select}
                                onButtonClick={() => {
                                    onChangeTool(Tools.Select)
                                }}
                                dropdownPosition={dropdownPosition}
                                tooltipFalse={tooltipFalse()}
                            />
                            <div data-tut="Pencil-Highlighter-Line">
                                {/* DRAW DROPDOWN */}
                                <TooltipContainer placement={"top"} name={t("draw")} tooltipFalse={tooltipFalse()}>
                                    <DropdownButton
                                        id={`dropdown-group-1${
                                            drawIcons.hasOwnProperty(selectedTool) ? "-active" : ""
                                        }`}
                                        drop={dropdownPosition}
                                        variant="secondary"
                                        title={
                                            drawIcons.hasOwnProperty(selectedTool)
                                                ? drawIcons[selectedTool]
                                                : drawIcons[Tools.Pencil]
                                        }
                                        onToggle={() => {
                                            setDrawDropdownOpen(!drawDropdownOpen)

                                            !drawDropdownOpen &&
                                                onChangeTool(
                                                    drawIcons.hasOwnProperty(selectedTool) ? selectedTool : Tools.Pencil
                                                )
                                        }}
                                        show={drawDropdownOpen}
                                    >
                                        <ToolbarButton
                                            image="pencil-1"
                                            name={t("pencil")}
                                            icon="P"
                                            active={selectedTool === Tools.Pencil}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.Pencil)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="highlighter"
                                            name={t("highlighter")}
                                            icon="H"
                                            active={selectedTool === Tools.Highlighter}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.Highlighter)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="lineIcon"
                                            name={t("line")}
                                            icon="L"
                                            active={selectedTool === Tools.Line}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.Line)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            show={textDropdown}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="circle"
                                            name={t("emptyCircle")}
                                            icon="C"
                                            active={selectedTool === Tools.EmptyCircle}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.EmptyCircle)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="circleFilled"
                                            name={t("circle")}
                                            active={selectedTool === Tools.Circle}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.Circle)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="square"
                                            name={t("emptyRectangle")}
                                            icon="R"
                                            active={selectedTool === Tools.EmptyRectangle}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.EmptyRectangle)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="squareFilled"
                                            name={t("rectangle")}
                                            active={selectedTool === Tools.Rectangle}
                                            onButtonClick={() => {
                                                onChangeTool(Tools.Rectangle)
                                                setPickersClose()
                                                setDrawDropdownOpen(!drawDropdownOpen)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <TextStrokeColor
                                            color={lineColor.hex}
                                            onButtonClick={() => {
                                                setLineColorPickerOpen(!lineColorPickerOpen)
                                                setFillColorPickerOpen(false)
                                                setLineWidthPickerOpen(false)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <FillColor
                                            color={fillColor.hex}
                                            onButtonClick={() => {
                                                setFillColorPickerOpen(!fillColorPickerOpen)
                                                setLineColorPickerOpen(false)
                                                setLineWidthPickerOpen(false)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                        <ToolbarButton
                                            image="lineSize"
                                            name={t("lineSize")}
                                            rotate="180deg"
                                            onButtonClick={() => {
                                                setLineWidthPickerOpen(!lineWidthPickerOpen)
                                                setLineColorPickerOpen(false)
                                                setFillColorPickerOpen(false)
                                                setClicked(true)
                                            }}
                                            dropdownPosition={dropdownPosition}
                                            tooltipFalse={tooltipFalse()}
                                        />
                                    </DropdownButton>
                                </TooltipContainer>
                            </div>
                            {/* TEXT DROPDOWN */}
                            <TooltipContainer placement={"top"} name={t("text")} tooltipFalse={tooltipFalse()}>
                                <DropdownButton
                                    id={`dropdown-group-2${selectedTool === Tools.Text ? "-active" : ""}`}
                                    drop={dropdownPosition}
                                    variant="secondary"
                                    title={<TextIcon />}
                                    onToggle={() => {
                                        setTextDropdown(!textDropdown)
                                        {
                                            !textDropdown && onChangeTool(Tools.Text)
                                        }
                                    }}
                                    show={textDropdown}
                                    data-tut="Text"
                                >
                                    <div>
                                        <div
                                            className="toolbar-button d-flex align-items-center justify-content-center text-resize"
                                            onClick={() => {
                                                setTextSize(textSize + 1)
                                                onChangeTool(Tools.Text)
                                            }}
                                        >
                                            <Plus />
                                        </div>
                                        <input
                                            className="toolbar-button text-center border-0 text-resize"
                                            placeholder={textSize}
                                            value={resizeInput}
                                            onChange={(e) => setResizeInput(e.target.value)}
                                            type="text"
                                            onKeyDown={(e) =>
                                                e.key === "Enter" &&
                                                e.target.value !== "" &&
                                                textSize == resizeInput &&
                                                setResizeInput("")
                                            }
                                        />
                                        <div
                                            className="toolbar-button d-flex align-items-center justify-content-center text-resize"
                                            onClick={() => {
                                                setTextSize(textSize - 1)
                                                onChangeTool(Tools.Text)
                                            }}
                                        >
                                            <Minus />
                                        </div>
                                    </div>
                                </DropdownButton>
                            </TooltipContainer>

                            {/* ZOOM DROPDOWN */}
                            <TooltipContainer placement={"top"} name={t("zoom")} tooltipFalse={tooltipFalse()}>
                                <DropdownButton
                                    id={`dropdown-group-2${zoomDropdownOpen ? "-active" : ""}`}
                                    drop={dropdownPosition}
                                    variant="secondary"
                                    title={<ZoomIn />}
                                    onToggle={() => setZoomDropdownOpen(!zoomDropdownOpen)}
                                    show={zoomDropdownOpen}
                                    data-tut="Zoom"
                                >
                                    <ToolbarButton
                                        image="zoom-in"
                                        name={t("zoomIn")}
                                        icon="+"
                                        onButtonClick={() => {
                                            zoomIn()
                                        }}
                                        dropdownPosition={dropdownPosition}
                                    />
                                    <ToolbarButton
                                        image="zoom-out"
                                        name={t("zoomOut")}
                                        icon="-"
                                        onButtonClick={() => {
                                            zoomOut()
                                        }}
                                        dropdownPosition={dropdownPosition}
                                    />
                                </DropdownButton>
                            </TooltipContainer>

                            <ToolbarButton
                                image="undo"
                                name={t("undo")}
                                onButtonClick={() => {
                                    undo()
                                    setPickersClose()
                                }}
                                dropdownPosition={dropdownPosition}
                                tooltipFalse={tooltipFalse()}
                                data_tut="Undo"
                            />
                            <ToolbarButton
                                image="redo"
                                name={t("redo")}
                                onButtonClick={() => {
                                    redo()
                                    setPickersClose()
                                }}
                                dropdownPosition={dropdownPosition}
                                tooltipFalse={tooltipFalse()}
                                data_tut="Redo"
                            />

                            {/* DELETE DROPDOWN */}
                            <TooltipContainer placement={"top"} name={t("delete")} tooltipFalse={tooltipFalse()}>
                                <DropdownButton
                                    id={`dropdown-group-2${trashDropdownOpen ? "-active" : ""}`}
                                    drop={dropdownPosition}
                                    variant="secondary"
                                    title={<Trash2 />}
                                    onToggle={() => setTrashDropdownOpen(!trashDropdownOpen)}
                                    show={trashDropdownOpen}
                                    data-tut="Trash"
                                >
                                    <ToolbarButton
                                        image="eraserIcon"
                                        name={t("deleteSelectedItem")}
                                        onButtonClick={() => {
                                            onChangeTool(Tools.Eraser)
                                            setTrashDropdownOpen(false)
                                            setClicked(true)
                                        }}
                                        icon="⌫"
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />
                                    <ToolbarButton
                                        image="trashIcon"
                                        name={t("delete_all")}
                                        icon="Del"
                                        onButtonClick={() => {
                                            removeAll()
                                            setTrashDropdownOpen(false)
                                            setClicked(true)
                                        }}
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />
                                </DropdownButton>
                            </TooltipContainer>

                            {/* COLOR PICKERS */}
                            <div
                                className={`color-picker ${!fillColorPickerOpen ? "d-none" : ""}${
                                    dropdownPosition === "left" ? dropdownPosition : "right"
                                }`}
                            >
                                {fillColorPickerOpen && (
                                    <ColorPicker
                                        width={450}
                                        height={220}
                                        color={fillColor}
                                        onChange={onChangeFillColor}
                                        hideHSV
                                    />
                                )}
                            </div>

                            <div
                                className={`color-picker ${!lineColorPickerOpen ? "d-none" : ""}${
                                    dropdownPosition === "left" ? dropdownPosition : "right"
                                }`}
                            >
                                {lineColorPickerOpen && (
                                    <ColorPicker
                                        width={450}
                                        height={220}
                                        color={lineColor}
                                        onChange={onChangeLineColor}
                                        hideHSV
                                    />
                                )}
                            </div>

                            <div
                                className={`lineWidth-picker ${!lineWidthPickerOpen ? "d-none" : ""}${
                                    dropdownPosition === "left" ? dropdownPosition : "right"
                                }`}
                            >
                                {lineWidthPickerOpen && (
                                    <>
                                        <span
                                            id="lineWidth-circle"
                                            className={`lineWidth-circle ${
                                                dropdownPosition === "left" ? dropdownPosition : "right"
                                            }`}
                                            style={{
                                                width: `${
                                                    selectedTool === Tools.Pencil ? lineWidth : highlighterLineWidth
                                                }px`,
                                                height: `${
                                                    selectedTool === Tools.Pencil ? lineWidth : highlighterLineWidth
                                                }px`,
                                                background: `${lineColor.hex}`,
                                                bottom: `${
                                                    selectedTool === Tools.Pencil
                                                        ? (lineWidth / 45) * 175
                                                        : (highlighterLineWidth / 45) * 175
                                                }px`
                                            }}
                                        />
                                        <input
                                            id="lineWidth-range"
                                            type="range"
                                            min="2"
                                            max="45"
                                            value={selectedTool === Tools.Pencil ? lineWidth : highlighterLineWidth}
                                            step="1"
                                            orient="vertical"
                                            className="lineWidth-range cursor-pointer"
                                            onChange={(e) => {
                                                if (selectedTool === Tools.Pencil) {
                                                    onChangeLineWidth(e.target.value)
                                                } else {
                                                    setHighlighterLineWidth(e.target.value)
                                                }
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
                {/* 2. TOOLBAR */}
                <div className={`shadow single-toolbar rounded-12`}>
                    <div className="toolbar">
                        <ul
                            className={`buttons text-center d-flex flex-column align-items-center justify-content-center `}
                        >
                            {/* CONTENTS DROPDOWN */}

                            {utils.objectHasLength(user) && utils.userIsNotStudent(user) && (
                                <TooltipContainer placement={"top"} name={t("contents")} tooltipFalse={tooltipFalse()}>
                                    <DropdownButton
                                        id={`dropdown-group-2${contentsDropdownOpen ? "-active" : ""}`}
                                        className="content-dropdown"
                                        drop={dropdownPosition}
                                        title={<Layers width={17} height={17} />}
                                        onToggle={() => {
                                            setContentsDropdownOpen(!contentsDropdownOpen)
                                            setPickersClose()
                                        }}
                                        show={contentsDropdownOpen}
                                        data-tut="Contents"
                                    >
                                        {contentTypes
                                            .filter((content) => content.id !== 10)
                                            .map((content, index) => (
                                                <ToolbarButton
                                                    key={index}
                                                    name={utils.getContentNameByUser(content.name, user)}
                                                    color_class={content.color_class}
                                                    onButtonClick={() => {
                                                        let createdAsStatically = true
                                                        let isUserStudent =
                                                            utils.objectHasLength(user) && !utils.userIsNotStudent(user)

                                                        let { top, left } = utils.createContentPercentage(
                                                            topBarRef,
                                                            pageHeight,
                                                            pageWidth,
                                                            contents
                                                        )

                                                        dispatch(
                                                            contentActions.store(
                                                                pageId,
                                                                content,
                                                                top,
                                                                left,
                                                                createdAsStatically,
                                                                !utils.pageHasBookmark(bookmarked, pageId, id) &&
                                                                    isUserStudent &&
                                                                    id
                                                            )
                                                        )

                                                        setContentsDropdownOpen(!contentsDropdownOpen)
                                                        setLineWidthPickerOpen(false)
                                                        setLineColorPickerOpen(false)
                                                        setFillColorPickerOpen(false)
                                                        setClicked(true)
                                                        dispatch(configActions.toggleEditMode(true))
                                                    }}
                                                    dropdownPosition={dropdownPosition}
                                                    tooltipFalse={tooltipFalse()}
                                                >
                                                    {utils.getContentTypeIcon(content.id, "17px", "17px")}
                                                </ToolbarButton>
                                            ))}
                                    </DropdownButton>
                                </TooltipContainer>
                            )}
                            <TooltipContainer placement={"top"} name={t("widgets")} tooltipFalse={tooltipFalse()}>
                                <DropdownButton
                                    id={`dropdown-group-2${widgetDropdownOpen ? "-active" : ""}`}
                                    className="widget-dropdown"
                                    drop={dropdownPosition}
                                    variant="secondary"
                                    title={<Widgets />}
                                    onToggle={() => {
                                        setPickersClose(), setWidgetDropdownOpen(!widgetDropdownOpen)
                                    }}
                                    show={widgetDropdownOpen}
                                    data-tut="Widgets"
                                >
                                    <ToolbarButton
                                        image="clock"
                                        name={t("timer")}
                                        onButtonClick={() => {
                                            setWidgetDropdownOpen(false)
                                            setTimerOpen(!isTimerOpen)
                                        }}
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />

                                    <ToolbarButton
                                        image="translate"
                                        name={t("translation")}
                                        onButtonClick={() => {
                                            setWidgetDropdownOpen(false)
                                            setTranslatorOpen(!isTranslatorOpen)
                                        }}
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />

                                    <ToolbarButton
                                        image="image-searcher"
                                        name={t("imageSearcher")}
                                        onButtonClick={() => {
                                            setWidgetDropdownOpen(false)
                                            setImageSearcherOpen(!isImageSearcherOpen)
                                        }}
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />

                                    <ToolbarButton
                                        image="capture"
                                        name={t("capture")}
                                        onButtonClick={() => {
                                            setWidgetDropdownOpen(false)
                                            setShowCapture((prevState) => !prevState)
                                        }}
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />
                                </DropdownButton>
                            </TooltipContainer>
                            {utils.userIsNotStudent(user) && (
                                <TooltipContainer
                                    placement={"top"}
                                    name={t("EduMentor AI")}
                                    tooltipFalse={tooltipFalse()}
                                >
                                    <ToolbarButton
                                        image="chatGPT"
                                        name={"EduMentor AI"}
                                        onButtonClick={() => {
                                            window.location.href = "/edumentor"
                                        }}
                                        dropdownPosition={dropdownPosition}
                                        tooltipFalse={tooltipFalse()}
                                    />
                                </TooltipContainer>
                            )}
                        </ul>
                    </div>
                </div>
                {/* 3. TOOLBAR */}
                <div className={`shadow single-toolbar rounded-12`}>
                    <div className="toolbar">
                        <ul
                            className={`buttons text-center d-flex flex-column align-items-center justify-content-center `}
                        >
                            {width >= 768 && (
                                <ToolbarButton
                                    image={!openSmartBoard ? "blackboard-empty" : "blackboard-filled"}
                                    name={t("smartboardMode")}
                                    active={openSmartBoard}
                                    onButtonClick={() => {
                                        handleSmartboard()
                                    }}
                                    icon="B"
                                    dropdownPosition={dropdownPosition}
                                    data_tut="Smartboard"
                                />
                            )}
                            <>
                                <ToolbarButton
                                    image={"whiteBoard"}
                                    name={t("boardMode")}
                                    active={openBoard}
                                    onButtonClick={() => {
                                        setBoardOpen()
                                    }}
                                    dropdownPosition={dropdownPosition}
                                    data_tut="board"
                                />
                                {openBoard && (
                                    <div>
                                        {boardType === "whiteBoard" ? (
                                            <ToolbarButton
                                                image={isDark ? "lightbulb" : "lightbulb-fill"}
                                                name={t("blackMode")}
                                                onButtonClick={() => {
                                                    toggleBoard()
                                                }}
                                                dropdownPosition={dropdownPosition}
                                                data_tut="board"
                                            />
                                        ) : (
                                            <ToolbarButton
                                                image={isDark ? "lightbulb-fill" : "lightbulb"}
                                                name={t("whiteMode")}
                                                onButtonClick={() => {
                                                    toggleBoard()
                                                }}
                                                dropdownPosition={dropdownPosition}
                                                data_tut="board"
                                            />
                                        )}
                                    </div>
                                )}
                            </>
                        </ul>
                    </div>
                </div>
            </div>
        </Draggable>
    )
})

export default Toolbar
