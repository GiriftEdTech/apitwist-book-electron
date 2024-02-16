import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { utils } from "../../_helpers"
import { lastViewedAction } from "../../_actions"
import CurrentBookPopup from "./CurrentBookPopup"
import { useReactPath } from "../../_hooks/useReactPath"

const CurrentBookPopupWrapper = () => {
    const dispatch = useDispatch()
    const activeBook = useSelector((state) => state.activeBook.book)
    const lastViewed = useSelector((state) => state.lastViewed)
    const users = useSelector((state) => state.users)
    const { books, loading, error } = useSelector((state) => state.books)
    const path = useReactPath()

    let bookIds = []
    if (books) {
        bookIds = books.map((book) => {
            return book.id
        })
    }

    useEffect(() => {
        if (!utils.objectHasLength(users.user)) {
            return
        } else if (lastViewed.loading === null) {
            dispatch(lastViewedAction.getLastVisited())
        }
    }, [books, users])

    return (
        <div className="d-none d-md-block">
            {utils.objectHasLength(activeBook) ? (
                path.includes("edumentor") ? (
                    <CurrentBookPopup />
                ) : (
                    books && bookIds && bookIds.includes(activeBook.id) && <CurrentBookPopup />
                )
            ) : null}
        </div>
    )
}

export default CurrentBookPopupWrapper
