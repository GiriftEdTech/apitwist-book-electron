import React from "react"
import { useSelector } from "react-redux"
import { ProgressBar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { utils } from "../../_helpers"

const CurrentBookPopup = () => {
    const { book } = useSelector((state) => state.activeBook)
    const { page } = useSelector((state) => state.activePage)

    let currentPage, pageCount, progressValue

    currentPage = page && page.page_order
    pageCount = book.book_pages.length
    progressValue = currentPage ? (page && pageCount === 1 ? 50 : (currentPage / pageCount) * 100) : 0

    const bookCover =
        book.book_pages && utils.arrayHasLength(book.book_pages) && book.book_pages[0]
            ? "url(" + process.env.REACT_APP_IMAGES_URL + "s-" + book.book_pages[0].image_url + ")"
            : "url(" + process.env.PUBLIC_URL + "/assets/img/empty_cover.jpeg)"

    return (
        <Link to={"/books/" + book.id}>
            <div className="current_book_popup_container">
                <div className="current_book_cover" style={{ backgroundImage: bookCover }} />
                <div className="current_book_popup">
                    <h4 className="current_book_name">{book.name}</h4>
                    <h5 className="current_book_publisher">{book.publisher.name}</h5>
                    <ProgressBar now={progressValue} style={{ height: "4px", borderRadius: "8px" }} />
                </div>
            </div>
        </Link>
    )
}

export default CurrentBookPopup
