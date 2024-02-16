import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import SketchField from "./SketchField"
import { useSelector } from "react-redux"
import { utils } from "../../../_helpers"
import useIndexedDb from "../../../_hooks/useIndexedDb"

const Sketch = forwardRef(
    (
        {
            bookId,
            pageOrder,
            selectedTool,
            sidebarIsOpen,
            lineWidth,
            lineColor,
            fillColor,
            onChangeTool,
            history,
            textSize,
            isTourOpen,
            removeSelectedObject,
            removeAllObjects,
            highlighterLineWidth,
            contentEditModal,
            isAssistantOpen,
            bookPageRef,
            zoomIn,
            zoomOut,
            isTranslatorOpen,
            isImageSearcherOpen,
            resizableModalShow,
            isQuickNoteOpen
        },
        ref
    ) => {
        const _sketchField = useRef()
        const activePage = useSelector((state) => state.activePage)
        const pageDetails = useSelector((state) => state.pageDetails)
        const { scaleFactor, scale } = useSelector((state) => state.scale)
        const { resolution, openBoard, boardType } = useSelector((state) => state.boards)
        const page = useSelector((state) => state.activePage.page)
        const book = useSelector((state) => state.activeBook)

        useImperativeHandle(ref, () => {
            return _sketchField.current
        })

        const setBackground = () => {
            const bookCover =
                activePage &&
                !activePage.loading &&
                !activePage.error &&
                activePage.page &&
                resolution &&
                !openBoard &&
                parseInt(activePage.page.book_id) === bookId &&
                parseInt(activePage.page.page_order) === pageOrder
                    ? process.env.REACT_APP_IMAGES_URL + resolution + activePage.page.image_url
                    : process.env.PUBLIC_URL + "/assets/img/empty_cover.jpeg"
            _sketchField.current.setBackgroundFromDataUrl(bookCover, {}, reloadDraw)
        }

        const saveCanvas = () => {
            if (!openBoard) {
                if (_sketchField.current && page) {
                    let annotations = _sketchField.current?.toJSON()
                    if (annotations.objects.length === 0) {
                        useIndexedDb().deleteAnnotation("bookpageAnnotations", bookId, page.id)
                    } else {
                        useIndexedDb().addAnnotation("bookpageAnnotations", bookId, page.id, annotations)
                    }
                }
            } else if (openBoard && boardType === "whiteBoard") {
                if (_sketchField.current) {
                    let whiteBoardAnnotations = _sketchField.current?.toJSON()
                    useIndexedDb().addAnnotation("whiteBoardAnnotations", whiteBoardAnnotations)
                }
            } else if (openBoard && boardType === "blackBoard") {
                if (_sketchField.current) {
                    let blackBoardAnnotations = _sketchField.current?.toJSON()
                    useIndexedDb().addAnnotation("blackBoardAnnotations", blackBoardAnnotations)
                }
            }
        }

        const reloadDraw = async () => {
            let last = page && (await useIndexedDb().getAnnotations("bookpageAnnotations", bookId, page.id))
            let whiteLast = await useIndexedDb().getAnnotations("whiteBoardAnnotations")
            let blackLast = await useIndexedDb().getAnnotations("blackBoardAnnotations")

            if (!openBoard && last && _sketchField) {
                if (last.objects.length) {
                    last = Object.assign({}, _sketchField.current?.toJSON(), {
                        objects: last.objects
                    })
                    setTimeout(() => {
                        _sketchField.current && _sketchField.current?.fromJSON(last)
                    }, 500)
                }
            }

            if (
                utils.objectHasLength(whiteLast) &&
                _sketchField &&
                openBoard &&
                boardType === "whiteBoard" &&
                whiteLast.objects.length > 0
            ) {
                whiteLast = Object.assign({}, _sketchField.current?.toJSON(), {
                    objects: whiteLast.objects
                })
                setTimeout(() => {
                    _sketchField.current && _sketchField.current.fromJSON(whiteLast)
                }, 550)
            }
            if (
                utils.objectHasLength(blackLast) &&
                _sketchField &&
                openBoard &&
                boardType === "blackBoard" &&
                blackLast.objects.length > 0
            ) {
                blackLast = Object.assign({}, _sketchField.current?.toJSON(), {
                    objects: blackLast.objects
                })
                setTimeout(() => {
                    _sketchField.current && _sketchField.current.fromJSON(blackLast)
                }, 550)
            }
        }

        useEffect(() => {
            !openBoard && setBackground()
        }, [resolution, openBoard, activePage])

        useEffect(() => {
            return () => {
                if (_sketchField.current) {
                    _sketchField.current.clear()
                }
            }
        }, [activePage, bookId, pageOrder, boardType, openBoard])

        useEffect(() => {
            if (page) {
                if (page.page_order !== pageOrder || openBoard) {
                    _sketchField.current.removeAllObjects()
                }
            }
        }, [pageOrder, openBoard, page])

        useEffect(() => {
            _sketchField.current.zoom(scale)
        }, [scaleFactor, scale])

        useEffect(() => {
            const loadBoard = async () => {
                let whiteBoardAnnotations = await useIndexedDb().getAnnotations("whiteBoardAnnotations")

                let blackBoardAnnotations = await useIndexedDb().getAnnotations("blackBoardAnnotations")

                if (openBoard && boardType === "whiteBoard") {
                    _sketchField.current._backgroundColor("#ffffff")
                    if (utils.objectHasLength(whiteBoardAnnotations)) {
                        reloadDraw()
                    }
                } else if (openBoard && boardType === "blackBoard") {
                    _sketchField.current._backgroundColor("#000000")
                    if (utils.objectHasLength(blackBoardAnnotations)) {
                        reloadDraw()
                    }
                }
            }

            loadBoard()
        }, [boardType, openBoard])

        return (
            <SketchField
                ref={_sketchField}
                tool={selectedTool}
                lineWidth={lineWidth}
                highlighterLineWidth={highlighterLineWidth}
                lineColor={lineColor}
                fillColor={fillColor}
                removeSelectedObject={removeSelectedObject}
                removeAllObjects={removeAllObjects}
                sidebarIsOpened={sidebarIsOpen}
                saveCanvas={saveCanvas}
                onChangeTool={onChangeTool}
                page={page}
                history={history}
                textSize={textSize}
                isTourOpen={isTourOpen}
                book={book}
                pageDetails={pageDetails}
                openBoard={openBoard}
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
        )
    }
)

export default Sketch
