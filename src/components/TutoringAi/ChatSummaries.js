import { Button } from "react-bootstrap"
import { utils } from "../../_helpers"
import { getTranslatedText as t } from "../../_locale"
import { NewForm } from "../icons"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ChatSummaries = () => {
    const [storedMessages, setStoredMessages] = useState(JSON.parse(utils.getStore("messages")))
    const { chat_id } = useParams()

    useEffect(() => {
        const handleLocalStorageChange = () => {
            setStoredMessages(JSON.parse(utils.getStore("messages")))
        }

        window.addEventListener("storage", handleLocalStorageChange)

        return () => {
            window.removeEventListener("storage", handleLocalStorageChange)
        }
    }, [])

    return (
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-center p-3 ">
                <button
                    onClick={() => (window.location.href = "/edumentor")}
                    className="btn btn-primary d-flex justify-content-between align-items-center"
                >
                    {t("newChat")}
                    <NewForm />
                </button>
            </div>
            <div className="p-3">
                <h3 className="mb-0">{t("previousChats")}</h3>
            </div>
            {utils.objectHasLength(storedMessages) ? (
                Object.keys(storedMessages).map((key) => (
                    <div
                        className={`d-flex px-3 py-2 cursor-pointer hover-bg mb-1 ${
                            chat_id === key ? "primary-bg" : ""
                        }`}
                        onClick={() => (window.location.href = `/edumentor/${key}`)}
                        key={key}
                    >
                        <span className="text-capitalize text-reset text-decoration-none d-inline-block text-truncate">
                            {storedMessages[key]?.messages[0]?.content}
                        </span>
                    </div>
                ))
            ) : (
                <div className="d-flex py-2 px-3">
                    <p>{t("noPreviousChats")}</p>
                </div>
            )}
        </div>
    )
}

export default ChatSummaries
