import React, { useState } from "react"
import { utils } from "../../../_helpers"
import { getTranslatedText as t } from "../../../_locale"
import { Form } from "react-bootstrap"

const FileSelector = ({ content, formErrors, setContentValue, contentFormInputRef }) => {
    const [fileName, setFileName] = useState("")

    const fileSelectHandler = (e) => {
        if (e.target.files[0]) {
            setContentValue(e.target.files[0])

            setFileName(e.target.files[0].name)
        }
    }

    return (
        <>
            <Form.Group className="custom-file d-flex">
                <Form.Control
                    ref={contentFormInputRef}
                    type="file"
                    className="form-control custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => fileSelectHandler(e)}
                    lang={utils.getStore("locale")}
                    accept={`${content.content_type.detail.toLowerCase() + "/*"}`}
                />
                <Form.Label className="custom-file-label cursor-pointer" htmlFor="inputGroupFile01">
                    {fileName === "" ? t(`choose_${content.content_type.detail.toLowerCase()}`) : fileName}
                </Form.Label>
            </Form.Group>

            {Object.keys(formErrors).length > 0 && <span className={`class-form-error error`}>{formErrors.error}</span>}
        </>
    )
}

export default FileSelector
