import { utils } from "../_helpers"
import SummarySideBar from "../components/TutoringAi/SummarySideBar"
import TutoringForm from "../components/TutoringAi/TutoringForm"
import { useParams } from "react-router-dom"
import GptMessageReviewer from "../components/partials/GptMessageReviewer"
import { useSelector } from "react-redux"
import { useRef } from "react"
import useBookPageViewport from "../_hooks/useBookPageViewport"
import CurrentBookPopupWrapper from "../components/books/CurrentBookPopupWrapper"

const TutoringAi = () => {
    const tutoringPageRef = useRef(null)
    const { chat_id } = useParams()
    const footerRef = useRef(null)
    const { pageWidth } = useBookPageViewport(tutoringPageRef)
    let headerHeigth = document.getElementsByTagName("header")[0]?.clientHeight
    const { messages } = useSelector((state) => state.openAi)
    const storedMessages = JSON.parse(utils.getStore("messages"))
    return (
        <div
            ref={tutoringPageRef}
            className="d-flex container-fluid tutoring-page"
            style={{ height: `calc(100vh - ${headerHeigth}px - 5px)` }}
        >
            <SummarySideBar pageWidth={pageWidth} headerHeigth={headerHeigth} />

            {!utils.arrayHasLength(messages) && (!storedMessages || !storedMessages?.hasOwnProperty(chat_id)) && (
                <div className="row d-flex justify-content-center align-items-center w-100">
                    <TutoringForm />
                </div>
            )}

            {(utils.arrayHasLength(messages) || storedMessages?.hasOwnProperty(chat_id)) && (
                <GptMessageReviewer headerHeigth={headerHeigth} footerRef={footerRef} />
            )}
            <div className="d-none d-lg-block">
                <CurrentBookPopupWrapper />
            </div>
        </div>
    )
}
export default TutoringAi
