import React, { useState } from "react"
import TextTruncate from "react-text-truncate"
import { Modal } from "react-bootstrap"
import BookPopup from "./partials/BookPopup"
import Category from "./partials/Category"
import { useSelector } from "react-redux"
import { Bookmark } from "../icons"
import TooltipContainer from "../bookpages/partials/TooltipContainer"
import { getTranslatedText as t } from "../../_locale"
// import StarRate from './StarRate'
import Favorite from "./partials/Favorite"
import { useDispatch } from "react-redux"
import { favoriteActions } from "../../_actions/favorite.action"
import { utils } from "../../_helpers"

const Book = ({ book }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => {
        setIsOpen(false)
    }

    const bookCover =
        book.first_page && book.first_page.image_url !== "null"
            ? "url(" + process.env.REACT_APP_IMAGES_URL + "s-" + book.first_page.image_url + ")"
            : "url(" + process.env.PUBLIC_URL + "/assets/img/empty_cover.jpeg)"

    return (
        <>
            <div className="single_book_container">
                <div className={`book ${book.color}`} onClick={openModal}>
                    {bookCover && (
                        <div
                            className="book_cover"
                            style={{
                                backgroundImage: bookCover
                            }}
                        />
                    )}
                    <div className="book_details">
                        <TextTruncate line={3} element="h3" truncateText="…" text={book.name} />
                        <TextTruncate line={2} element="h4" truncateText="…" text={book.publisher.name} />
                        {/*<h5>{book.date}</h5>*/}
                        {/*<StarRate rate={book.rate} />*/}
                        <Category category={book.book_category.name} />
                        <div className="d-flex">
                            {book.bookmarks_count > 0 && (
                                <div className="d-flex mt-1 pt-1 pr-3 align-items-center">
                                    <TooltipContainer placement={"bottom"} name={t("bookmarks")}>
                                        <Bookmark width="1.5em" height="1.5em" />
                                    </TooltipContainer>
                                    <span className="book-bookmark-text">{`${book.bookmarks_count}`}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Favorite
                    width="14px"
                    height="14px"
                    book={book}
                    toggleFavorite={() => dispatch(favoriteActions.storeOrDelete(book.id))}
                />
            </div>

            <Modal
                show={isOpen}
                onHide={closeModal}
                centered={true}
                dialogClassName="book_popup_modal_dialog"
                className="book_popup_modal"
            >
                <BookPopup book={book} />
            </Modal>
        </>
    )
}

export default Book
