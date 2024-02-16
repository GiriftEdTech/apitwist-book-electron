import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"
import "react-color-palette/lib/css/styles.css"
import { languageList, getTranslatedText as t } from "../../../../_locale"
import useViewport from "../../../../_hooks/useViewport"
import SelectBar from "../../../partials/SelectBar"
import { useDispatch, useSelector } from "react-redux"
import { Search } from "../../../icons"
import { imageSearcherActions } from "../../../../_actions"
import ImageGallery from "./ImageGallery"
import { utils } from "../../../../_helpers"
import ModalCloseButton from "../../../partials/ModalCloseButton"
import SelectLanguage from "../../../partials/SelectLanguage"

const ImageSearcher = ({ setImageSearcherOpen }) => {
    const dispatch = useDispatch()
    const { width, height } = useViewport()
    const { images } = useSelector((state) => state.imageSearcher)

    const [formValues, setFormValues] = useState({ requestedValue: "" })
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
            lang: utils.getLanguageShortage(formValues.lang),
            q: utils.replaceSpacesWithPlus(formValues.requestedValue)
        }
        if (!data.q) return
        dispatch(imageSearcherActions.getByText(data))
    }

    const handleHide = () => {
        setImageSearcherOpen(false)
        dispatch(imageSearcherActions.clearState())
    }

    useEffect(() => {
        setDeltaPosition({ x: width / 2, y: height / 6 })
        setFormValues({
            ...formValues,
            lang: utils.languages().find((language) => language.shortLang === utils.getStore("locale"))
        })
    }, [])

    return (
        <Draggable
            handle=".drag"
            position={deltaPosition}
            onDrag={handleDrag}
            positionOffset={{ x: "-50%", y: "0%" }}
            cancel=".cancel-drag"
        >
            <div className="image-searcher-main-container rounded shadow-lg cursor-move">
                <ModalCloseButton handleClick={() => handleHide()} />

                <div className="drag">
                    <div className="header d-flex p-3 align-items-center border-bottom bg-light top-left-radius top-right-radius">
                        <h3 className="mb-0">{t("imageSearcher")}</h3>
                    </div>
                    <div className="px-3 pt-3">
                        <div className="d-flex flex-lg-row flex-column mb-1">
                            <form
                                onSubmit={handleSubmit}
                                className="d-flex w-100 align-items-center pb-3 pb-lg-0 mr-lg-3 cancel-drag"
                            >
                                <div class="form-group mb-0 d-flex w-100 align-items-center position-relative">
                                    <input
                                        autoFocus="true"
                                        class="form-control"
                                        name="requestedValue"
                                        placeholder={t("enterText")}
                                        onChange={(e) => onInputChange(e.target.name, e.target.value)}
                                    />

                                    <div
                                        className="input-search-icon position-absolute p-2 cursor-pointer hover-bg d-flex align-items-center"
                                        style={{ right: 0 }}
                                        onClick={handleSubmit}
                                    >
                                        <Search />
                                    </div>
                                </div>
                            </form>
                            <div className="language-option cancel-drag">
                                <SelectLanguage
                                    optionSelected={formValues.lang}
                                    name="lang"
                                    placeHolder={t("selectLanguage")}
                                    formValues={formValues}
                                    setFormValues={setFormValues}
                                />
                            </div>
                        </div>

                        <small className={`text-muted ${utils.arrayHasLength(images) ? "show" : "hide"}`}>
                            <b>{utils.arrayHasLength(images) && images.length}</b> {t("resultsFound")}
                        </small>
                    </div>
                </div>

                <ImageGallery images={images} />

                <div className="footer p-3 bottom-radius">
                    <small className="text-muted">Powered by Pixabay</small>
                </div>
            </div>
        </Draggable>
    )
}

export default ImageSearcher
