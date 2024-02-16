import React from "react"
import { Badge, Spinner, Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SidebarLoader from "./partials/SidebarLoader"
import { X } from "../icons"
import { getTranslatedText as t } from "../../_locale"
import PagesPagination from "../PagesPagination"
import Bookmark from "../partials/Bookmark"
import { useMemo } from "react"
import SidebarImage from "./SidebarImage"
import { utils } from "../../_helpers"
import Logo from "../partials/Logo"

const Sidebar = ({ toggle, isOpen, pageOrder, history, bookId }) => {
    const { book } = useSelector((state) => state.activeBook)
    const selectedPage = useSelector((state) => state.activePage)
    const bookmarked = useSelector((state) => state.bookmarks.bookmarked)
    const bookmarkedPages =
        bookmarked && bookmarked[bookId] !== undefined && bookmarked[bookId].map((book) => book.book_page_id)

    const renderPagesCount = () => {
        if (book && !book.loading) {
            return book.book_pages.length
        } else {
            return (
                <Spinner
                    style={{
                        width: "1rem",
                        height: "1rem",
                        float: "right",
                        fontSize: ".5rem"
                    }}
                />
            )
        }
    }

    const usingOn = useMemo(() => {
        return "sidebar-component"
    }, [])

    const renderPages = () => {
        if (book && !book.loading) {
            return book.book_pages.map((page) => {
                return (
                    <Link to={`${page.page_order}`} className="my-2" key={page.page_order}>
                        <Card
                            className={
                                "mx-3 " +
                                (selectedPage && selectedPage.page && selectedPage.page.page_order === page.page_order
                                    ? "activePage"
                                    : "")
                            }
                            id={`page-${page.page_order}`}
                        >
                            {bookmarked && bookmarked[bookId] !== undefined && bookmarkedPages.includes(page.id) && (
                                <Bookmark bookId={bookId} pageId={page && page.id} usingOn={usingOn} />
                            )}
                            <SidebarImage book_name={book.name} page_url={page.image_url} />
                            <Card.Body className="py-1 text-center" style={{ flex: "unset" }}>
                                <Badge variant="secondary">{page.page_order}</Badge>
                            </Card.Body>
                        </Card>
                    </Link>
                )
            })
        } else {
            return (
                <>
                    <SidebarLoader />
                    <SidebarLoader />
                    <SidebarLoader />
                </>
            )
        }
    }

    return (
        <>
            <div className={"sidebar inbook shadow" + (isOpen ? " is-open" : "")}>
                <div className="sidebar-header d-flex flex-column shadow-sm ">
                    <div className="d-flex pt-3 pl-3">
                        <Logo />
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                        <h3>
                            {t("pages")}
                            <span> ({renderPagesCount()})</span>
                        </h3>
                        <div className="close_button cursor-pointer topbar-button mr-1" onClick={toggle}>
                            <X color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">{renderPages()}</div>
            </div>
            <div className="sidebar-footer d-flex flex-column align-items-center shadow">
                <PagesPagination pageOrder={pageOrder} history={history} />
            </div>
        </>
    )
}

export default React.memo(Sidebar)
