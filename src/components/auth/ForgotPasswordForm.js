import React, { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, Col, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { getTranslatedText as t } from "../../_locale"
import { utils } from "../../_helpers"
import { userService } from "../../_services"
import { toast } from "react-toastify"
import { ChevronLeft } from "../icons"

const ForgotPasswordForm = ({ history }) => {
    const { loggedIn } = useSelector((state) => state.users)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const emailInputRef = useRef(null)
    const onInputChange = (field, value) => {
        setForm({
            ...form,
            [field]: value.trim()
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            })
    }

    const findFormErrors = () => {
        const newErrors = {}
        let email = form.email ? form.email.trim() : emailInputRef?.current?.value?.trim()

        // email errors
        if (!email || email === "") {
            newErrors.email = t("enterEmail")
        } else if (!utils.isValidEmail(email)) newErrors.email = t("validEmail")

        return newErrors
    }

    const validate = () => {
        // get our new errors
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            let email = form.email ? form.email.trim() : emailInputRef?.current?.value?.trim()
            userService.forgotPassword(email).then((response) => {
                if (response) {
                    if (response.success) {
                        toast.success(response.message)
                    } else {
                        toast.error(response.error ?? response.message)
                    }
                }
            })
        } else {
            console.log(errors)
        }
    }

    useEffect(() => {
        if (loggedIn) history.push("/")
    }, [loggedIn])

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={12} md={12}>
                    <Form.Label>{t("email")}</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        onChange={(e) => onInputChange("email", e.target.value)}
                        isInvalid={!!errors.email}
                        ref={emailInputRef}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Group className="my-4">
                <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    style={{
                        fontWeight: "600"
                    }}
                >
                    {t("forgotButton")}
                </Button>
                <NavLink
                    to="/login"
                    className="d-flex align-items-center justify-content-center mt-3 w-100 btn btn-link text-muted"
                >
                    <ChevronLeft className="mr-2" /> <small>{t("login")}</small>
                </NavLink>
            </Form.Group>
        </Form>
    )
}

export default ForgotPasswordForm
