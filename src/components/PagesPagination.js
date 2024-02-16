import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Spinner } from "react-bootstrap"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "./icons"
import TooltipContainer from "./bookpages/partials/TooltipContainer"
import { getTranslatedText as t } from "../_locale"

const PagesPagination = ({ pageOrder, history }) => {
    const { book } = useSelector((state) => state.activeBook)
    const page = useSelector((state) => state.activePage)
    const [pageInput, setPageInput] = useState()

    let timer = null

    const handleInputOnChange = (e) => {
        setPageInput(e.target.value)
        clearTimeout(timer)
    }

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && Number(pageInput) && book.book_pages.find((x) => x.page_order == pageInput)) {
            clearTimeout(timer)
            history.push(pageInput)
            setPageInput("")
        }
    }

    useEffect(() => {
        timer = setTimeout(() => {
            if (Number(pageInput) && book.book_pages.find((x) => x.page_order == pageInput)) {
                history.push(pageInput)
                setPageInput("")
            }
        }, 1000)
    }, [pageInput])

    const renderPagination = () => {
        if (book && book.book_pages) {
            const lastPage = book.book_pages[book.book_pages.length - 1]
            const firstPage = book.book_pages[0].page_order
            let index = null
            if (page && page.page && page.page.page_order) {
                index = book.book_pages.findIndex((bookPage) => bookPage.page_order === page.page.page_order)
            } else {
                index = book.book_pages.findIndex((bookPage) => bookPage.page_order === pageOrder)
            }

            let prevPage = null
            let nextPage = null
            if (index > 0) {
                prevPage = book.book_pages[index - 1].page_order
            }
            if (index < book.book_pages.length - 1) {
                nextPage = book.book_pages[index + 1].page_order
            }
            return (
                <div div className="position-relative">
                    <ul className="pagination summary" data-tut="pages-pagination-arrows">
                        <li>
                            <input
                                type="text"
                                placeholder={`${pageOrder}/${lastPage.page_order}`}
                                className="text-center disabled"
                                data-tut="pages-pagination-input"
                            />
                        </li>
                    </ul>

                    <ul className="pagination main" data-tut="pages-pagination-arrows">
                        <li className={pageOrder === 1 ? "disabled" : ""}>
                            <TooltipContainer placement={"top"} name={t("firstPage")}>
                                <Link to={pageOrder === 1 ? "#" : `${firstPage}`}>
                                    <ChevronsLeft
                                        color={pageOrder === 1 ? "#ddd" : "var(--c-btn)"}
                                        width={"1.5em"}
                                        height={"1.5em"}
                                    />
                                </Link>
                            </TooltipContainer>
                        </li>
                        <li className={pageOrder === 1 ? "disabled" : ""}>
                            <TooltipContainer placement={"top"} icon="⭠" name={t("previousPage")}>
                                <Link to={pageOrder === 1 ? "#" : `${prevPage}`}>
                                    <ChevronLeft
                                        color={pageOrder === 1 ? "#ddd" : "var(--c-btn)"}
                                        width={"1.5em"}
                                        height={"1.5em"}
                                    />
                                </Link>
                            </TooltipContainer>
                        </li>
                        <li>
                            <input
                                value={pageInput}
                                onChange={handleInputOnChange}
                                onKeyDown={handleInputKeyDown}
                                type="text"
                                placeholder={`${pageOrder}/${lastPage.page_order}`}
                                onFocus={(e) => (e.target.placeholder = "")}
                                onBlur={(e) => (e.target.placeholder = `${pageOrder}/${lastPage.page_order}`)}
                                className="text-center"
                                data-tut="pages-pagination-input"
                            />
                        </li>
                        <li className={pageOrder === lastPage.page_order ? "disabled" : ""}>
                            <TooltipContainer placement={"top"} icon="➝" name={t("nextPage")}>
                                <Link to={pageOrder === lastPage.page_order ? "#" : `${nextPage}`}>
                                    <ChevronRight
                                        color={pageOrder === lastPage.page_order ? "#ddd" : "var(--c-btn)"}
                                        width={"1.5em"}
                                        height={"1.5em"}
                                    />
                                </Link>
                            </TooltipContainer>
                        </li>
                        <li className={pageOrder === lastPage.page_order ? "disabled" : ""}>
                            <TooltipContainer placement={"top"} name={t("lastPage")}>
                                <Link to={pageOrder === lastPage.page_order ? "#" : `${lastPage.page_order}`}>
                                    <ChevronsRight
                                        color={pageOrder === lastPage.page_order ? "#ddd" : "var(--c-btn)"}
                                        width={"1.5em"}
                                        height={"1.5em"}
                                    />
                                </Link>
                            </TooltipContainer>
                        </li>
                    </ul>
                </div>
            )
        } else
            return (
                <Spinner
                    className="custom-spinner"
                    style={{
                        width: "1.3rem",
                        height: "1.3rem",
                        fontSize: ".5rem"
                    }}
                />
            )
    }

    return renderPagination()
}

export default PagesPagination
