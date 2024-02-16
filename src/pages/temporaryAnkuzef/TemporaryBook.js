import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useViewport from "../../_hooks/useViewport"
import SideBar from "../../components/bookpages/Sidebar"
import Page from "../../components/bookpages/Page"
import { bookActions, temporaryActions } from "../../_actions"
import { utils } from "../../_helpers"

const TemporaryBook = ({ match, bookId, history }) => {
    const { width } = useViewport()
    const dispatch = useDispatch()
    const openSmartBoard = useSelector((state) => state.boards.openSmartBoard)
    const { loggedIn, user } = useSelector((state) => state.users)
    const activeBook = useSelector((state) => state.activeBook)
    const activePage = useSelector((state) => state.activePage)
    const pageDetails = useSelector((state) => state.pageDetails)

    const [sidebarIsOpen, setSidebarOpen] = useState(() => {
        if (width > 1024) {
            return true
        } else {
            return false
        }
    })

    const id = bookId
    const pageOrder = match.params.pageOrder ?? 1

    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen)

    let anchor = document.querySelector(`#page-${pageOrder}`)
    if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" })
    }

    utils.deleteStore("passwordToken")
    utils.setStore("passwordToken", "ankuzef_token")

    useEffect(() => {
        if (!loggedIn && !user) {
            dispatch(temporaryActions.temporaryLogin())
        }
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
            window.location.reload()
        }

        const book = activeBook.book
        const page = activePage.page

        if (!book || (book && parseInt(book.id) !== parseInt(id))) {
            dispatch(bookActions.clearSelectedBook())
            dispatch(bookActions.clearSelectedPage())
            dispatch(temporaryActions.temporaryGetById(id))
            return
        }

        if (book && book.id === parseInt(id)) {
            //page exists
            if (page) {
                // page is not in active book. so book is new selected. push to page 1
                if (parseInt(page.book_id) !== parseInt(id)) {
                    dispatch(bookActions.clearSelectedPage())
                    let bookUrl = ""
                    switch (id) {
                        case 22:
                            bookUrl = "9fcc5162-d93e-434a-91fd-22ee735e9f2c"
                            break
                        case 24:
                            bookUrl = "2ffc03d9-b102-41b7-9e2f-59634374fa90"
                            break
                    }
                    history.push(`/books/${bookUrl}/pages/1`)
                } else {
                    if (parseInt(page.page_order) !== parseInt(pageOrder)) {
                        const newPage = book.book_pages.find((x) => parseInt(x.page_order) === parseInt(pageOrder))
                        if (newPage) {
                            dispatch(bookActions.selectPage(newPage))
                        } else {
                            // history.push(`/books/${id}/pages/1`)
                        }
                    }
                    if (page.book_id == id && page.page_order == pageOrder) {
                        if (pageDetails.loading || pageDetails.error) {
                            return
                        } else if (
                            pageDetails.contents &&
                            pageDetails.contents[0] &&
                            pageDetails.contents[0].pivot.contentable_id == page.id
                        ) {
                            return
                        } else {
                            dispatch(temporaryActions.temporaryGetContents(id, pageOrder))
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
    }, [activeBook, activePage, id, pageOrder])

    useEffect(() => {
        if (width > 1024) {
            if (openSmartBoard) {
                setSidebarOpen(false)
            } else {
                setSidebarOpen(true)
            }
        }
    }, [width, openSmartBoard])

    return (
        <div className="pageWrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} pageOrder={parseInt(pageOrder)} history={history} />
            <Page
                toggleSidebar={toggleSidebar}
                sidebarIsOpen={sidebarIsOpen}
                bookId={id}
                pageOrder={parseInt(pageOrder)}
                history={history}
            />
        </div>
    )
}

export default TemporaryBook
