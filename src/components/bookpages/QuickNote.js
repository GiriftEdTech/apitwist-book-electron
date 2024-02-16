import React, { useEffect, useMemo, useState } from "react"
import { Button, Form, InputGroup, Modal } from "react-bootstrap"
import AutoResizedTextarea from "../partials/AutoResizedTextarea"
import { getTranslatedText as t } from "../../_locale"
import { Ask } from "../icons"
import { contentActions } from "../../_actions/content.actions"
import { contentTypes, utils } from "../../_helpers"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"

const QuickNote = (props) => {
    const dispatch = useDispatch()
    const [formError, setFormError] = useState()
    const { bookmarked } = useSelector((state) => state.bookmarks)
    const { user } = useSelector((state) => state.users)
    const { contents } = useSelector((state) => state.pageDetails)

    const [detail, setDetail] = useState()
    const handleChange = (name, value) => {
        setDetail(value)
        value.length !== 0 && setFormError("")
    }

    let isUserStudent = utils.objectHasLength(user) && !utils.userIsNotStudent(user)

    const initialQuickNote = useMemo(
        () => utils.arrayHasLength(contents) && contents.find((content) => content.content_type_id === 10),
        [contents]
    )

    const handleDelete = () => {
        if (!initialQuickNote) {
            props.setQuickNoteOpen(false)
        } else {
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
                            props.pageId,
                            initialQuickNote.id,
                            isUserStudent &&
                                utils.pageHasBookmark(bookmarked, props.pageId, props.bookId) &&
                                props.bookId
                        )
                    )
                    props.setQuickNoteOpen(false)
                    Swal.fire(
                        t("deleted"),
                        t("hasBeenDeleted").replace(
                            ":field_name",
                            t("content").charAt(0).toUpperCase() + t("content").slice(1)
                        ),
                        "success"
                    )
                    Swal.fire({
                        timer: 1500,
                        showConfirmButton: false,
                        title: t("deleted"),
                        text: t("hasBeenDeleted").replace(
                            ":field_name",
                            t("note").charAt(0).toUpperCase() + t("note").slice(1)
                        ),
                        icon: "success"
                    })
                }
            })
        }
    }

    const handleSubmit = (e) => {
        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {
            e.preventDefault()

            if (detail && detail.trim() !== "") {
                if (!utils.objectHasLength(initialQuickNote)) {
                    dispatch(
                        contentActions.store(
                            props.pageId,
                            utils.getObjectById(contentTypes, 10),
                            undefined,
                            undefined,
                            true,
                            !utils.pageHasBookmark(bookmarked, props.pageId, props.bookId) &&
                                isUserStudent &&
                                props.bookId,
                            undefined,
                            detail
                        )
                    )
                } else {
                    dispatch(
                        contentActions.update(
                            props.pageId,
                            initialQuickNote.id,
                            undefined,
                            undefined,
                            detail,
                            initialQuickNote
                        )
                    )
                }
                props.setQuickNoteOpen(false)
            } else {
                setFormError(t("enterText"))
            }
        }
    }

    useEffect(() => {
        initialQuickNote && setDetail(initialQuickNote.detail)
    }, [initialQuickNote])

    return (
        <Modal
            {...props}
            onHide={() => props.setQuickNoteOpen(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bg-light">
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="modal_text_color"
                    style={{ fontSize: "20px" }}
                >
                    {t("quick_note")}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <AutoResizedTextarea
                        name={"notes"}
                        placeholder={t("takeNotes")}
                        value={detail}
                        onChange={handleChange}
                        onKeyDown={handleSubmit}
                        row={3}
                    />

                    {formError && <small className={`text-danger`}>{formError}</small>}
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between m-0">
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                            handleDelete()
                        }}
                    >
                        {!initialQuickNote ? t("cancel") : t("delete")}
                    </Button>
                    <Button size="sm" variant="primary" onClick={handleSubmit}>
                        {t("save")}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default QuickNote
