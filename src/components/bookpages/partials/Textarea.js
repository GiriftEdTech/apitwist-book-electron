import React from "react"
import { Form } from "react-bootstrap"
import { getTranslatedText as t } from "../../../_locale"
import { utils } from "../../../_helpers"

const Textarea = ({ contentFormInputRef, content, setContentValue, messages, formErrors }) => {
    return (
        <>
            <Form.Group className="mb-2" controlId="contentInput">
                <Form.Control
                    ref={contentFormInputRef}
                    rows={3}
                    height="100%"
                    className={`content-form-input ${Object.keys(formErrors).length > 0 ? "error" : ""}`}
                    as="textarea"
                    placeholder={content.content_type.name === "textarea" ? t("enterText") : t("enterEmbed")}
                    onChange={(e) => setContentValue(e.target.value)}
                    defaultValue={
                        content.detail !== ""
                            ? content.detail
                            : utils.arrayHasLength(messages)
                            ? `${messages[messages.length - 2].content}\n${messages[messages.length - 1].content}`
                            : ""
                    }
                />
            </Form.Group>
            {Object.keys(formErrors).length > 0 && (
                <span className={`${Object.keys(formErrors).length > 0 ? "error" : ""}`}>{formErrors.error}</span>
            )}
        </>
    )
}

export default Textarea
