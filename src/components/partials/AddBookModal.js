import React, { useEffect, useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { getTranslatedText as t } from "../../_locale"
import { bookService } from "../../_services"
import { useDispatch } from "react-redux"
import { bookActions } from "../../_actions"

const AddBookModal = (props) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({})
    const [result, setResult] = useState({})
    const [errors, setErrors] = useState({})
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            })
    }

    const findFormErrors = () => {
        const { book_code } = form
        const newErrors = {}

        // book_code errors
        if (!book_code || book_code === "") newErrors.book_code = t("enterBookCode")

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setResult({})
        // get our new errors
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            const { book_code } = form

            bookService.subscribe(book_code).then((response) => {
                if (response["success"]) {
                    setResult({
                        text: response.message,
                        variant: "primary"
                    })
                    dispatch(bookActions.getAll())
                    setTimeout(
                        function () {
                            props.hideSelf()
                        }.bind(this),
                        800
                    )
                } else {
                    setResult({
                        text: response.error ?? response.message,
                        variant: "danger"
                    })
                }
            })
        }
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onExit={() => {
                setResult({})
                props.hideSelf()
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{t("addBook")}</Modal.Title>
            </Modal.Header>
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <h4>{t("addBookDetail")}</h4>

                    <Form.Group>
                        <Form.Label>{t("bookCode")}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t("bookCodePlaceholder")}
                            onChange={(e) => {
                                setField("book_code", e.target.value)
                                setResult({})
                            }}
                            isInvalid={!!errors.book_code}
                        />
                        <Form.Control.Feedback type="invalid">{errors.book_code}</Form.Control.Feedback>
                    </Form.Group>
                    {result && (
                        <Alert variant={result.variant} show={result.text ?? false}>
                            <Alert.Heading className={"mb-0"}>{result.text}</Alert.Heading>
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">
                        {t("addBook")}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default React.memo(AddBookModal)
