import React, { useEffect, useState } from "react"
import { getTranslatedText as t } from "../../_locale"
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../_actions"
import { toast } from "react-toastify"
// import { countriesService } from '../../_services'
import { utils } from "../../_helpers"
import { NavLink } from "react-router-dom"
import { ArrowLeft, Loader } from "../../components/icons"

const ProfileEdit = ({ history }) => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const user = useSelector((state) => state.users.user)
    const alert = useSelector((state) => state.alert)

    const [isPasswordChange, setIsPasswordChange] = useState(false)
    const [selectedFile, setSelectedFile] = useState("")
    // const [countries, setCountries] = useState({})
    // const countryOptions = []
    // const { client_token } = utils.getClientToken()

    const [form, setForm] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        phone: "",
        oldPassword: "",
        password: "",
        confirm_password: ""
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (alert && alert.message && alert.type) {
            if (alert.type === "alert-success") {
                toast.success(t(alert.message))
                setTimeout(() => {
                    history.push("/profile")
                }, 800)
            } else if (alert.type === "alert-danger") {
                toast.error(t(alert.message))
            }
        }
    }, [alert])

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                phone: user.phone
            })
            const display_image = document.getElementById("display-image")
            if (user && Object.keys(user).length > 0) {
                if (user.avatar && user.avatar.url) {
                    display_image.style.cssText = `width:100px;height:100px;background-size:cover;background-image:url(${
                        process.env.REACT_APP_CONTENT_URL + user.avatar.url
                    })`
                } else {
                    const firstLetters = (user.name.charAt(0) + user.surname.charAt(0)).toUpperCase()

                    display_image.innerHTML = `
        <div class="avatar-name avatar-name-big shadow">
          <span class="avatar-content">${firstLetters}</span>
        </div>`
                }
            }
        }
    }, [user])

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader()
            const display_image = document.getElementById("display-image")
            reader.addEventListener("load", () => {
                let uploaded_image = reader.result
                display_image.style.cssText = `width:100px;height:100px;background-size:cover;background-image:url(${uploaded_image})`
            })
            display_image.innerHTML = ""
            reader.readAsDataURL(selectedFile)
        }
    }, [selectedFile])

    // useEffect(() => {
    //   if (client_token) {
    //     countriesService.getAll().then((countries) => {
    //       setCountries(countries)
    //     })
    //   }
    // }, [client_token])

    const onFileChange = (e) => {
        const ext = ["image/jpeg", "image/jpg", "image/png"]
        if (ext.includes(e.target.files[0].type)) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            let {
                name,
                surname,
                username,
                email,
                /* country, */
                phone,
                oldPassword,
                password,
                confirm_password
            } = form
            if (isPasswordChange) {
                dispatch(
                    userActions.update(
                        name,
                        surname,
                        username,
                        selectedFile,
                        email,
                        //country,
                        phone,
                        oldPassword,
                        password,
                        confirm_password
                    )
                )
            } else {
                dispatch(
                    userActions.update(
                        name,
                        surname,
                        username,
                        selectedFile,
                        email,
                        //country,
                        phone
                    )
                )
            }
        } else {
            console.log(errors)
        }
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

    const onInputChange = (field, value) => {
        if (field == "phone") {
            let pattern = /[^0-9]/
            let result = value.match(pattern)
            if (result) return false
        }
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
        let {
            name,
            surname,
            email,
            username,
            phone,
            //country,
            oldPassword,
            password,
            confirm_password
        } = form

        // name errors
        if (!name || name === "") newErrors.name = t("enterName")
        else if (name.length < 3) newErrors.name = t("name3Char")

        // surname errors
        if (!surname || surname === "") newErrors.surname = t("enterSurname")
        else if (surname.length < 3) newErrors.surname = t("surname3Char")

        // email errors
        if (!email || email === "") {
            newErrors.email = t("enterEmail")
        } else if (!utils.isValidEmail(email)) newErrors.email = t("validEmail")

        // username errors
        if (!username || username === "") newErrors.username = t("enterUsername")
        else if (username.length < 3 || username.length > 24) newErrors.username = t("usernameChars")

        // country errors
        // if (!country || country === '' || country === '0')
        //     newErrors.country = t('selectCountry')

        // phone errors
        if (!phone || phone === "") newErrors.phone = t("validPhone")
        else if (phone && phone !== "") {
            if (!parseInt(phone)) newErrors.phone = t("validPhone")
            else if (phone.toString().length !== 10) newErrors.phone = t("phone10Char")
        }

        if (isPasswordChange) {
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

            if (!oldPassword || oldPassword === "") {
                newErrors.oldPassword = t("enterOldPassword")
            } else if (oldPassword.length < 6 || oldPassword.length > 24) newErrors.oldPassword = t("passwordChars")
            else if (!password_regex.test(oldPassword)) newErrors.oldPassword = t("passwordRegex")
        }

        return newErrors
    }

    return (
        <Row>
            <Col lg="12">
                <div className="d-flex  my-3">
                    <div id="display-image" />
                    <div className="d-flex flex-column justify-content-around ml-4">
                        <h4 className="profile-heading">{user ? user.name + " " + user.surname : ""}</h4>
                        <div className="profile-buttons">
                            <Button
                                onClick={() => {
                                    const uploader = document.getElementById("custom-file")
                                    uploader.click()
                                }}
                            >
                                {t("changeAvatar")}
                            </Button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col lg="12">
                <span className="text-muted" style={{ fontSize: "14px" }}>
                    *{t("allowedExtensions")}
                </span>
            </Col>
            <Col lg="12" className="profile-card py-4">
                <Form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.File
                        id="custom-file"
                        label={selectedFile ? selectedFile.name : t("profilePicture")}
                        onChange={(e) => onFileChange(e)}
                        accept="image/png,image/jpg,image/jpeg"
                        data-browse={t("choose")}
                        custom
                    />
                    <Form.Row>
                        <Form.Group as={Col} sm={12} md={4}>
                            <Form.Label>{t("name")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("namePlaceholder")}
                                onChange={(e) => onInputChange("name", e.target.value)}
                                value={form.name}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={4}>
                            <Form.Label>{t("surname")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("surnamePlaceholder")}
                                onChange={(e) => onInputChange("surname", e.target.value)}
                                value={form.surname}
                                isInvalid={!!errors.surname}
                            />
                            <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm={12} md={4}>
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
                        <Form.Group as={Col} sm={12} md={4}>
                            <Form.Label>{t("email")}</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                onChange={(e) => onInputChange("email", e.target.value)}
                                value={form.email}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group as={Col} sm={12} md={4} controlId="country_id">
                                    <Form.Label>{t('countryCode')}</Form.Label>
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
                                                    id='select1'
                                                    className='is-invalid'
                                                    options={countryOptions}
                                                    onChange={(selected) => onInputChange('country', selected && selected[0] && selected[0].value)}
                                                    isInvalid={!!errors.country}
                                                    placeholder={t('countryPlaceholder')}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.country}
                                                </Form.Control.Feedback>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Control
                                                    as="select"
                                                    onChange={(e) => onInputChange('country', e.target.value)}
                                                    isInvalid={!!errors.country}
                                                >
                                                    <option value={null}>{t('countryPlaceholder')}</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.country}
                                                </Form.Control.Feedback>
                                            </>
                                        )}
                                    </>
                                </Form.Group> */}

                        <Form.Group as={Col} sm={12} md={4} className="mb-5">
                            <Form.Label>{t("phone")}</Form.Label>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="phone-tooltip">{t("phoneDetail")}</Tooltip>}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={t("phonePlaceholder")}
                                    onChange={(e) => onInputChange("phone", e.target.value)}
                                    value={form.phone}
                                    isInvalid={!!errors.phone}
                                    maxLength="10"
                                />
                            </OverlayTrigger>

                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={12} md={12}>
                            <Form.Check
                                type="checkbox"
                                id="changePassword"
                                label={t("passwordChange")}
                                onClick={() => {
                                    setIsPasswordChange(!isPasswordChange)
                                }}
                                defaultChecked={!isPasswordChange}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm={12} md={4}>
                            <Form.Label>{t("oldPassword")}</Form.Label>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="password-tooltip">{t("passwordSuggestion")}</Tooltip>}
                            >
                                <Form.Control
                                    type="password"
                                    placeholder={t("passwordPlaceholder")}
                                    onChange={(e) => onInputChange("oldPassword", e.target.value)}
                                    isInvalid={!!errors.oldPassword}
                                    disabled={!isPasswordChange}
                                />
                            </OverlayTrigger>
                            <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={4}>
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
                                    disabled={!isPasswordChange}
                                />
                            </OverlayTrigger>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} md={4}>
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
                                    disabled={!isPasswordChange}
                                />
                            </OverlayTrigger>
                            <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="d-flex justify-content-between my-4">
                        <Form.Group>
                            <NavLink to="/profile">
                                <Button
                                    variant="outline-secondary"
                                    style={{
                                        fontWeight: "600"
                                    }}
                                >
                                    <ArrowLeft /> {t("profile")}
                                </Button>
                            </NavLink>
                        </Form.Group>
                        <Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{
                                    fontWeight: "600"
                                }}
                                disabled={users.loading ? true : ""}
                            >
                                {users.loading ? <Loader /> : ""} {t("saveChanges")}
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileEdit
