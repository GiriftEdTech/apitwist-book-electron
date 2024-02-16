import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useViewport from "../_hooks/useViewport"
import SideBar from "../components/bookpages/Sidebar"
import Page from "../components/bookpages/Page"
import { bookActions, scaleActions } from "../_actions/"
import { bookmarkActions, boardActions } from "../_actions"
import Tour from "reactour"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { utils } from "../_helpers"
import { getTranslatedText as t } from "../_locale"
import * as Sentry from "@sentry/react"
import useIndexedDb from "../_hooks/useIndexedDb"

const BookPage = ({ match, history }) => {
    const dispatch = useDispatch()
    const { width } = useViewport()
    const { books } = useSelector((state) => state.books)
    const { user } = useSelector((state) => state.users)
    const [sidebarIsOpen, setSidebarOpen] = useState(() => {
        false
    })
    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prevState) => !prevState)
    }, [])

    const activeBook = useSelector((state) => state.activeBook)
    const activePage = useSelector((state) => state.activePage)
    const pageDetails = useSelector((state) => state.pageDetails)

    const id = match.params.id
    const pageOrder = match.params.pageOrder
    const { openSmartBoard, openBoard } = useSelector((state) => state.boards)
    const [isTourOpen, setIsTourOpen] = useState(false)
    const accentColor = "#4285f4"

    let anchor = document.querySelector(`#page-${pageOrder}`)
    if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" })
    }

    const tourConfig = [
        {
            selector: '[data-tut="Pencil-Highlighter-Line"]',
            content: () => <div style={{ whiteSpace: "break-spaces" }}>{t("ReacTour_Pencil_Highlighter_Line")}</div>
        },
        {
            selector: '[data-tut="Text"]',
            content: () => <p>{t("ReacTour_Text")}</p>
        },

        {
            selector: '[data-tut="Zoom"]',
            content: () => <p>{t("ReacTour_Zoom")}</p>
        },
        {
            selector: '[data-tut="Undo"]',
            content: () => <p>{t("ReacTour_Undo")}</p>
        },
        {
            selector: '[data-tut="Redo"]',
            content: () => <p>{t("ReacTour_Redo")}</p>
        },
        {
            selector: '[data-tut="Trash"]',
            content: () => <p>{t("ReacTour_Trash")}</p>
        },
        ...(user && Object.keys(user).length > 0 && utils.userIsNotStudent(user)
            ? [
                  {
                      selector: '[data-tut="Contents"]',
                      content: () => <p>{t("ReacTour_Contents")}</p>
                  }
              ]
            : []),
        {
            selector: '[data-tut="Widgets"]',
            content: () => <p>{t("ReacTour_Widgets")}</p>
        },
        {
            selector: '[data-tut="Smartboard"]',
            content: () => <p>{t("ReacTour_Smartboard")}</p>
        },
        {
            selector: '[data-tut="board"]',
            content: () => <p>{t("ReacTour_board")}</p>
        },
        {
            selector: '[data-tut ="pages-pagination-arrows"]',
            content: () => <p>{t("ReacTour_Pagination_Arrows")}</p>
        },
        {
            selector: '[data-tut ="pages-pagination-input"]',
            content: () => <p>{t("ReacTour_Pagination_Input")}</p>
        },
        {
            selector: '[data-tut ="chatbot"]',
            content: () => <p>{t("ReacTour_Chatbot")}</p>
        },
        {
            selector: '[data-tut ="bookmark"]',
            content: () => <p>{t("ReacTour_Bookmark")}</p>
        },
        {
            selector: '[data-tut ="toc_list"]',
            content: () => <p>{t("ReacTour_TableOfContent_List")}</p>
        },
        {
            selector: '[data-tut ="bookmark_list"]',
            content: () => <p>{t("ReacTour_Bookmark_List")}</p>
        },
        ...(user && Object.keys(user).length > 0 && utils.userIsNotStudent(user)
            ? [
                  {
                      selector: '[data-tut ="content_list"]',
                      content: () => <p>{t("ReacTour_Content_List")}</p>
                  }
              ]
            : []),
        {
            selector: '[data-tut ="annotations_list"]',
            content: () => <p>{t("ReacTour_Annotations_List")}</p>
        },
        {
            selector: '[data-tut ="theme"]',
            content: () => <p>{t("ReacTour_Theme")}</p>
        },
        {
            selector: '[data-tut ="quick_note"]',
            content: () => <p>{t("ReacTour_Quicknote")}</p>
        }
    ]
    const tourConfigMobile = [
        {
            selector: '[data-tut="Pencil-Highlighter-Line"]',
            content: () => <div style={{ whiteSpace: "break-spaces" }}>{t("ReacTour_Pencil_Highlighter_Line")}</div>
        },
        {
            selector: '[data-tut="Text"]',
            content: () => <p>{t("ReacTour_Text")}</p>
        },
        {
            selector: '[data-tut="Zoom"]',
            content: () => <p>{t("ReacTour_Zoom")}</p>
        },
        {
            selector: '[data-tut="Undo"]',
            content: () => <p>{t("ReacTour_Undo")}</p>
        },
        {
            selector: '[data-tut="Redo"]',
            content: () => <p>{t("ReacTour_Redo")}</p>
        },
        {
            selector: '[data-tut="Trash"]',
            content: () => <p>{t("ReacTour_Trash")}</p>
        },
        ...(user && Object.keys(user).length > 0 && utils.userIsNotStudent(user)
            ? [
                  {
                      selector: '[data-tut="Contents"]',
                      content: () => <p>{t("ReacTour_Contents")}</p>
                  }
              ]
            : []),
        {
            selector: '[data-tut ="Widgets"]',
            content: () => <p>{t("ReacTour_Widgets")}</p>
        },
        {
            selector: '[data-tut="board"]',
            content: () => <p>{t("ReacTour_board")}</p>
        },
        {
            selector: '[data-tut ="pages-pagination-arrows"]',
            content: () => <p>{t("ReacTour_Pagination_Arrows")}</p>
        },
        {
            selector: '[data-tut ="pages-pagination-input"]',
            content: () => <p>{t("ReacTour_Pagination_Input")}</p>
        },
        {
            selector: '[data-tut ="chatbot"]',
            content: () => <p>{t("ReacTour_Chatbot")}</p>
        },
        {
            selector: '[data-tut ="bookmark"]',
            content: () => <p>{t("ReacTour_Bookmark")}</p>
        },
        {
            selector: '[data-tut ="menu"]',
            content: () => <p>{t("ReacTour_TableOfContent_List")}</p>
        },
        {
            selector: '[data-tut ="menu"]',
            content: () => <p>{t("ReacTour_Bookmark_List")}</p>
        },
        ...(user && Object.keys(user).length > 0 && utils.userIsNotStudent(user)
            ? [
                  {
                      selector: '[data-tut ="menu"]',
                      content: () => <p>{t("ReacTour_Content_List")}</p>
                  }
              ]
            : []),
        {
            selector: '[data-tut ="Widgets"]',
            content: () => <p>{t("ReacTour_Widgets")}</p>
        },
        {
            selector: '[data-tut ="menu"]',
            content: () => <p>{t("ReacTour_Annotations_List")}</p>
        },
        {
            selector: '[data-tut ="menu"]',
            content: () => <p>{t("ReacTour_Theme")}</p>
        }
    ]

    useEffect(() => {
        utils.objectHasLength(user) && Sentry.setUser({ email: user.email, id: user.id })
    }, [user])

    useEffect(() => {
        if (activeBook.loading && activeBook.date) {
            if (activeBook.date <= Date.now()) {
                dispatch(bookActions.clearSelectedBook())
                history.push("/")
            } else {
                return
            }
        }

        if (activeBook.error) {
            dispatch(bookActions.clearSelectedBook())
            history.push("/")
        }

        const book = activeBook.book
        const page = activePage.page

        if (!book || (book && parseInt(book.id) !== parseInt(id))) {
            dispatch(bookActions.getById(id))
            return
        }

        if (book && book.id === parseInt(id)) {
            const defaultScaleFactor = 1
            //page exists
            if (page) {
                // page is not in active book. so book is new selected. push to page 1
                if (parseInt(page.book_id) !== parseInt(id)) {
                    useIndexedDb().deleteAnnotation("whiteBoardAnnotations")
                    useIndexedDb().deleteAnnotation("blackBoardAnnotations")
                    utils.deleteStore("contentFilter")
                    dispatch(bookActions.clearSelectedPage())
                    dispatch(scaleActions.setDefaultScale(defaultScaleFactor))
                    history.push(`/books/${id}/pages/1`)
                } else {
                    if (parseInt(page.page_order) !== parseInt(pageOrder)) {
                        const newPage = book.book_pages.find((x) => parseInt(x.page_order) === parseInt(pageOrder))
                        useIndexedDb().deleteAnnotation("whiteBoardAnnotations")
                        useIndexedDb().deleteAnnotation("blackBoardAnnotations")
                        dispatch(scaleActions.setDefaultScale(defaultScaleFactor))
                        if (newPage) {
                            dispatch(bookActions.selectPage(newPage))
                        } else {
                            history.push(`/books/${id}/pages/1`)
                        }
                        if (openBoard) {
                            dispatch(boardActions.setBoardOpen())
                        }
                    } else {
                        let anchor = document.querySelector(`#page-${pageOrder}`)
                        if (anchor) {
                            anchor.scrollIntoView({ behavior: "smooth" })
                        }
                    }
                }
            } else {
                const newPage = book.book_pages.find((x) => parseInt(x.page_order) === parseInt(pageOrder))
                if (newPage) {
                    dispatch(bookActions.selectPage(newPage))
                } else {
                    history.push(`/books/${id}/pages/1`)
                }
            }
        }
    }, [activeBook, activePage, id, pageOrder, openBoard])

    useEffect(() => {
        const page = activePage.page
        if (page) {
            if (page.book_id == id && page.page_order == pageOrder) {
                if (!pageDetails.loading || !pageDetails.error) {
                    if (!openBoard) {
                        dispatch(bookActions.getContents(id, pageOrder))
                    }
                }
            }
        }
    }, [activePage, id, pageOrder, openBoard])

    useEffect(() => {
        dispatch(bookmarkActions.getAll())
    }, [])

    useEffect(() => {
        if (width > 1024) {
            if (openSmartBoard || openBoard) {
                setSidebarOpen(false)
            }
        }
    }, [width, openSmartBoard, openBoard])

    useEffect(() => {
        if (!utils.arrayHasLength(books)) {
            dispatch(bookActions.getAll())
        }
    }, [books])

    const handleBookmark = useCallback(() => {
        let book_page_id = activePage.page.id
        let book_id = activePage.page.book_id
        dispatch(bookmarkActions.storeOrDelete(book_id, book_page_id))
    }, [activePage])

    const disableBody = (target) => disableBodyScroll(target)
    const enableBody = (target) => enableBodyScroll(target)

    const closeTour = () => {
        setIsTourOpen(false)
    }

    const openTour = () => {
        setIsTourOpen(true)
    }

    useEffect(() => {
        ;(!utils.getStore("isTourDisplayed") || utils.getStore("isTourDisplayed") !== "1") &&
            (setIsTourOpen(true), utils.setStore("isTourDisplayed", "1"))
    }, [])

    return (
        <div className="pageWrapper">
            <SideBar
                toggle={toggleSidebar}
                isOpen={sidebarIsOpen}
                pageOrder={parseInt(pageOrder)}
                history={history}
                bookId={parseInt(id)}
            />
            <Page
                toggleSidebar={toggleSidebar}
                sidebarIsOpen={sidebarIsOpen}
                bookId={id}
                pageOrder={pageOrder}
                history={history}
                handleBookmark={handleBookmark}
                openTour={openTour}
                isTourOpen={isTourOpen}
            />
            <Tour
                onRequestClose={closeTour}
                steps={width > 820 ? tourConfig : tourConfigMobile}
                isOpen={isTourOpen}
                maskClassName="mask"
                className="helper"
                rounded={5}
                accentColor={accentColor}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
            />
        </div>
    )
}

export default BookPage
