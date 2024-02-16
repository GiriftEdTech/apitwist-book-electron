import React from "react"
import { useSelector } from "react-redux"
import { BookmarkFilledSvg, BookmarkSvg } from "../icons"
import TooltipContainer from "../bookpages/partials/TooltipContainer"
import { getTranslatedText as t } from "../../_locale"

const Bookmark = ({ bookId, pageId, handleBookmark, usingOn, width, data_tut }) => {
    const bookmarked = useSelector((state) => state.bookmarks.bookmarked)
    const bookmarkLoading = useSelector((state) => state.bookmarks.loading)
    const bookmarkedPages =
        bookmarked && bookmarked[bookId] !== undefined && bookmarked[bookId].map((book) => book.book_page_id)
    const bookmarkStatus = bookmarked && bookmarked[bookId] !== undefined && bookmarkedPages.includes(pageId)

    return usingOn === "sidebar-component" ? (
        <div data-tut={data_tut} className={`bookmark-container ${usingOn}`}>
            <BookmarkFilledSvg color="var(--c-bg-primary)" width={width} />
        </div>
    ) : (
        usingOn === "page-component" && (
            <div
                data-tut={data_tut}
                className={`bookmark-container ${usingOn} ${
                    bookmarked &&
                    bookmarked[bookId] !== undefined &&
                    bookmarkedPages &&
                    bookmarkedPages.includes(pageId)
                        ? "bookmark-fill"
                        : ""
                }`}
            >
                <TooltipContainer placement={"top"} name={bookmarkStatus ? t("removeToBookmark") : t("addToBookmark")}>
                    <div className="bookmark-svg-container shadow" onClick={() => handleBookmark && handleBookmark()}>
                        {bookmarkLoading ? (
                            <div className="spinner-border text-primary spinner-border-sm" role="status" />
                        ) : bookmarkStatus ? (
                            <BookmarkFilledSvg color="var(--c-bg-primary)" width={width} height={width} />
                        ) : (
                            <BookmarkSvg color="var(--c-bg-primary)" width={width} height={width} />
                        )}
                    </div>
                </TooltipContainer>
            </div>
        )
    )
}

export default React.memo(Bookmark)
