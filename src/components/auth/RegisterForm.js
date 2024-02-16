import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, Col, Form, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { countriesService, institutionService, userService } from "../../_services"
import { getTranslatedText as t } from "../../_locale"
import { utils } from "../../_helpers"
import { userActions } from "../../_actions"
import { Typeahead } from "react-bootstrap-typeahead"
import { toast } from "react-toastify"

const RegisterForm = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useSelector((state) => state.alert)
    const { loggedIn } = useSelector((state) => state.users)

    const [insts, setInsts] = useState({})
    const [countries, setCountries] = useState({})
    const [emailValue, setEmailValue] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [surnameValue, setSurnameValue] = useState("")
    const [institutionIdValue, setInstitutionIdValue] = useState("")
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const client_token = utils.getClientToken()

    const countryOptions = []
    const instOptions = []

    let search = window.location.search
    let params = new URLSearchParams(search)
    let invitationToken = params.get("invitation_token")

    const onKeyPress = (field, e) => {
        let pattern = ""

        switch (field) {
            case "phone":
                pattern = /[^0-9]/
                break

            case "book_code":
                pattern = /[^a-z0-9]/i
                break

            default:
                break
        }

        let result = e.key.match(pattern)
        if (result) {
            e.preventDefault()
        }
    }

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
        let { username, phone, book_code, institution, password, country, confirm_password } = form

        if (!nameValue) {
            let { name } = form
            // name errors
            if (!name || name === "") newErrors.name = t("enterName")
            else if (name.length < 3) newErrors.name = t("name3Char")
        }
        if (!surnameValue) {
            let { surname } = form
            // surname errors
            if (!surname || surname === "") newErrors.surname = t("enterSurname")
            else if (surname.length < 3) newErrors.surname = t("surname3Char")
        }
        if (!emailValue) {
            let { email } = form
            // email errors
            if (!email || email === "") {
                newErrors.email = t("enterEmail")
            } else if (!utils.isValidEmail(email)) newErrors.email = t("validEmail")

            // if invitation token not set book code is required
            if (!book_code || book_code === "") newErrors.book_code = t("enterBookCode")
        }

        // username errors
        if (!username || username === "") newErrors.username = t("enterUsername")
        else if (username.length < 3 || username.length > 24) newErrors.username = t("usernameChars")
        // else if (!username_regex.test(username))
        // newErrors.username = t('usernameRegex')

        // country errors
        if (!country || country === "" || country === "0") newErrors.country = t("selectCountry")

        // institution errors
        if (!invitationToken) {
            if (!institutionIdValue) {
                if (!institution || institution === "" || institution === "0")
                    newErrors.institution = t("selectInstitution")
            }
        }

        // phone errors
        if (!phone || phone === "") newErrors.phone = t("validPhone")
        else if (phone && phone !== "") {
            if (!parseInt(phone)) newErrors.phone = t("validPhone")
            else if (phone.toString().length !== 10) newErrors.phone = t("phone10Char")
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
        if (validate()) {
            let { name, surname, username, country, email, phone, password, book_code, institution } = form
            let invitation_token = invitationToken ?? ""
            if (nameValue) {
                name = nameValue
            }
            if (surnameValue) {
                surname = surnameValue
            }
            if (emailValue) {
                email = emailValue
            }
            if (institutionIdValue) {
                institution = institutionIdValue
            }
            if (invitationToken) {
                book_code = null
            }
            dispatch(
                userActions.register(
                    name,
                    surname,
                    username,
                    email,
                    phone,
                    password,
                    country,
                    book_code,
                    institution,
                    invitation_token
                )
            )
        } else {
            console.log(errors)
        }
    }

    useEffect(() => {
        if (client_token) {
            institutionService
                .getAll()
                .then((institutions) => {
                    setInsts(institutions)
                })
                .catch((error) => {
                    console.log("Error fetching institutions:", error)
                })
                .then(() => {
                    countriesService
                        .getAll()
                        .then((countries) => {
                            setCountries(countries)
                        })
                        .catch((error) => {
                            console.log("Error fetching countries:", error)
                        })
                })
                .then(() => {
                    if (invitationToken) {
                        userService
                            .getRegistrationForm(invitationToken)
                            .then((data) => {
                                if (data.email) setEmailValue(data.email)
                                if (data.name) setNameValue(data.name)
                                if (data.surname) setSurnameValue(data.surname)
                                if (data.institution_id) setInstitutionIdValue(data.institution_id)
                            })
                            .catch((error) => {
                                console.log("Error fetching registration form:", error)
                            })
                    }
                })
        }
    }, [client_token])

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
            {institutionIdValue !== "" &&
                insts &&
                insts[0] &&
                insts.map((institution) => {
                    if (institution.id === institutionIdValue) {
                        return (
                            <div key={institution.id} className="institution-text">
                                {t("invitedInstitution").length === 26 && t("invitedInstitution").slice(0, 25)}
                                <b>{institution.name}</b>
                                {t("invitedInstitution").length === 26
                                    ? t("invitedInstitution").slice(-1)
                                    : t("invitedInstitution").slice(-28)}
                            </div>
                        )
                    }
                })}
            <Form.Row>
                <Form.Group as={Col} sm={12} md={6}>
                    <Form.Label>{t("name")}</Form.Label>
                    {nameValue ? (
                        <Form.Control type="text" defaultValue={nameValue} readOnly disabled />
                    ) : (
                        <>
                            <Form.Control
                                type="text"
                                placeholder={t("namePlaceholder")}
                                onChange={(e) => onInputChange("name", e.target.value)}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </>
                    )}
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6}>
                    <Form.Label>{t("surname")}</Form.Label>
                    {surnameValue ? (
                        <Form.Control type="text" defaultValue={surnameValue} readOnly disabled />
                    ) : (
                        <>
                            <Form.Control
                                type="text"
                                placeholder={t("surnamePlaceholder")}
                                onChange={(e) => onInputChange("surname", e.target.value)}
                                isInvalid={!!errors.surname}
                            />
                            <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                        </>
                    )}
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} sm={12} md={6}>
                    <Form.Label>{t("username")}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t("usernamePlaceholder")}
                        onChange={(e) => {
                            let val = e.target.value.toLowerCase().replace(/\s/g, "")
                            onInputChange("username", val)
                        }}
                        value={form.username}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6}>
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
                <Form.Group as={Col} sm={12} md={6} controlId="country_id">
                    <Form.Label>{t("countryCode")}</Form.Label>

                    <>
                        {countries && countries[0] ? (
                            <>
                                {countries.map((country) => {
                                    countryOptions.push({
                                        value: country.id,
                                        label: `${country.name} (${country.phone_code})`
                                    })
                                })}
                                <Typeahead
                                    id="select1"
                                    className="is-invalid"
                                    options={countryOptions}
                                    onChange={(selected) =>
                                        onInputChange("country", selected && selected[0] && selected[0].value)
                                    }
                                    isInvalid={!!errors.country}
                                    placeholder={t("countryPlaceholder")}
                                />

                                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                            </>
                        ) : (
                            <>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => onInputChange("country", e.target.value)}
                                    isInvalid={!!errors.country}
                                >
                                    <option value={null}>{t("countryPlaceholder")}</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                            </>
                        )}
                    </>
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6}>
                    <Form.Label>{t("phone")}</Form.Label>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="phone-tooltip">{t("phoneDetail")}</Tooltip>}>
                        <Form.Control
                            type="text"
                            placeholder={t("phonePlaceholder")}
                            onChange={(e) => onInputChange("phone", e.target.value)}
                            onKeyPress={(e) => onKeyPress("phone", e)}
                            isInvalid={!!errors.phone}
                            maxLength="10"
                        />
                    </OverlayTrigger>

                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            {invitationToken === null && institutionIdValue === "" && (
                <Form.Row>
                    <Form.Group as={Col} sm={12} md={6} controlId="institution_id">
                        <Form.Label>{t("institution")}</Form.Label>
                        {institutionIdValue ? (
                            <Form.Control as="select" defaultValue={institutionIdValue} readOnly disabled>
                                {insts &&
                                    insts[0] &&
                                    insts.map((institution) => (
                                        <option key={institution.id} value={institution.id}>
                                            {institution.name}
                                        </option>
                                    ))}
                            </Form.Control>
                        ) : (
                            <>
                                {insts &&
                                    insts[0] &&
                                    insts.map((inst) => {
                                        instOptions.push({
                                            value: inst.id,
                                            label: inst.name
                                        })
                                    })}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="institution-tooltip">{t("institutionDetail")}</Tooltip>}
                                >
                                    <Typeahead
                                        id="select2"
                                        className="is-invalid"
                                        options={instOptions}
                                        onChange={(selected) =>
                                            onInputChange("institution", selected && selected[0] && selected[0].value)
                                        }
                                        isInvalid={!!errors.institution}
                                        placeholder={t("institutionPlaceholder")}
                                    />
                                </OverlayTrigger>

                                <Form.Control.Feedback type="invalid">{errors.institution}</Form.Control.Feedback>
                            </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} sm={12} md={6}>
                        <Form.Label>{t("bookCode")}</Form.Label>
                        {!(invitationToken && emailValue) ? (
                            <>
                                <Form.Control
                                    type="text"
                                    placeholder={t("bookCodePlaceholder")}
                                    onChange={(e) => onInputChange("book_code", e.target.value)}
                                    onKeyPress={(e) => onKeyPress("book_code", e)}
                                    isInvalid={!!errors.book_code}
                                />
                                <Form.Control.Feedback type="invalid">{errors.book_code}</Form.Control.Feedback>
                            </>
                        ) : (
                            <Form.Control type="text" placeholder={t("bookCodePlaceholder")} readOnly disabled />
                        )}
                    </Form.Group>
                </Form.Row>
            )}

            <Form.Row>
                <Form.Group as={Col} sm={12} md={6}>
                    <Form.Label>{t("password")}</Form.Label>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="password-tooltip">{t("passwordDetail")}</Tooltip>}
                    >
                        <Form.Control
                            type="password"
                            placeholder={t("passwordPlaceholder")}
                            onChange={(e) => onInputChange("password", e.target.value)}
                            isInvalid={!!errors.password}
                        />
                    </OverlayTrigger>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} sm={12} md={6}>
                    <Form.Label>{t("confirmPassword")}</Form.Label>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="passwordconf-tooltip">{t("confirmPasswordDetail")}</Tooltip>}
                    >
                        <Form.Control
                            type="password"
                            placeholder={t("confirmPasswordPlaceholder")}
                            onChange={(e) => onInputChange("confirm_password", e.target.value)}
                            isInvalid={!!errors.confirm_password}
                        />
                    </OverlayTrigger>
                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} sm={12} md={12} className="text-xs" controlId="policyCheck">
                    <Form.Label>
                        {t("policyCheck1")}
                        <NavLink to="/policies" target="_blank">
                            {t("policies")}
                        </NavLink>
                        {t("policyCheck2")}
                    </Form.Label>
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
                    {t("register")}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default RegisterForm
