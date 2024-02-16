import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { utils } from "../../_helpers"
import { Button, Form, InputGroup } from "react-bootstrap"
import AutoResizedTextarea from "./AutoResizedTextarea"
import { getTranslatedText as t } from "../../_locale"
import { isBrowser } from "react-device-detect"
import AudioRecorderHoc from "../../_hooks/AudioRecorderHoc"
import { Ask, ChatGPT, Mic, Record, User } from "../icons"
import { openAiModels } from "../../_helpers/openAiModels"
import useBookPageViewport from "../../_hooks/useBookPageViewport"
import { openAiActions } from "../../_actions/openAi.actions"
import { useParams } from "react-router-dom"

const GptMessageReviewer = (props) => {
    const gptMessageReviewerRef = useRef(null)
    const { user } = useSelector((state) => state.users)

    const { chat_id } = useParams()
    const dispatch = useDispatch()
    const responseRef = useRef(null)

    const { messages, textLoading, speechLoading, chatId, text } = useSelector((state) => state.openAi)
    const storedMessages = JSON.parse(utils.getStore("messages"))
    let currentMessages = useMemo(
        () =>
            utils.arrayHasLength(messages)
                ? messages
                : storedMessages.hasOwnProperty(chat_id) && storedMessages[chat_id].messages,
        [messages, storedMessages]
    )

    const [value, setValue] = useState({ role: "user", content: "" })
    const handleChange = (name, value) => {
        setValue((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        if (text?.text) {
            setValue((prevState) => ({
                ...prevState,
                content: text.text
            }))
        }
    }, [text])

    const handleSubmit = (e) => {
        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {
            e.preventDefault()
            if (value.content.trim() !== "") {
                dispatch(openAiActions.askChatGpt([...currentMessages, value], openAiModels[0].model, chatId))
                setValue({ role: "user", content: "" })
            }
        }
    }
    useEffect(() => {
        responseRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentMessages])

    useEffect(() => {
        let id = chatId || chat_id

        if (id) {
            const storedMessages = JSON.parse(utils.getStore("messages"))

            if (storedMessages?.hasOwnProperty(id)) {
                utils.setStore(
                    "messages",
                    JSON.stringify({
                        ...storedMessages,
                        [id]: { ...storedMessages[id], messages: currentMessages }
                    })
                )
                window.dispatchEvent(new Event("storage"))
            }
        }
    }, [chatId, chat_id, messages])

    return (
        <div className="d-flex flex-column pl-3 pt-3 justify-content-between w-100 ml-3">
            <div
                className="row d-flex justify-content-center"
                style={{
                    height: `calc(100% - ${props.footerRef?.current?.offsetHeight}px-100px)`,
                    overflowY: "auto",
                    overflowX: "hidden"
                }}
            >
                <div
                    className="col col-sm-10 col-md-8 col-xl-6 d-flex justify-content-center w-100 gpt-message-reviewer"
                    ref={gptMessageReviewerRef}
                >
                    {utils.arrayHasLength(currentMessages) && (
                        <div className="d-flex flex-column w-100">
                            <div>
                                {currentMessages.map((message) => {
                                    return (
                                        <div className="mb-3">
                                            {message.role === "user" && (
                                                <>
                                                    <div>
                                                        <div className="avatar-name">
                                                            <span className="avatar-content">{<User />}</span>
                                                        </div>
                                                        <span className="font-weight-600 ml-2">
                                                            {utils.objectHasLength(user) &&
                                                                utils.capitalize(user.name) +
                                                                    " " +
                                                                    utils.capitalize(user.surname)}
                                                        </span>
                                                    </div>
                                                    <p ref={responseRef} className="pl-5 ml-1 mb-0">
                                                        {`${message.content}`}
                                                    </p>
                                                </>
                                            )}

                                            {message.role === "assistant" && (
                                                <>
                                                    <div>
                                                        <div className="avatar-name primary-bg">
                                                            <span className="avatar-content text-white">
                                                                <ChatGPT />
                                                            </span>
                                                        </div>
                                                        <span className="font-weight-600 ml-2">EduMentor AI</span>
                                                    </div>
                                                    <p
                                                        className="pl-5 ml-1 preserve-whitespace 
                                             pb-4 mb-4"
                                                    >
                                                        {message.content}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div
                    className="col col-sm-10 col-md-8 col-xl-6  d-flex flex-column h-100 justify-content-between w-100 pt-3 gpt-message-reviewer"
                    ref={gptMessageReviewerRef}
                >
                    <div className="d-flex flex-column px-0 my-3 m-0" ref={props.footerRef}>
                        {textLoading && (
                            <div className="w-100">
                                <Form.Text>{t("chatGPTTyping")}</Form.Text>
                            </div>
                        )}
                        <div className="w-100 mb-1 assistant-modal-footer">
                            <Form onSubmit={handleSubmit}>
                                <InputGroup className="align-items-end">
                                    <AutoResizedTextarea
                                        name={"content"}
                                        placeholder={t("askQuestion")}
                                        value={value.content}
                                        onChange={handleChange}
                                        onKeyDown={handleSubmit}
                                    />
                                    {isBrowser && (
                                        <Button
                                            variant={props.isRecording ? "danger" : "primary"}
                                            className="textarea-absolute-button"
                                            disabled={speechLoading}
                                            onClick={
                                                props.isRecording
                                                    ? props.handleStopRecording
                                                    : props.handleStartRecording
                                            }
                                        >
                                            {speechLoading ? (
                                                <div
                                                    className="spinner-border text-primary spinner-border-sm"
                                                    role="status"
                                                />
                                            ) : props.isRecording ? (
                                                <Record width={16} height={16} />
                                            ) : (
                                                <Mic />
                                            )}
                                        </Button>
                                    )}

                                    <Button
                                        disabled={textLoading}
                                        onClick={(e) => handleSubmit(e)}
                                        style={{ height: "36px", width: "40px" }}
                                    >
                                        {textLoading ? (
                                            <div
                                                className="spinner-border text-primary spinner-border-sm"
                                                role="status"
                                            />
                                        ) : (
                                            <Ask />
                                        )}
                                    </Button>
                                </InputGroup>
                            </Form>
                        </div>

                        <div className="w-100">
                            <Form.Text className="text-muted">Powered by ChatGPT</Form.Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioRecorderHoc(GptMessageReviewer)
