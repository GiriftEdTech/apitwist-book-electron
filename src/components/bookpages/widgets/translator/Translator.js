import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"
import "react-color-palette/lib/css/styles.css"
import { languageList, getTranslatedText as t } from "../../../../_locale"
import useViewport from "../../../../_hooks/useViewport"
import SelectBar from "../../../partials/SelectBar"
import { useDispatch, useSelector } from "react-redux"
import { translateActions } from "../../../../_actions/translate.actions"
import ModalCloseButton from "../../../partials/ModalCloseButton"
import { utils } from "../../../../_helpers"
import SelectLanguage from "../../../partials/SelectLanguage"

const Translator = ({ setTranslatorOpen }) => {
    const dispatch = useDispatch()
    const { width, height } = useViewport()
    const { isDark } = useSelector((state) => state.theme)
    const { translatedText, loading } = useSelector((state) => state.translate)
    const [formValues, setFormValues] = useState({})
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0,
        y: 0
    })

    const handleDrag = (e, ui) => {
        const { x, y } = deltaPosition
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY
        })
    }

    const onInputChange = (field, value) => {
        setFormValues({ ...formValues, [field]: typeof value === "string" ? value.trim() : value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = {
            sl: utils.getLanguageShortage(formValues.sourceLang),
            tl: utils.getLanguageShortage(formValues.targetLang),
            q: formValues.requestedValue
        }
        dispatch(translateActions.getTranslatedText(data))
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event)
        }
    }

    const switchLanguages = () => {
        setFormValues({ ...formValues, sourceLang: formValues.targetLang, targetLang: formValues.sourceLang })
    }

    const handleHide = () => {
        setTranslatorOpen(false)
        dispatch(translateActions.clearTranslatedText())
        setFormValues({})
    }

    useEffect(() => {
        setDeltaPosition({ x: width / 2, y: height / 2 })
        let sourceLang = utils.languages().find((language) => language.shortLang === utils.getStore("locale"))
        setFormValues({
            ...formValues,
            sourceLang: sourceLang,
            targetLang: utils.languages()[0]
        })
    }, [])

    return (
        <Draggable
            handle=".drag"
            position={deltaPosition}
            onDrag={handleDrag}
            positionOffset={{ x: "-50%", y: "-50%" }}
            cancel=".translated-text, .form-input, .switch"
        >
            <div className="translator-main-container rounded shadow-lg cursor-move">
                <ModalCloseButton handleClick={() => handleHide()} />

                <div className="drag">
                    <div className="header d-flex p-3 align-items-center border-bottom bg-light top-left-radius top-right-radius">
                        <img
                            src={`${
                                isDark
                                    ? "/assets/img/toolbar/translate-language-dark.svg"
                                    : "/assets/img/toolbar/translate-language.svg"
                            }`}
                            alt=""
                            width={20}
                        />
                        <h3 className="ml-3 mb-0">{t("translation")}</h3>
                    </div>
                    <div className="body px-3 bottom-radius">
                        <form>
                            <div class="form-group d-flex pt-3">
                                <div className="w-100 pr-2">
                                    <SelectLanguage
                                        optionSelected={formValues.sourceLang}
                                        name="sourceLang"
                                        formValues={formValues}
                                        setFormValues={setFormValues}
                                    />
                                </div>

                                <div
                                    className="d-flex align-items-center switch cursor-pointer"
                                    onClick={() => switchLanguages()}
                                >
                                    <img src={`/assets/img/toolbar/switch-horizontal.svg`} alt="" width={20} />
                                </div>

                                <div className="w-100 pl-2">
                                    <SelectLanguage
                                        optionSelected={formValues.targetLang}
                                        name="targetLang"
                                        formValues={formValues}
                                        setFormValues={setFormValues}
                                    />
                                </div>
                            </div>

                            <div class="form-group form-input">
                                <textarea
                                    class="form-control"
                                    name="requestedValue"
                                    rows="4"
                                    autoFocus="true"
                                    placeholder={t("enterText")}
                                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                    onKeyDown={handleKeyDown}
                                ></textarea>
                            </div>
                        </form>

                        <div className="translated-text px-1 bg-light">
                            {loading && (
                                <div
                                    className="spinner-border"
                                    style={{ width: "1rem", height: "1rem", color: "var(--c-font-dark)" }}
                                    role="status"
                                />
                            )}
                            <p className="px-2">{translatedText === "" ? t("translation") : translatedText}</p>
                        </div>
                        <div className="py-3">
                            <small className="text-muted">Powered by Google Translate</small>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default Translator
