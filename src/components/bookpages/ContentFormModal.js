import React, { useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { getTranslatedText as t } from "../../_locale"
import { Form } from "react-bootstrap"
import { useState } from "react"
import { contentActions } from "../../_actions/content.actions"
import { useDispatch, useSelector } from "react-redux"
import { utils } from "../../_helpers"
import { openAiActions } from "../../_actions/openAi.actions"

const ContentFormModal = ({ show, onHide, content, contentPositionX, contentPositionY, pageId }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.users)
    const { messages } = useSelector((state) => state.openAi)
    const [contentValue, setContentValue] = useState()
    const [formErrors, setFormErrors] = useState({})

    const findFormErrors = () => {
        const newErrors = {}

        switch (content.content_type.name) {
            case "textarea":
                if (!contentValue || contentValue.length < 3) {
                    newErrors.error = t("textError")
                }
                break
            case "website":
                if (!contentValue || !contentValue.includes("http")) {
                    newErrors.error = t("httpError")
                }
                break
            case "audioEmbed":
            case "videoEmbed":
            case "embed":
            default:
                if (!contentValue || !contentValue.includes("<iframe")) {
                    newErrors.error = t("iframeError")
                }
        }

        return newErrors
    }

    const validate = () => {
        if (Object.keys(findFormErrors()).length > 0) {
            setFormErrors(findFormErrors())
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            dispatch(
                contentActions.update(pageId, content.id, content.pivot.top, content.pivot.left, contentValue, content)
            )
            onHide()
            setFormErrors({})
        }
    }

    useEffect(() => {
        content.detail !== "" && setContentValue(content.detail)
        content.detail !== ""
            ? setContentValue(content.detail)
            : utils.arrayHasLength(messages) &&
              setContentValue(`${messages[messages.length - 2].content}\n${messages[messages.length - 1].content}`)

        return () => {
            dispatch(openAiActions.clearMessages())
        }
    }, [content])

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    onHide()
                    setFormErrors({})
                }}
                className="modal_text_color"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size={content.detail === null || content.detail === "" ? "md" : "lg"}
            >
                <Modal.Header closeButton className="align-items-center">
                    <Modal.Title style={{ fontSize: 20 }}>
                        {utils.getContentNameByUser(content.content_type.name, user)}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="content-form pt-1 pb-0">
                        <Form.Group className="mb-2" controlId="contentInput">
                            <Form.Label>
                                <h4 className="my-0">{Object.keys(content).length > 0 && t(content.contentType)}</h4>
                            </Form.Label>
                            <Form.Control
                                rows={content.detail === null || content.detail === "" ? 3 : 14}
                                className={`${Object.keys(formErrors).length > 0 ? "error" : ""}`}
                                as="textarea"
                                placeholder={
                                    content.content_type.name === "textarea" ? t("enterText") : t("enterEmbed")
                                }
                                onChange={(e) => setContentValue(e.target.value)}
                                defaultValue={
                                    content.detail !== ""
                                        ? content.detail
                                        : utils.arrayHasLength(messages)
                                        ? `${messages[messages.length - 2].content}\n${
                                              messages[messages.length - 1].content
                                          }`
                                        : ""
                                }
                            />
                        </Form.Group>
                        {Object.keys(formErrors).length > 0 && (
                            <span className={`${Object.keys(formErrors).length > 0 ? "error" : ""}`}>
                                {formErrors.error}
                            </span>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="justify-content-between">
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                                onHide()
                                setFormErrors({})
                            }}
                        >
                            {t("cancel")}
                        </Button>
                        <Button size="sm" variant="primary" type="submit">
                            {t("save")}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ContentFormModal
