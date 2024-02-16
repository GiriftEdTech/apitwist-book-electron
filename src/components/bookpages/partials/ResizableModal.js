import React, { useEffect, createRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"
import Draggable from "react-draggable"
import { ResizableBox } from "react-resizable"
import "react-resizable/css/styles.css"
import { X, Maximize, Minimize } from "../../icons"
import Portal from "./Portal"
import { getTranslatedText as t } from "../../../_locale"
import useViewport from "../../../_hooks/useViewport"
import { contentActions } from "../../../_actions/content.actions"
import Swal from "sweetalert2"
import { useRef } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { utils } from "../../../_helpers"
import ContentForm from "../ContentForm"
import ContentPreview from "../contents/ContentPreview"

const ResizableModal = ({
    resizableModalShow,
    setResizableModalShow,
    fullSizeShow,
    setFullSizeShow,
    content,
    shownContent,
    isEditable,
    pageId,
    pageWidth
}) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const resizableRef = useRef()
    const contentFormInputRef = createRef()
    const contentModalHeaderRef = useRef()
    const contentModalFooterRef = useRef()
    const contentViewRef = useRef()
    const contentFooterInfoRef = useRef()
    const { width, height } = useViewport()
    const { isEditModeOpen } = useSelector((state) => state.config)
    const { user } = useSelector((state) => state.users)
    const { bookmarked } = useSelector((state) => state.bookmarks)
    const [modalHeight, setModalHeight] = useState(466)
    const [modalWidth, setModalWidth] = useState(500)
    const [contentValue, setContentValue] = useState()
    const [formErrors, setFormErrors] = useState({})
    const [isResizing, setResizing] = useState(false)

    let modalOffset = 30
    const { content_type } = content
    const findFormErrors = () => {
        const newErrors = {}
        switch (content.content_type.name) {
            case "textarea":
                if (!contentValue || contentValue.length < 3) {
                    newErrors.error = t("textError")
                }
                break
            case "url":
                if (!contentValue || !contentValue.includes("http")) {
                    newErrors.error = t("httpError")
                }
                break
            case "audioEmbed":
            case "videoEmbed":
            case "embed":
                if (!contentValue || !contentValue.includes("<iframe")) {
                    newErrors.error = t("iframeError")
                }
                break
            case "audio":
            case "video":
            case "image":
                if (!contentValue || contentValue === "") {
                    newErrors.error = t("fileError")
                }
            default:
                newErrors
        }
        return newErrors
    }
    const setFrameSize = (width, height) => {
        const contentHeader = document.getElementsByClassName("content-header")
        const contentFooter = document.getElementsByClassName("content-footer")
        const contentForm = document.getElementsByClassName("content-form")[0]?.children[0]?.children[0]

        if (isEditModeOpen) {
            if (utils.arrayHasLength(contentHeader) && utils.arrayHasLength(contentFooter) && contentForm) {
                setIframeHeight(height - (contentHeader[0].clientHeight + contentFooter[0].clientHeight + modalOffset))
            }
        } else {
            setIframeHeight(height - (55 + modalOffset))
            setIframeWidth(width - 20)
        }
        setIframeWidth(width - 20)
    }

    const handleResize = (e, { size }) => {
        isResizing && setFrameSize(size.width, size.height)
        setModalHeight(size.height)
        setModalWidth(size.width)
    }

    const setIframeWidth = (width) => {
        let iframe = document.querySelector("iframe") || document.getElementsByClassName("content-view")[0]?.children[0]

        if (iframe) {
            iframe.width = width
        }
    }

    const setIframeHeight = (height) => {
        let iframe = document.querySelector("iframe") || document.getElementsByClassName("content-view")[0]?.children[0]
        let contentForm = document.getElementsByClassName("content-form")[0]?.children[0]?.children[0]

        if (contentForm && iframe) {
            contentForm.style.height = (height / 4) * 1 + "px"
            iframe.style.height = (height / 4) * 3 + "px"
        }
        if (!contentForm && iframe) {
            iframe.style.height = height + "px"
        }

        if (contentForm && contentForm.nodeName !== "INPUT" && !iframe) {
            contentForm.style.height = height + "px"
        }
    }

    const handleMaximize = () => {
        setResizableModalShow(false)
        setFullSizeShow(true)
    }

    const handleDelete = () => {
        let isUserStudent = utils.objectHasLength(user) && !utils.userIsNotStudent(user)
        if (!content.detail) {
            dispatch(
                contentActions.detach(
                    pageId,
                    content.id,
                    isUserStudent && utils.pageHasBookmark(bookmarked, pageId, id) && id
                )
            )
            return
        }
        Swal.fire({
            title: t("areYouSure"),
            text: t("noRevert"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("yesDelete")
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(
                    contentActions.detach(
                        pageId,
                        content.id,
                        isUserStudent && utils.pageHasBookmark(bookmarked, pageId, id) && id
                    )
                )
                Swal.fire({
                    timer: 1500,
                    showConfirmButton: false,
                    title: t("deleted"),
                    text: t("hasBeenDeleted").replace(
                        ":field_name",
                        t("content").charAt(0).toUpperCase() + t("content").slice(1)
                    ),
                    icon: "success"
                })
            }
        })
    }

    const validate = () => {
        if (Object.keys(findFormErrors()).length > 0) {
            setFormErrors(findFormErrors())
            return false
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            dispatch(
                contentActions.update(pageId, content.id, content.pivot.top, content.pivot.left, contentValue, content)
            )
            setResizableModalShow(false)

            setFormErrors({})
        }
    }

    useEffect(() => {
        if (fullSizeShow) {
            setIframeWidth(width - 25)
            setIframeHeight(height - 150)
            return
        }
        if (resizableModalShow && !isResizing) {
            if (shownContent === content.id) {
                const contentHeader = contentModalHeaderRef.current ?? null
                const contentForm = contentFormInputRef.current ?? null
                const contentView = contentViewRef.current ?? null
                const contentFooter = contentModalFooterRef.current ?? null
                const contentFooterInfo = contentFooterInfoRef.current ?? null

                let headerHeight = contentHeader && contentHeader.clientHeight
                let formHeight = contentForm && contentForm.clientHeight
                let viewHeight = contentView && contentView.clientHeight
                let footerHeight = contentFooter && contentFooter.clientHeight
                let footerInfoHeight = contentFooterInfo && contentFooterInfo.clientHeight

                let headerWidth = contentHeader && contentHeader.clientWidth

                if (isEditModeOpen && content.content_type_id !== 1 && content.content_type_id !== 8) {
                    if (content.detail || contentValue) {
                        if (headerHeight && formHeight && viewHeight && footerHeight) {
                            handleResize(null, {
                                size: {
                                    height: headerHeight + formHeight + viewHeight + footerHeight + modalOffset,
                                    width: headerWidth
                                }
                            })
                        }
                    } else {
                        if (headerHeight && formHeight && footerHeight) {
                            handleResize(null, {
                                size: {
                                    height: headerHeight + formHeight + footerHeight + modalOffset,
                                    width: headerWidth
                                }
                            })
                        }
                    }
                } else if (isEditModeOpen && content.content_type_id === 8) {
                    if (content.detail && contentValue) {
                        if (headerHeight && formHeight && footerHeight && footerInfoHeight && viewHeight) {
                            handleResize(null, {
                                size: {
                                    height:
                                        headerHeight +
                                        formHeight +
                                        footerHeight +
                                        modalOffset +
                                        footerInfoHeight +
                                        viewHeight,
                                    width: headerWidth
                                }
                            })
                        }
                        if (headerHeight && formHeight && footerHeight && footerInfoHeight) {
                            handleResize(null, {
                                size: {
                                    height: headerHeight + formHeight + footerHeight + modalOffset + footerInfoHeight,

                                    width: headerWidth
                                }
                            })
                        }
                    } else {
                        if (headerHeight && formHeight && footerHeight) {
                            handleResize(null, {
                                size: {
                                    height: headerHeight + formHeight + footerHeight + modalOffset,
                                    width: headerWidth
                                }
                            })
                        }
                        if (headerHeight && viewHeight) {
                            handleResize(null, {
                                size: {
                                    height: headerHeight + viewHeight + footerHeight + modalOffset,
                                    width: headerWidth
                                }
                            })
                        }
                    }
                } else if (isEditModeOpen && content.content_type_id === 1) {
                    if (headerHeight && formHeight && footerHeight) {
                        handleResize(null, {
                            size: {
                                height: headerHeight + formHeight + footerHeight + modalOffset,
                                width: headerWidth
                            }
                        })
                    }
                } else if (!isEditModeOpen && content.content_type_id !== 1 && content.content_type_id !== 8) {
                    if (headerHeight && viewHeight) {
                        handleResize(null, {
                            size: {
                                height: headerHeight + viewHeight + modalOffset,
                                width: headerWidth
                            }
                        })
                    }
                    if (resizableRef.current) {
                        const img = resizableRef.current.querySelector("img")

                        if (img) {
                            img.onload = function () {
                                setModalHeight(resizableRef.current.clientHeight + headerHeight)
                            }
                        }
                    }
                } else if (!isEditModeOpen && content.content_type_id === 8) {
                    if (headerHeight && viewHeight && footerInfoHeight) {
                        handleResize(null, {
                            size: {
                                height: headerHeight + viewHeight + modalOffset + footerInfoHeight,
                                width: headerWidth
                            }
                        })
                    }
                    if (headerHeight && viewHeight && !footerInfoHeight) {
                        handleResize(null, {
                            size: {
                                height: headerHeight + viewHeight + modalOffset + footerInfoHeight,
                                width: headerWidth
                            }
                        })
                    }
                }
            }
        }
    }, [
        resizableModalShow,
        isEditModeOpen,
        contentModalHeaderRef,
        contentModalFooterRef,
        contentViewRef,
        contentFormInputRef,
        contentFooterInfoRef,
        shownContent,
        content,
        isResizing,
        fullSizeShow
    ])

    useEffect(() => {
        if (resizableModalShow) {
            if (shownContent !== 0) {
                if (pageWidth < 260 || pageWidth > 968) {
                    !isResizing && setFrameSize(modalWidth, modalHeight - 57)
                    return
                }
                if (pageWidth >= 260 && pageWidth < 480) {
                    setModalWidth(pageWidth)
                }
                if (pageWidth > 460 && pageWidth < 968) {
                    setModalWidth(pageWidth - 100)
                }

                setFrameSize(pageWidth, modalHeight)
            }
        }
    }, [pageWidth, shownContent, resizableModalShow, isResizing])

    return (
        <>
            {resizableModalShow && content.id === shownContent && (
                <Portal>
                    <Draggable
                        positionOffset={{ x: "-51%", y: "-50%" }}
                        cancel={
                            ".react-resizable-handle, .close_button, .maximize_button, .minimize_button, .content-form"
                        }
                        defaultClassName="react-draggable content-modal shadow rounded"
                    >
                        <ResizableBox
                            width={modalWidth}
                            height={modalHeight}
                            minConstraints={
                                content.detail === null || content.detail === ""
                                    ? isEditModeOpen
                                        ? [282, 210]
                                        : [282, 105]
                                    : isEditModeOpen
                                    ? [282, 210]
                                    : [282, 160]
                            }
                            maxConstraints={[width, height]}
                            onResize={handleResize}
                            onResizeStart={() => setResizing(true)}
                            onResizeStop={() => {
                                setResizing(false)
                            }}
                        >
                            <div style={{ height: modalHeight }} className="resizable-div" ref={resizableRef}>
                                <div
                                    ref={contentModalHeaderRef}
                                    className="content-header d-flex justify-content-between "
                                >
                                    <div className="d-flex align-items-center">
                                        <span
                                            style={{ fontSize: 20 }}
                                            className="modal_text_color font-weight-500 my-0"
                                        >
                                            {t(content_type.name)}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div
                                            className="d-flex maximize_button p-2 mr-2 cursor-pointer"
                                            onClick={() => {
                                                handleMaximize()
                                            }}
                                        >
                                            <Maximize width="1.2em" height="1.2em" />
                                        </div>
                                        <div onClick={() => setResizableModalShow(false)}>
                                            <X
                                                color="var(--c-font-primary)"
                                                width="1.5em"
                                                height="1.5em"
                                                className="close_button cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        height: modalHeight - 55,
                                        overflowY: "auto"
                                    }}
                                    className="content-body"
                                >
                                    {isEditModeOpen && isEditable && (
                                        <Form onSubmit={handleSubmit}>
                                            <ContentForm
                                                content={content}
                                                contentFormInputRef={contentFormInputRef}
                                                formErrors={formErrors}
                                                setContentValue={setContentValue}
                                            />
                                        </Form>
                                    )}

                                    {((isEditModeOpen && content_type.id !== 1 && (content.detail || contentValue)) ||
                                        !isEditModeOpen) && (
                                        <ContentPreview
                                            content={!content.detail ? { ...content, detail: contentValue } : content}
                                            setIframeHeight={setIframeHeight}
                                            contentViewRef={contentViewRef}
                                            modalHeight={modalHeight}
                                        />
                                    )}

                                    {content.detail && content_type.id === 8 && (
                                        <div
                                            ref={contentFooterInfoRef}
                                            className="px-3 modal-footer-info"
                                            dangerouslySetInnerHTML={{
                                                __html: `${t(
                                                    "iframeContent1"
                                                )} <a href="https://lms.apitwist.com">lms.apitwist.com</a>${t(
                                                    "iframeContent2"
                                                )}`
                                            }}
                                        />
                                    )}

                                    {isEditModeOpen && isEditable && (
                                        <div ref={contentModalFooterRef} className=" d-flex flex-column content-footer">
                                            <div className="d-flex justify-content-between mt-2">
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onTouchEnd={isEditModeOpen ? handleDelete : null}
                                                    onClick={() => {
                                                        handleDelete()
                                                    }}
                                                >
                                                    {t("delete")}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="primary"
                                                    onClick={handleSubmit}
                                                    onTouchEnd={isEditModeOpen ? handleSubmit : null}
                                                >
                                                    {t("save")}
                                                    {content.loading && (
                                                        <span
                                                            className="spinner-border spinner-border-sm ml-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ResizableBox>
                    </Draggable>
                </Portal>
            )}

            {fullSizeShow && content.id === shownContent && (
                <Modal
                    fullscreen
                    id="fullScreenModalId"
                    show={fullSizeShow}
                    onHide={() => setFullSizeShow(false)}
                    dialogClassName="fullscreen-modal"
                >
                    <Modal.Header className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span style={{ fontSize: 20 }} className="modal_text_color font-weight-500 my-0">
                                {t(content_type.name)}
                            </span>
                        </div>
                        <div className="d-flex align-items-center">
                            <div
                                className="minimize_button p-2 d-flex mr-2 cursor-pointer"
                                onClick={() => (setFullSizeShow(false), setResizableModalShow(true))}
                            >
                                <Minimize width="1.2em" height="1.2em" />
                            </div>
                            <div
                                style={{ width: "32px", height: "32px" }}
                                className="d-flex justify-content-center align-items-center "
                                onClick={() => setFullSizeShow(false)}
                            >
                                <X width="1.5em" height="1.5em" className="close_button cursor-pointer" />
                            </div>
                        </div>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="content-body">
                            <ContentPreview
                                content={!content.detail ? { ...content, detail: contentValue } : content}
                                setIframeHeight={setIframeHeight}
                            />
                        </div>
                        {content.detail && content_type.id === 8 ? (
                            <div
                                className="px-3 modal-footer-info"
                                dangerouslySetInnerHTML={{
                                    __html: `${t(
                                        "iframeContent1"
                                    )} <a href="https://lms.apitwist.com">lms.apitwist.com</a>${t("iframeContent2")}`
                                }}
                            />
                        ) : (
                            ""
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </>
    )
}

export default React.memo(ResizableModal)
