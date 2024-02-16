import React from "react"
import { X } from "../icons"

const ModalCloseButton = ({ handleClick }) => {
    return (
        <div className="modal-close-button cursor-pointer position-absolute" onClick={handleClick}>
            <X color="var(--c-font-primary)" width="1.3em" height="1.3em" className="close_button" />
        </div>
    )
}

export default ModalCloseButton
