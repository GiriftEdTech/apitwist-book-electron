import React from "react"
import BookLoader from "./partials/BookLoader"
import { getTranslatedText as t } from "../../_locale"
import Book from "./Book"

const BookGrid = ({ books, loading, error, title }) => {
    return (
        <div className="book_carousel">
            <div className="book_carousel_header">
                <h1 className="book_carousel_title">{title}</h1>
            </div>

            {loading && (
                <div className="d-flex justify-content-around">
                    <BookLoader className="mx-3" />
                    <BookLoader className="mx-3 d-none d-md-block" />
                    <BookLoader className="mx-3 d-none d-lg-block" />
                </div>
            )}

            {error && <h4 className="text-danger">{`${error.code} - ${error.message}`}</h4>}

            {!books || (books.length === 0 && <h4>{t("noBook")}</h4>)}

            {books && (
                <>
                    <div className="book_grid_container">
                        {books.map((book) => book.first_page && <Book key={book.id} book={book} />)}
                    </div>
                </>
            )}
        </div>
    )
}

export default React.memo(BookGrid)
