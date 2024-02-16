import React from "react"
import { getTranslatedText as t } from "../../../_locale"

const ContentPreview = ({ content, setIframeHeight, contentViewRef, modalHeight }) => {
    const { content_type } = content
    const getModalBody = () => {
        const iframe = (detail) => {
            const validateIframe = (code) => {
                const pattern = /<iframe[^>]*src\s*=\s*["']([^"']*)["'][^>]*>*?<\/iframe>/
                return pattern.test(code)
            }
            if (validateIframe(detail)) {
                return { __html: detail }
            } else {
                return { __html: `<small class="text-danger">${t("invalidIframe")}</small>` }
            }
        }

        if (content.detail) {
            switch (content_type.id) {
                case 2:
                    return (
                        <img
                            src={
                                typeof content.detail === "object"
                                    ? URL.createObjectURL(content.detail)
                                    : typeof content.detail === null
                                    ? process.env.REACT_APP_CONTENT_URL + URL.createObjectURL(content.detail)
                                    : process.env.REACT_APP_CONTENT_URL + content.detail
                            }
                            alt="Image Content"
                            className="preview_image"
                        />
                    )
                    break
                case 3:
                    return (
                        <audio className="preview_audio" controls={true} controlsList="nodownload">
                            <source
                                src={
                                    typeof content.detail === "object"
                                        ? URL.createObjectURL(content.detail)
                                        : process.env.REACT_APP_CONTENT_URL + content.detail
                                }
                            />
                            Your browser does not support HTML5 Audio.
                        </audio>
                    )
                    break
                case 5:
                    return (
                        <video className="preview_video" controls={true} controlsList="nodownload">
                            <source
                                src={
                                    typeof content.detail === "object"
                                        ? URL.createObjectURL(content.detail)
                                        : process.env.REACT_APP_CONTENT_URL + content.detail
                                }
                            />
                            Your browser does not support HTML5 video.
                        </video>
                    )
                    break
                case 7:
                    const iframeDetail = `<iframe src="${content.detail}" class="inner_iframe" title="Iframe Example"></iframe>`
                    return (
                        <div
                            className="preview_iframe preview_iframe_url"
                            dangerouslySetInnerHTML={iframe(iframeDetail)}
                        />
                    )
                    break
                case 4:
                case 6:
                case 8:
                    return <div className="preview_iframe" dangerouslySetInnerHTML={iframe(content.detail)} />
                    break
                case 1:
                default:
                    return (
                        <div style={{ height: `${modalHeight - 75}px`, overflowY: "auto", marginRight: "-10px" }}>
                            <span>{content.detail}</span>
                        </div>
                    )
                    break
            }
        } else {
            setIframeHeight(160)
            return <span>{t("emptyContent")}</span>
        }
    }
    return (
        <div ref={contentViewRef} className="content-view">
            {getModalBody()}
        </div>
    )
}

export default ContentPreview
