import React, { Component } from "react"
import { connect } from "react-redux"
import Slider from "react-slick"
import { bookActions } from "../../_actions/book.actions"
import { ChevronLeft, ChevronRight } from "../icons"
import Book from "./Book"
import BookLoader from "./partials/BookLoader"
import { getTranslatedText as t } from "../../_locale"

class BookCarousel extends Component {
    constructor(props) {
        super(props)
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)

        this.state = {
            matches: window.matchMedia("(max-width: 768px)").matches
        }
    }

    next() {
        this.slider.slickNext()
    }

    previous() {
        this.slider.slickPrev()
    }

    componentDidMount() {
        if (!this.props.books) this.props.getAll()

        const handler = (e) => this.setState({ matches: e.matches })
        window.matchMedia("(max-width: 768px)").addListener(handler)
    }

    sliderComponent() {
        const books = this.props.books
        const booksCount = books.length > 3 ? 3 : books.length
        const sliderSettings = {
            slidesToShow: booksCount,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            swipeToSlide: true,
            autoplay: true,
            speed: 300,
            autoplaySpeed: 4000,
            cssEase: "linear",
            pauseOnHover: false,
            centerMode: true,
            centerPadding: "10px",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        centerPadding: "100px"
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "160px"
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "70px"
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "45px"
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: "0"
                    }
                }
            ]
        }
        return (
            <Slider ref={(c) => (this.slider = c)} {...sliderSettings}>
                {books.map((book) => (
                    <Book key={book.id} book={book} />
                ))}
            </Slider>
        )
    }

    renderComponent() {
        const books = this.props.books
        const loading = this.props.loading
        const error = this.props.error

        if (loading) {
            return (
                <div className="d-flex justify-content-around">
                    <BookLoader className="mx-3" />
                    <BookLoader className="mx-3 d-none d-md-block" />
                    <BookLoader className="mx-3 d-none d-lg-block" />
                </div>
            )
        } else if (error) {
            return <h4 className="text-danger">{`${error.code} - ${error.message}`}</h4>
        } else if (!books || books.length === 0) {
            return <h4>{t("noBook")}</h4>
        } else {
            return this.sliderComponent()
        }
    }

    renderArrows() {
        const books = this.props.books
        if (books && (books.length > 2 || (books.length > 1 && this.state.matches))) {
            return (
                <div className="arrows">
                    <ChevronLeft onClick={this.previous} />
                    <ChevronRight onClick={this.next} />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="book_carousel">
                <div className="book_carousel_header">
                    <h1 className="book_carousel_title">{this.props.title}</h1>

                    {this.renderArrows()}
                </div>

                {this.renderComponent()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { books } = state.books
    const loading = state.books.loading ? state.books.loading : false
    const error = state.books.error ? state.books.error : false
    return { books, loading, error }
}

const actionCreators = {
    getAll: bookActions.getAll
}
export default connect(mapStateToProps, actionCreators)(BookCarousel)
