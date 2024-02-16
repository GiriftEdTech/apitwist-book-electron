import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Banner from "../components/Banner"
import { getTranslatedText as t } from "../_locale"
import BookGrid from "../components/books/BookGrid"
import { boardActions, bookActions, classActions, lastViewedAction } from "../_actions"
import CurrentBookPopupWrapper from "../components/books/CurrentBookPopupWrapper"
import ClassGrid from "../components/class/ClassGrid"
import { utils } from "../_helpers"

const Home = () => {
    const dispatch = useDispatch()
    const { favorited } = useSelector((state) => state.favorite)
    const { books, loading, error } = useSelector((state) => state.books)
    const { openBoard } = useSelector((state) => state.boards)
    const { classes } = useSelector((state) => state.classes)

    let favoritedBooks =
        books && books.filter((book) => favorited && favorited.length > 0 && favorited.includes(book.id))

    useEffect(() => {
        dispatch(bookActions.getAll())
        dispatch(classActions.getAll())
    }, [])

    useEffect(() => {
        if (openBoard) {
            dispatch(boardActions.setBoardOpen())
        }
    }, [openBoard])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Banner />
                        {utils.arrayHasLength(classes) && <ClassGrid component="private" />}
                        {favoritedBooks !== undefined && favoritedBooks.length > 0 && (
                            <BookGrid books={favoritedBooks} loading={loading} error={error} title={t("favorites")} />
                        )}
                        <BookGrid books={books} loading={loading} error={error} title={t("books")} />
                        {/*<BookCarousel title={t('myBooks')} />*/}
                    </Col>
                </Row>
            </Container>
            <CurrentBookPopupWrapper />
        </>
    )
}

export default Home
