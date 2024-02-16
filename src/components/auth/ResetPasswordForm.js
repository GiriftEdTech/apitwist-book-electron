import React, { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { Button, Col, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { countriesService, institutionService, userService } from "../../_services"
import { getTranslatedText as t } from "../../_locale"
import { utils } from "../../_helpers"
import { userActions } from "../../_actions"
import { toast } from "react-toastify"

const ResetPasswordForm = ({ history }) => {
    const dispatch = useDispatch()
    const { loggedIn } = useSelector((state) => state.users)
    const alert = useSelector((state) => state.alert)

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [result, setResult] = useState({})
    const [emailValue, setEmailValue] = useState("")

    let search = window.location.search
    let params = new URLSearchParams(search)
    let email = params.get("email")
    let { token } = useParams()

    useEffect(() => {
        setEmailValue(params.get("email"))
    }, [email])

    useEffect(() => {
        if (!token) {
            history.push("/forgot")
        }
    }, [])

    const onInputChange = (field, value) => {
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
        const newErrors = {}
        let { email, password, confirm_password } = form

        if (!emailValue) {
            let { email } = form
            // email errors
            if (!email || email === "") {
                newErrors.email = t("enterEmail")
            } else if (!utils.isValidEmail(email)) newErrors.email = t("validEmail")
        }
        // password errors
        const password_regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/)
        if (!password || password === "") {
            newErrors.password = t("enterPassword")
            newErrors.confirm_password = t("enterPassword")
        } else if (password.length < 6 || password.length > 24) newErrors.password = t("passwordChars")
        else if (!password_regex.test(password)) newErrors.password = t("passwordRegex")
        else if (password !== confirm_password) {
            newErrors.password = t("passwordNotMatch")
            newErrors.confirm_password = t("passwordNotMatch")
        }

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
        setResult({})
        if (validate()) {
            let { email, password } = form
            if (emailValue) {
                email = emailValue
            }
            dispatch(userActions.resetPassword({ email, password, token }))
        } else {
            console.log(errors)
        }
    }

    useEffect(() => {
        if (loggedIn) history.push("/")
    }, [loggedIn])

    useEffect(() => {
        if (alert && alert.message) {
            toast.error(alert.message)
            setTimeout(() => {
                window.location.reload()
            }, 800)
        }
    }, [alert])

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} sm={12} md={12}>
                    <Form.Label>{t("email")}</Form.Label>
                    {emailValue ? (
                        <Form.Control type="email" defaultValue={emailValue} readOnly disabled />
                    ) : (
                        <>
                            <Form.Control
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                onChange={(e) => onInputChange("email", e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </>
                    )}
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm={12} md={12}>
                    <Form.Label>{t("password")}</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder={t("passwordPlaceholder")}
                        onChange={(e) => onInputChange("password", e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} sm={12} md={12}>
                    <Form.Label>{t("confirmPassword")}</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder={t("confirmPasswordPlaceholder")}
                        onChange={(e) => onInputChange("confirm_password", e.target.value)}
                        isInvalid={!!errors.confirm_password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Group className="d-flex justify-content-between my-4">
                <NavLink to="/login" className="btn btn-outline-primary">
                    {t("login")}
                </NavLink>
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        fontWeight: "600"
                    }}
                >
                    {t("resetPassword")}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default ResetPasswordForm
