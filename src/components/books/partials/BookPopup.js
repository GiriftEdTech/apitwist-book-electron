import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Category from "./Category"
import { utils } from "../../../_helpers"
import { getTranslatedText as t } from "../../../_locale"
import Favorite from "./Favorite"
import { favoriteActions } from "../../../_actions/favorite.action"
import { useDispatch } from "react-redux"

const BookPopup = ({ book }) => {
    const dispatch = useDispatch()
    const { loggedIn, user } = useSelector((state) => state.users)
    return (
        <div className={`book_popup ${book.color}`}>
            <div
                className="book_cover"
                style={{
                    backgroundImage: "url(" + process.env.REACT_APP_IMAGES_URL + "s-" + book.first_page.image_url + ")"
                }}
            />
            <div className="book_details">
                <Favorite
                    width="20px"
                    height="20px"
                    book={book}
                    toggleFavorite={() => dispatch(favoriteActions.storeOrDelete(book.id))}
                />
                <h3>{book.name}</h3>
                {/*<TextTruncate*/}
                {/*  line={2}*/}
                {/*  element="h4"*/}
                {/*  truncateText="…"*/}
                {/*  text={book.publisher.name}*/}
                {/*/>*/}
                <h4>{book.publisher.name}</h4>
                {/*<h5>{book.date}</h5>*/}
                {/*<StarRate rate={book.rate}>*/}
                {/*  <RateButton color={book.color}></RateButton>*/}
                {/*</StarRate>*/}
                <Category category={book.book_category.name} />
                {book.convert_status ? (
                    <div className={"mt-4 clearfix"} style={{ width: "100%" }}>
                        <Link
                            to={"/books/" + book.id}
                            className={"btn btn-primary btn-wide float-right"}
                            style={{
                                fontWeight: "600"
                            }}
                        >
                            {t("view")}
                        </Link>
                        {/*{loggedIn && utils.userCanCreateBooks(user) ? (*/}
                        {/*    <button*/}
                        {/*        className={"btn btn-outline-primary float-left"}*/}
                        {/*        style={{*/}
                        {/*            fontWeight: "600"*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        {t("edit")}*/}
                        {/*    </button>*/}
                        {/*) : (*/}
                        {/*    ""*/}
                        {/*)}*/}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}
export default BookPopup
