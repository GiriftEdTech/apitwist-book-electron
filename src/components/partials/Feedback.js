import React, { useEffect, useState } from "react"
import { Col, Form, Modal } from "react-bootstrap"
import { feedbackService } from "../../_services"
import { getTranslatedText as t } from "../../_locale"
import { utils } from "../../_helpers"
import SelectBar from "./SelectBar"
import { useSelector } from "react-redux"

const Feedback = ({ show, setShow }) => {
    const { books } = useSelector((state) => state.books)

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [disable, setDisable] = useState(false)
    const [booksData, setBooksData] = useState([])
    const [optionSelected, setOptionSelected] = useState()

    const onInputChange = (field, value) => {
        setForm({ ...form, [field]: typeof value === "string" ? value.trim() : value })
        if (errors[field])
            setErrors({
                [field]: false
            })
    }

    const checkTextField = (formDetail) => {
        if (formDetail.length <= 19) {
            setErrors({ text: true })
            return false
        } else if (formDetail.length > 19) {
            setErrors({ text: false })
            return true
        }
    }

    useEffect(() => {
        if (form.detail) {
            checkTextField(form.detail)
        }
    }, [form.detail])

    const validate = ({ type, detail, section, book_id }) => {
        if (!section || section === "") {
            setErrors({ ...errors, section: true })
            return false
        }
        if (!type || type === "") {
            setErrors({ ...errors, type: true })
            return false
        }
        if (section === "content") {
            if (!book_id || book_id === "") {
                setErrors({ ...errors, book_id: true })
                return false
            }
        }
        if (!detail || detail === "") {
            setErrors({ ...errors, detail: true })
            return false
        } else {
            return checkTextField(detail)
        }
    }

    const handleSubmit = (e) => {
        const url = window.location.href
        const { type, detail, section, book_id, page } = form
        if (validate({ type, detail, section, book_id })) {
            setDisable(true)
            feedbackService.submitFeedback({ type, detail, url, section, book_id, page }).then((res) => {
                if (res.status === true) {
                    setForm({})
                    setShow(false)
                    setDisable(false)
                } else {
                    setDisable(false)
                }
            })
        }
    }

    useEffect(() => {
        if (utils.arrayHasLength(books)) {
            if (booksData.length === 0) {
                books.map((book) =>
                    setBooksData((prevState) => [
                        ...prevState,
                        {
                            value: book.id,
                            label: book.name
                        }
                    ])
                )
            }
        }
    }, [books])

    return (
        <>
            <Modal className="modal_text_color" centered show={show} onHide={() => setShow(false)}>
                <Modal.Header className="bg-light btn-close" closeButton>
                    <Modal.Title style={{ fontSize: 20 }}>{t("feedbackHeader")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="feedback_type">
                        <Form>
                            <Form.Group className="mb-2">
                                <Col sm={12} className="mb-2">
                                    <Form.Label className="px-0" as="legend" column>
                                        <h4 className="mb-0">{t("feedback")}</h4>
                                    </Form.Label>

                                    <Form.Check
                                        type="radio"
                                        style={{ fontSize: "14px" }}
                                        label={
                                            utils.getStore("locale") === "en" ? (
                                                <>
                                                    <span>{t("haveTechnicalFeedback")}</span> <strong>ApiTwist.</strong>
                                                </>
                                            ) : (
                                                <>
                                                    <strong>ApiTwist</strong> <span>{t("haveTechnicalFeedback")}</span>
                                                </>
                                            )
                                        }
                                        onChange={() => onInputChange("section", "website")}
                                        checked={form.section === "website"}
                                        id="formHorizontalRadios5"
                                    />

                                    <Form.Check
                                        type="radio"
                                        className="label"
                                        label={
                                            utils.getStore("locale") !== "tr" ? (
                                                <>
                                                    <span>{t("haveFeedback")}</span>{" "}
                                                    <strong>{t("contentOfBook")}</strong>
                                                </>
                                            ) : (
                                                <>
                                                    <strong>{t("contentOfBook")}</strong>{" "}
                                                    <span>{t("haveFeedback")}</span>
                                                </>
                                            )
                                        }
                                        style={{ fontSize: "14px" }}
                                        onChange={() => onInputChange("section", "content")}
                                        checked={form.section === "content"}
                                        id="formHorizontalRadios6"
                                    />

                                    {errors.section ? <div className="ml-3 required">{t("required")}</div> : ""}
                                </Col>

                                <Col sm={10} className="mb-2 mt-3">
                                    <Form.Label className="px-0" as="legend" column>
                                        <h4 className="mb-0">{t("type")}</h4>
                                    </Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label={t("feedbackLike")}
                                        style={{ fontSize: "14px" }}
                                        onChange={() => onInputChange("type", "like")}
                                        checked={form.type === "like"}
                                        id="formHorizontalRadios1"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t("feedbackDislike")}
                                        className="label"
                                        style={{ fontSize: "14px" }}
                                        onChange={() => onInputChange("type", "dislike")}
                                        checked={form.type === "dislike"}
                                        id="formHorizontalRadios2"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t("feedbackSuggestion")}
                                        className="label"
                                        style={{ fontSize: "14px" }}
                                        onChange={() => onInputChange("type", "suggestion")}
                                        checked={form.type === "suggestion"}
                                        id="formHorizontalRadios3"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={t("feedbackError")}
                                        className="label"
                                        style={{ fontSize: "14px" }}
                                        onChange={() => onInputChange("type", "error")}
                                        checked={form.type === "error"}
                                        id="formHorizontalRadios4"
                                    />
                                </Col>
                                {errors.type ? <div className="ml-3 required">{t("required")}</div> : ""}

                                {form.section === "content" && (
                                    <Col>
                                        <Form.Label className="mb-0 mt-3 px-0" as="legend" column>
                                            <h4 className="mb-0">{t("book")}</h4>
                                        </Form.Label>
                                        <SelectBar
                                            options={booksData}
                                            setBooksData={setBooksData}
                                            optionSelected={optionSelected}
                                            onInputChange={onInputChange}
                                            name="book_id"
                                            placeHolder={t("selectBook")}
                                        />
                                        {errors.book_id ? <div className="ml-3 required">{t("required")}</div> : ""}
                                        <Form.Label className="mb-0 mt-3 px-0" as="legend" column>
                                            <h4 className="mb-0">{t("page")}</h4>
                                        </Form.Label>
                                        <div>
                                            <Form.Control
                                                as="input"
                                                placeholder={t("pageNumbers")}
                                                onChange={(e) => onInputChange("page", e.target.value)}
                                            />
                                        </div>
                                    </Col>
                                )}
                                <Col>
                                    <Form.Label className="mb-0 mt-3 px-0" as="legend" column>
                                        <h4 className="mb-0">{t("writeFeedback")}</h4>
                                    </Form.Label>
                                    <div>
                                        <Form.Control
                                            as="textarea"
                                            placeholder={t("feedbackComment")}
                                            style={{ height: "100px" }}
                                            onChange={(e) => onInputChange("detail", e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    {errors.text ? <div className="ml-2 required">{t("minimumCharacter")}</div> : ""}
                    {errors.detail ? <div className="ml-2 required">{t("required")}</div> : ""}
                    <div className="d-flex justify-content-end">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            className="btn btn-primary mr-2 mb-2 d-flex justify-content-end"
                            disabled={disable}
                        >
                            {t("submit")}
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Feedback
