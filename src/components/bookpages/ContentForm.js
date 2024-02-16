import { useEffect } from "react"
import { getTranslatedText as t } from "../../_locale"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { utils } from "../../_helpers"
import { openAiActions } from "../../_actions/openAi.actions"
import FileSelector from "./partials/FileSelector"
import Textarea from "./partials/Textarea"

const ContentForm = ({ content, contentFormInputRef, formErrors, setContentValue }) => {
    const dispatch = useDispatch()

    const { messages } = useSelector((state) => state.openAi)

    useEffect(() => {
        content.detail !== "" && setContentValue(content.detail)
        content.detail !== ""
            ? setContentValue(content.detail)
            : utils.arrayHasLength(messages) &&
              setContentValue(`${messages[messages.length - 2].content}\n${messages[messages.length - 1].content}`)

        return () => {
            dispatch(openAiActions.clearMessages())
        }
    }, [content])

    const getContentFormElement = () => {
        switch (content.content_type_id) {
            case 1: //Text
            case 4: // Audio Embed
            case 6: // Video Embed
            case 7: // Url
            case 8: // Interactive Content
                return (
                    <Textarea
                        contentFormInputRef={contentFormInputRef}
                        content={content}
                        setContentValue={setContentValue}
                        messages={messages}
                        formErrors={formErrors}
                    />
                )
            case 2: // Image
            case 3: // Audio
            case 5: // Video
                return (
                    <FileSelector
                        contentFormInputRef={contentFormInputRef}
                        content={content}
                        formErrors={formErrors}
                        setContentValue={setContentValue}
                    />
                )
        }
    }

    return <div className="content-form pb-0">{getContentFormElement()}</div>
}

export default ContentForm
