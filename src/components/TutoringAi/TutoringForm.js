import { useState } from "react"
import SelectBar from "../partials/SelectBar"
import { getTranslatedText as t } from "../../_locale"
import AutoResizedTextarea from "../partials/AutoResizedTextarea"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { openAiModels } from "../../_helpers/openAiModels"
import { openAiActions } from "../../_actions/openAi.actions"
import { uuid4 } from "../bookpages/sketch/utils"
import { utils } from "../../_helpers"
import { tutoringFormData } from "./constants"
import SelectLanguage from "../partials/SelectLanguage"

const TutoringForm = () => {
    const dispatch = useDispatch()
    const { messages, textLoading, speechLoading, text } = useSelector((state) => state.openAi)
    const [value, setValue] = useState({ role: "user", content: "" })

    const [fields, setFields] = useState({
        subject: "",
        schoolYear: "",
        topic: "",
        typeOfResource: "",
        lang: utils.languages().find((lang) => lang.shortLang === utils.getStore("locale"))
    })

    const [errors, setErrors] = useState({})

    const handleFieldChange = (field, value) => {
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }))
    }

    const validateForm = () => {
        const newErrors = {}

        Object.keys(fields).forEach((field) => {
            if (!fields[field]) {
                newErrors[field] = t("fieldIsRequired").replace(":field_name", t(field))
            }
        })

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const getQuestion = () => {
        return `I want you to create ${fields.typeOfResource} based on ${fields.topic} in ${fields.subject} lesson at ${fields.schoolYear} in ${fields.lang.label} language`
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const storedMessages = JSON.parse(utils.getStore("messages"))
        if (validateForm()) {
            let chatId = uuid4()

            dispatch(
                openAiActions.askChatGpt(
                    [
                        ...messages,
                        {
                            ...value,
                            content: getQuestion()
                        }
                    ],
                    openAiModels[0].model,
                    chatId
                )
            )

            utils.setStore(
                "messages",
                JSON.stringify({
                    ...storedMessages,
                    [chatId]: {
                        messages: [
                            {
                                role: "user",
                                content: getQuestion()
                            }
                        ]
                    }
                })
            )

            window.dispatchEvent(new Event("storage"))
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="col col-sm-10 col-md-8 col-xl-6 pl-5 w-100 tutoring-form">
            <div className="d-flex flex-column w-100 ">
                <h3>EduMentor AI</h3>
                <h4>{t("fillTheForm")}</h4>
                <div className="d-flex flex-column flex-sm-row mb-3 mb-sm-0">
                    <div className={`w-100 mb-3 ${errors.subject ? "error" : ""}`}>
                        <SelectBar
                            options={tutoringFormData.subject}
                            optionSelected={tutoringFormData.subject.find((option) => option.value === fields.subject)}
                            onInputChange={handleFieldChange}
                            name="subject"
                            placeHolder={t("selectSubject")}
                        />
                        {errors.subject && <small className="text-danger">{errors.subject}</small>}
                    </div>
                    <div className={`w-100 ml-sm-3 ${errors.schoolYear ? "error" : ""}`}>
                        <SelectBar
                            options={tutoringFormData.schoolYear}
                            optionSelected={tutoringFormData.schoolYear.find(
                                (option) => option.value === fields.schoolYear
                            )}
                            onInputChange={handleFieldChange}
                            name="schoolYear"
                            placeHolder={t("selectSchoolYear")}
                        />
                        {errors.schoolYear && <small className="text-danger">{errors.schoolYear}</small>}
                    </div>
                </div>
                <div className={`w-100 mb-3 ${errors.topic ? "error" : ""}`}>
                    <AutoResizedTextarea
                        name="topic"
                        placeholder={t("enterTopic")}
                        value={fields.topic || ""}
                        onChange={handleFieldChange}
                    />
                    {errors.topic && <small className="text-danger">{errors.topic}</small>}
                </div>
                <div className="d-flex mb-3 ">
                    <div className={`w-100 ${errors.typeOfResource ? "error" : ""}`}>
                        <SelectBar
                            options={tutoringFormData.typeOfResource}
                            optionSelected={tutoringFormData.typeOfResource.find(
                                (option) => option.value === fields.typeOfResource
                            )}
                            onInputChange={handleFieldChange}
                            name="typeOfResource"
                            placeHolder={t("selectTypeOfResource")}
                        />
                        {errors.typeOfResource && <small className="text-danger">{errors.typeOfResource}</small>}
                    </div>
                    <div className="w-100 pl-2 language">
                        <SelectLanguage
                            optionSelected={fields.lang}
                            name="lang"
                            formValues={fields}
                            setFormValues={setFields}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Button disabled={textLoading} className="btn" type="submit" style={{ width: "170px" }}>
                    {textLoading ? (
                        <div className="spinner-border text-primary spinner-border-sm " role="status" />
                    ) : (
                        t("generatePreview")
                    )}
                </Button>
            </div>
        </Form>
    )
}

export default TutoringForm
