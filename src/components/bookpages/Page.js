import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Spinner, Container } from "react-bootstrap"
import { useColor } from "react-color-palette"
import Content from "./partials/Content"
import Topbar from "./Topbar"
import Toolbar from "./Toolbar"
import Sketch from "./sketch/Sketch"
import Tools from "./sketch/tools/tools"
import { useDispatch } from "react-redux"
import { scaleActions, userActions } from "../../_actions"
import Bookmark from "../partials/Bookmark"
import * as ContextMenu from "@radix-ui/react-context-menu"
import { getTranslatedText as t } from "../../_locale"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Layers } from "../icons"
import { contentTypes, utils } from "../../_helpers"
import { contentActions } from "../../_actions/content.actions"
import useBookPageViewport from "../../_hooks/useBookPageViewport"
import Timer from "./widgets/timer/Timer"
import Feedback from "../partials/Feedback"
import ChatBot from "./partials/ChatBot"
import Translator from "./widgets/translator/Translator"
import ImageSearcher from "./widgets/image/ImageSearcher"
import Capture from "./widgets/capture/Capture"
import QuickNote from "./QuickNote"
import useIndexedDb from "../../_hooks/useIndexedDb"

const Page = ({ sidebarIsOpen, toggleSidebar, pageOrder, bookId, history, handleBookmark, openTour, isTourOpen }) => {
    const dispatch = useDispatch()
    const _sketchField = useRef()
    const bookPageRef = useRef()
    const topBarRef = useRef()
    const { pageWidth, pageHeight } = useBookPageViewport(bookPageRef)

    const { isEditModeOpen } = useSelector((state) => state.config)
    const { contents } = useSelector((state) => state.pageDetails)
    const pageDetails = useSelector((state) => state.pageDetails)
    const { scaleFactor, scaleCss } = useSelector((state) => state.scale)
    const { book } = useSelector((state) => state.activeBook)
    const { page } = useSelector((state) => state.activePage)
    const { loggedIn, user } = useSelector((state) => state.users)
    const { openBoard, boardType } = useSelector((state) => state.boards)
    const [isAssistantOpen, setAssistantOpen] = useState(false)
    const [isImageSearcherOpen, setImageSearcherOpen] = useState(false)
    const [selectedTool, setSelectedTool] = useState(Tools.Select)
    const [lineWidth, setLineWidth] = useState(3)
    const [highlighterLineWidth, setHighlighterLineWidth] = useState(20)
    const [lineColor, setLineColor] = useColor("hex", "#ff0000")
    const [fillColor, setFillColor] = useColor("hex", "#ffff00")
    const [shownContent, setShownContent] = useState(0)
    const [textSize, setTextSize] = useState(26)
    const [clickedPosition, setClickedPosition] = useState()
    const [contentEditModal, setContentEditModal] = useState(false)
    const [resizableModalShow, setResizableModalShow] = useState(false)
    const [fullSizeShow, setFullSizeShow] = useState(false)
    const [isTimerOpen, setTimerOpen] = useState(false)
    const [isTranslatorOpen, setTranslatorOpen] = useState(false)
    const [feedbackModalIsOpen, setFeedbackModalOpen] = useState(false)
    const [showCapture, setShowCapture] = useState(false)
    const [isQuickNoteOpen, setQuickNoteOpen] = useState(false)

    const pageHasQuickNote =
        utils.arrayHasLength(contents) && contents.find((content) => content.content_type_id === 10)

    const existingContents = []

    const handleRightClick = (event) => {
        let rect = event.target.getBoundingClientRect()
        setClickedPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    }

    const pageId = useMemo(() => {
        return page && page.id
    }, [page])

    const initExistingContents = () => {
        const { loading, error, contents, contentFilter } = pageDetails

        if (error) {
            history.push("/")
        } else if (contents) {
            if (contentFilter) {
                contents.forEach((content) => {
                    if (contentFilter[content.creator]) {
                        if (content.content_type_id !== 10) {
                            existingContents.push(
                                <Content
                                    content={content}
                                    key={content.id}
                                    shownContent={shownContent}
                                    setShownContent={setShownContent}
                                    sidebarIsOpen={sidebarIsOpen}
                                    pageWidth={pageWidth}
                                    pageHeight={pageHeight}
                                    pageId={pageId}
                                    isEditable={content.editable && content.created_by === user.id}
                                    resizableModalShow={resizableModalShow}
                                    setResizableModalShow={setResizableModalShow}
                                    fullSizeShow={fullSizeShow}
                                    setFullSizeShow={setFullSizeShow}
                                />
                            )
                        }
                    }
                })
            }
        }
    }
    initExistingContents()

    useEffect(() => {
        loggedIn === null && Object.keys(user).length === 0 && dispatch(userActions.profile())
    }, [loggedIn, user])

    const onChangeTool = useCallback((tool) => {
        setSelectedTool(tool)
    }, [])

    const lastPage = () => {
        if (book && book.book_pages) {
            history.push(`${book.book_pages[book.book_pages.length - 1].page_order}`)
        }
    }
    const firstPage = () => {
        if (book && book.book_pages) {
            history.push(`${book.book_pages[0].page_order}`)
        }
    }

    const removeSelected = useCallback(() => {
        _sketchField.current.removeSelected()
        let annotations = _sketchField.current?.toJSON()
        if (_sketchField.current && !openBoard) {
            if (annotations.objects.length === 0) {
                useIndexedDb().deleteAnnotation("bookpageAnnotations", bookId, page.id)
            } else {
                useIndexedDb().addAnnotation("bookpageAnnotations", bookId, page.id, annotations)
            }
        }
        if (openBoard) {
            useIndexedDb().addAnnotation(`${boardType}Annotations`, annotations)
        }
    }, [openBoard, boardType, page])

    const removeAll = useCallback(() => {
        _sketchField.current.removeAllObjects()
        if (!openBoard) {
            useIndexedDb().deleteAnnotation("bookpageAnnotations", bookId, page.id)
        }
        if (openBoard) {
            useIndexedDb().deleteAnnotation(`${boardType}Annotations`)
        }
    }, [openBoard, boardType, page])

    const redo = useCallback(() => {
        if (_sketchField.current.canRedo()) {
            _sketchField.current.redo()
        }
    }, [_sketchField.current])

    const undo = useCallback(() => {
        if (_sketchField.current.canUndo()) {
            _sketchField.current.undo()
        } else {
            _sketchField.current._resize()
        }
    }, [_sketchField.current])

    const zoomIn = useCallback(() => {
        const isPageHorizontal = _sketchField.current._canvas.width > _sketchField.current._canvas.height
        dispatch(scaleActions.setScalePageUp(scaleFactor, isPageHorizontal))
    }, [scaleFactor])

    const zoomOut = useCallback(() => {
        const isPageHorizontal = _sketchField.current._canvas.width > _sketchField.current._canvas.height
        dispatch(scaleActions.setScalePageDown(scaleFactor, isPageHorizontal))
    }, [scaleFactor])

    const ContextMenuContent = () => {
        return (
            <ContextMenu.Content className="content m-0">
                <ContextMenu.Item className="item contentItem" onClick={() => undo()}>
                    {t("undo")}
                    <img src={`/assets/img/toolbar/undo.svg`} alt="Tool" />
                </ContextMenu.Item>
                <ContextMenu.Item className="item contentItem" onClick={() => redo()}>
                    {t("redo")}
                    <img src={`/assets/img/toolbar/redo.svg`} alt="Tool" />
                </ContextMenu.Item>
                <ContextMenu.Item
                    className="item contentItem"
                    onClick={() => {
                        onChangeTool(Tools.Eraser)
                    }}
                >
                    {t("eraser")}
                    <img src={`/assets/img/toolbar/eraserIcon.svg`} alt="Tool" />
                </ContextMenu.Item>
                <ContextMenu.Item className="item contentItem" onClick={() => removeAll()}>
                    {t("delete_all")}
                    <img src={`/assets/img/toolbar/trashIcon.svg`} alt="Tool" />
                </ContextMenu.Item>
                {book && book.book_pages && 1 !== Number(pageOrder) && (
                    <ContextMenu.Item className="item contentItem" onClick={() => firstPage()}>
                        {t("first_page")}
                        <ChevronsLeft width={"1.5em"} height={"1.5em"} />
                    </ContextMenu.Item>
                )}
                {book && book.book_pages && 1 !== Number(pageOrder) && (
                    <ContextMenu.Item className="item contentItem" onClick={() => _sketchField.current.previousPage()}>
                        {t("previous_page")}
                        <ChevronLeft width={"1.5em"} height={"1.5em"} />
                    </ContextMenu.Item>
                )}
                {book &&
                    book.book_pages &&
                    book.book_pages[book.book_pages.length - 1].page_order !== Number(pageOrder) && (
                        <ContextMenu.Item className="item contentItem" onClick={() => _sketchField.current.nextPage()}>
                            {t("next_page")}
                            <ChevronRight width={"1.5em"} height={"1.5em"} />
                        </ContextMenu.Item>
                    )}
                {book &&
                    book.book_pages &&
                    book.book_pages[book.book_pages.length - 1].page_order !== Number(pageOrder) && (
                        <ContextMenu.Item className="item contentItem" onClick={() => lastPage()}>
                            {t("last_page")}
                            <ChevronsRight width={"1.5em"} height={"1.5em"} />
                        </ContextMenu.Item>
                    )}

                {user && Object.keys(user).length > 0 && utils.userIsNotStudent(user) && (
                    <ContextMenu.Root>
                        <ContextMenu.TriggerItem className="item contentItem">
                            {t("addContent")}
                            <Layers width={16} height={16} />
                        </ContextMenu.TriggerItem>
                        <ContextMenu.Content className="content ml-2">
                            {contentTypes.map(
                                (content, index) =>
                                    content.id !== 10 && (
                                        <ContextMenu.Item
                                            key={index}
                                            onClick={() => {
                                                let createdAsStatically = false

                                                dispatch(
                                                    contentActions.store(
                                                        pageId,
                                                        content,
                                                        utils.calcTopPercentage(clickedPosition.y, pageHeight),
                                                        utils.calcLeftPercentage(clickedPosition.x, pageWidth),
                                                        createdAsStatically
                                                    )
                                                )
                                            }}
                                            className={`item contentItem btn-${content.color_class}`}
                                        >
                                            {t(content.name)}
                                            {utils.getContentTypeIcon(content?.id, "14px", "14px")}
                                        </ContextMenu.Item>
                                    )
                            )}

                            <ContextMenu.Arrow />
                        </ContextMenu.Content>
                    </ContextMenu.Root>
                )}
                <ContextMenu.Item
                    className="item contentItem"
                    onClick={(e) => {
                        e.preventDefault()
                        zoomIn()
                    }}
                >
                    {t("zoomIn")}
                    <img src={`/assets/img/toolbar/zoom-in.svg`} alt="Tool" />
                </ContextMenu.Item>
                <ContextMenu.Item
                    className="item contentItem"
                    onClick={(e) => {
                        e.preventDefault()
                        zoomOut()
                    }}
                >
                    {t("zoomOut")}
                    <img src={`/assets/img/toolbar/zoom-out.svg`} alt="Tool" />
                </ContextMenu.Item>
            </ContextMenu.Content>
        )
    }

    useEffect(() => {
        if (selectedTool === Tools.Text) {
            setSelectedTool(Tools.Select)
        }
    }, [pageOrder, bookId])

    return (
        <Container fluid className={"page" + (sidebarIsOpen ? " is-open" : "")}>
            <Topbar
                ref={{
                    topBarRef: topBarRef
                }}
                history={history}
                pageOrder={parseInt(pageOrder)}
                bookId={parseInt(bookId)}
                sidebarIsOpen={sidebarIsOpen}
                toggleSidebar={toggleSidebar}
                openTour={openTour}
                feedbackModalIsOpen={feedbackModalIsOpen}
                setFeedbackModalOpen={setFeedbackModalOpen}
                setQuickNoteOpen={setQuickNoteOpen}
            />
            <div className="mt-4 ml-5 pl-2 position-relative canvasCont">
                {!openBoard && (
                    <Bookmark
                        bookId={parseInt(bookId)}
                        pageId={pageId}
                        handleBookmark={handleBookmark}
                        usingOn={"page-component"}
                        width={27}
                        data_tut="bookmark"
                    />
                )}
                <ContextMenu.Root>
                    <ContextMenu.Trigger onContextMenu={(event) => handleRightClick(event)}>
                        <div className={scaleCss} id="innerPage" ref={bookPageRef}>
                            <Sketch
                                ref={_sketchField}
                                bookId={parseInt(bookId)}
                                pageOrder={parseInt(pageOrder)}
                                selectedTool={selectedTool}
                                sidebarIsOpen={sidebarIsOpen}
                                lineWidth={parseInt(lineWidth)}
                                highlighterLineWidth={parseInt(highlighterLineWidth)}
                                lineColor={lineColor.hex}
                                fillColor={fillColor.hex}
                                removeSelectedObject={removeSelected}
                                removeAllObjects={removeAll}
                                onChangeTool={onChangeTool}
                                history={history}
                                textSize={textSize}
                                isTourOpen={isTourOpen}
                                contentEditModal={contentEditModal}
                                isAssistantOpen={isAssistantOpen}
                                bookPageRef={bookPageRef}
                                zoomIn={zoomIn}
                                zoomOut={zoomOut}
                                isTranslatorOpen={isTranslatorOpen}
                                isImageSearcherOpen={isImageSearcherOpen}
                                resizableModalShow={resizableModalShow}
                                isQuickNoteOpen={isQuickNoteOpen}
                            />
                            {existingContents}
                        </div>
                    </ContextMenu.Trigger>
                    {ContextMenuContent()}
                </ContextMenu.Root>
                {isQuickNoteOpen && (
                    <QuickNote
                        show={isQuickNoteOpen}
                        setQuickNoteOpen={setQuickNoteOpen}
                        pageId={pageId}
                        bookId={bookId}
                    />
                )}
                <ChatBot
                    isAssistantOpen={isAssistantOpen}
                    setAssistantOpen={setAssistantOpen}
                    setShownContent={setShownContent}
                    pageId={pageId}
                    pageWidth={pageWidth}
                    pageHeight={pageHeight}
                    ref={{
                        topBarRef: topBarRef
                    }}
                />
            </div>
            <Toolbar
                pageId={pageId}
                lineWidth={lineWidth}
                highlighterLineWidth={highlighterLineWidth}
                setHighlighterLineWidth={setHighlighterLineWidth}
                lineColor={lineColor}
                fillColor={fillColor}
                selectedTool={selectedTool}
                onChangeTool={onChangeTool}
                onChangeFillColor={setFillColor}
                onChangeLineColor={setLineColor}
                onChangeLineWidth={setLineWidth}
                removeAll={removeAll}
                redo={redo}
                undo={undo}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                sidebarIsOpen={sidebarIsOpen}
                textSize={textSize}
                setTextSize={setTextSize}
                contentTypes={contentTypes}
                isTimerOpen={isTimerOpen}
                setTimerOpen={setTimerOpen}
                isAssistantOpen={isAssistantOpen}
                setTranslatorOpen={setTranslatorOpen}
                isTranslatorOpen={isTranslatorOpen}
                setImageSearcherOpen={setImageSearcherOpen}
                isImageSearcherOpen={isImageSearcherOpen}
                setShowCapture={setShowCapture}
                resizableModalShow={resizableModalShow}
                isQuickNoteOpen={isQuickNoteOpen}
                setQuickNoteOpen={setQuickNoteOpen}
                ref={{
                    topBarRef: topBarRef,
                    bookPageRef: bookPageRef
                }}
            />

            {isTimerOpen && <Timer setTimerOpen={setTimerOpen} />}
            {isTranslatorOpen && <Translator setTranslatorOpen={setTranslatorOpen} />}
            {isImageSearcherOpen && <ImageSearcher setImageSearcherOpen={setImageSearcherOpen} />}
            {feedbackModalIsOpen && <Feedback show={feedbackModalIsOpen} setShow={setFeedbackModalOpen} />}
            {showCapture && <Capture ref={_sketchField} setShowCapture={setShowCapture} />}
        </Container>
    )
}

export default React.memo(Page)
