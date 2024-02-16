import React, { useEffect, useRef, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import { userActions } from "../../_actions"
import { useDispatch, useSelector } from "react-redux"
import { utils } from "../../_helpers"
import { getTranslatedText as t } from "../../_locale"

const LoginForm = () => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.alert)
    const { loggedIn } = useSelector((state) => state.users)
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const setField = (field, value) => {
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
        let email = form.email ? form.email.trim() : emailInputRef?.current?.value?.trim()
        let password = form.password ? form.password.trim() : passwordInputRef?.current?.value
        const newErrors = {}
        // email errors
        if (!email || email === "") newErrors.email = t("enterEmail")
        else if (!utils.isValidEmail(email)) newErrors.email = t("validEmail")

        // password errors
        if (!password || password === "") newErrors.password = t("enterPassword")
        else if (password.length < 6 || password.length > 24) newErrors.password = t("passwordChars")
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            let email = form.email ? form.email.trim() : emailInputRef?.current?.value?.trim()
            let password = form.password ? form.password.trim() : passwordInputRef?.current?.value
            dispatch(userActions.login(email, password))
        }
    }

    useEffect(() => {
        if (utils.getPasswordToken() && utils.getPasswordToken() !== "ankuzef_token") {
            if (loggedIn) history.push("/")
        }
    }, [loggedIn])

    useEffect(() => {
        if (alert && alert.message) {
            setTimeout(() => {
                window.location.reload()
            }, 800)
        }
    }, [alert])

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>{t("email")}</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    onChange={(e) => setField("email", e.target.value)}
                    isInvalid={!!errors.email}
                    ref={emailInputRef}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                    onChange={(e) => setField("password", e.target.value)}
                    isInvalid={!!errors.password}
                    ref={passwordInputRef}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <NavLink to="/forgot" className="forgot_button">
                {t("forgotPassword")}
            </NavLink>

            <Form.Group className="d-flex justify-content-between my-4">
                <NavLink to="/register" className="btn btn-outline-primary">
                    {t("register")}
                </NavLink>
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        fontWeight: "600"
                    }}
                >
                    {t("login")}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm
