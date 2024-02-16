import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "react-bootstrap"
import { utils } from "../../../_helpers"
import Draggable from "react-draggable"
import { contentActions } from "../../../_actions/content.actions"
import { useState } from "react"
import { Move } from "../../icons"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { configActions } from "../../../_actions"

const ContentButton = ({
    content,
    shownContent,
    setShownContent,
    resizableModalShow,
    setResizableModalShow,
    pageId,
    isEditable,
    pageHeight,
    pageWidth
}) => {
    const dispatch = useDispatch()
    const { openBoard } = useSelector((state) => state.boards)
    const [dragging, setDragging] = useState(0) // 0 = not dragging, 1 = dragging, 2 = dragged & stopped
    const [dragPoints, setDragPoints] = useState({ x: 0, y: 0 })
    const { isEditModeOpen } = useSelector((state) => state.config)
    const [initialPosition, setInitialPosition] = useState(null)
    const { content_type } = content
    const handleClick = (e) => {
        if (dragging !== 0) {
            return
        }

        e?.stopPropagation()
        setShownContent(content.id)
        if (content.content_type_id !== 9) {
            if (shownContent === content.id) {
                setResizableModalShow(!resizableModalShow)
            } else {
                setResizableModalShow(true)
            }
        }
        // else {
        //     history.push(
        //         `/books/${id}/pages/${pageOrder}/content/${content.id}/h5p/${content.hh5p_content_id ?? "new"}`
        //     )
        // }
    }

    useEffect(() => {
        if (content && !initialPosition) {
            //since args values being calculated as per initial position even every movement
            //set initial content position once when page is loaded and if not already set
            setInitialPosition({ x: +content.pivot.left, y: +content.pivot.top })
        }
    }, [content, initialPosition])

    const onDrop = (...args) => {
        if (Math.abs(dragPoints.x - args[0].x + dragPoints.y - args[0].y) >= 10) {
            let initialYPixel = Math.round((initialPosition.y / 100) * pageHeight)
            let initialXPixel = Math.round((initialPosition.x / 100) * pageWidth)
            let movedYPosition = initialYPixel + args[1].y
            let movedXPosition = initialXPixel + args[1].x
            let newTop = Math.abs(utils.calcLeftPercentage(movedYPosition, pageHeight))
            let newLeft = Math.abs(utils.calcLeftPercentage(movedXPosition, pageWidth))
            dispatch(contentActions.update(pageId, content.id, newTop, newLeft, null, content))
        }
    }

    const onDrag = (e) => {
        setDragging(1)
    }

    const onStop = (...args) => {
        if (dragging === 0) {
            handleClick()
            onDrop(...args)
            setDragging(2)
        }
    }

    useEffect(() => {
        content.isAddingChatbotContent && handleClick()
    }, [content])

    return (
        <Draggable
            disabled={!isEditable}
            handle=".drag"
            bounds="parent"
            onStart={(e) => {
                setDragPoints({ x: e.clientX, y: e.clientY }), setDragging(0)
            }}
            onDrag={onDrag}
            onStop={onStop}
        >
            <div
                className={`content-container d-flex flex-row alig-items-center  content_${content.id} ${
                    isEditModeOpen ? "drag" : ""
                }`}
                style={{
                    left: `${content.left ? "" : content.pivot.left}%`,
                    top: `${content.top ? "" : content.pivot.top}%`
                }}
            >
                {!openBoard && (
                    <Button
                        onClick={handleClick}
                        variant={
                            !isEditModeOpen
                                ? content_type.color_class
                                : isEditable
                                ? content_type.color_class
                                : "secondary"
                        }
                        className="btn-round btn-component"
                        size="sm"
                    >
                        {utils.getContentTypeIcon(content_type.id, "14px", "14px")}
                    </Button>
                )}
                <div>
                    {content.loading && (
                        <span
                            className="spinner-border text-danger spinner-border-sm mt-1 ml-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    )}
                </div>
            </div>
        </Draggable>
    )
}

export default ContentButton
