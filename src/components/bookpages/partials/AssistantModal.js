import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { InputGroup, Form, Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { openAiActions } from "../../../_actions/openAi.actions"
import { contentTypes, utils } from "../../../_helpers"
import AudioRecorderHoc from "../../../_hooks/AudioRecorderHoc"
import { getTranslatedText as t } from "../../../_locale"
import { Ask, Mic, Record } from "../../icons"
import { isBrowser } from "react-device-detect"
import { openAiModels } from "../../../_helpers/openAiModels"
import ModelProgress from "./ModelProgress"
import { contentActions } from "../../../_actions/content.actions"
import AutoResizedTextarea from "../../partials/AutoResizedTextarea"
import { configActions } from "../../../_actions"

const AssistantModal = (props) => {
    const dispatch = useDispatch()
    const responseRef = useRef(null)
    const { messages, textLoading, speechLoading, text } = useSelector((state) => state.openAi)
    const [value, setValue] = useState({ role: "user", content: "" })
    const [selected, setSelected] = useState(openAiModels[0].model)
    const { contents } = useSelector((state) => state.pageDetails)
    const selectedModel = openAiModels.find((item) => item.model === selected)
    const handleSelect = (event) => {
        setSelected(event.target.value)
    }

    const handleChange = (name, value) => {
        setValue((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {
            e.preventDefault()
            if (value.content.trim() !== "") {
                dispatch(openAiActions.askChatGpt([...messages, value], selected))
                setValue({ role: "user", content: "" })
            }
        }
    }

    const handleHide = () => {
        props.onHide(false)
        dispatch(openAiActions.clearMessages())
    }

    const handleContent = () => {
        props.onHide(false)
        props.setShownContent(1) //to be able to open text content modal
        let createdBy = "chatbot"
        let createdAsStatically = true
        let { top, left } = utils.createContentPercentage(props.topBarRef, props.pageHeight, props.pageWidth, contents)
        dispatch(
            contentActions.store(
                props.pageId,
                contentTypes[0],
                top,
                left,
                createdAsStatically,
                undefined,
                createdBy,
                messages[messages.length - 1].content
            )
        )
        dispatch(configActions.toggleEditMode(true))
    }

    useEffect(() => {
        if (text?.text) {
            setValue((prevState) => ({
                ...prevState,
                content: text.text
            }))
        }
    }, [text])

    useEffect(() => {
        responseRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        if (text?.text) {
            setValue((prevState) => ({
                ...prevState,
                content: text.text
            }))
        }
    }, [text])

    return (
        <Modal
            {...props}
            onHide={() => handleHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bg-light">
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="modal_text_color"
                    style={{ fontSize: "20px" }}
                >
                    {t("teacherAssistant")}
                </Modal.Title>
            </Modal.Header>
            {utils.arrayHasLength(messages) && (
                <Modal.Body>
                    <div className="chat-modal-body px-3">
                        {messages.map((message) => {
                            return (
                                <div>
                                    {message.role === "user" && (
                                        <p ref={responseRef} className="mb-0 font-weight-500">
                                            {`${message.content}`}
                                        </p>
                                    )}

                                    {message.role === "assistant" && (
                                        <p className="preserve-whitespace border-bottom pb-4 mb-4">
                                            {utils.handleNewLine(message.content)}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {utils.arrayHasLength(messages) &&
                        messages[messages.length - 1]?.role === "assistant" &&
                        messages[messages.length - 1].content && (
                            <div className="d-flex justify-content-end p-2">
                                <button className="btn btn-primary btn-sm" onClick={() => handleContent()}>
                                    {utils.getContentTypeIcon(1, "16px", "16px")} {t("addToBook")}
                                </button>
                            </div>
                        )}
                </Modal.Body>
            )}

            <Modal.Footer className="d-flex flex-column m-0">
                {textLoading && (
                    <div className="px-3 w-100">
                        <Form.Text>{t("chatGPTTyping")}</Form.Text>
                    </div>
                )}
                <div className="px-3 w-100 mb-2 assistant-modal-footer">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label htmlFor="assistant">
                            <h4 className="my-0">{t("askMe")}</h4>
                        </Form.Label>
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
                                    onClick={props.isRecording ? props.handleStopRecording : props.handleStartRecording}
                                >
                                    {speechLoading ? (
                                        <div className="spinner-border text-primary spinner-border-sm" role="status" />
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
                                    <div className="spinner-border text-primary spinner-border-sm" role="status" />
                                ) : (
                                    <Ask />
                                )}
                            </Button>
                        </InputGroup>
                        <div className="mt-3 ">
                            <p className="small mb-0">Model: {utils.capitalize(selectedModel.model)}</p>
                        </div>
                    </Form>
                </div>
                {!utils.arrayHasLength(messages) && <ModelProgress selectedModel={selectedModel} />}
                <div className="px-3 w-100">
                    <Form.Text className="text-muted">Powered by ChatGPT</Form.Text>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
export default AudioRecorderHoc(AssistantModal)
