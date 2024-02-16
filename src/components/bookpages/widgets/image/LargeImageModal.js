import Modal from "react-bootstrap/Modal"

const LargeImageModal = (props) => {
    return (
        <Modal id="fullScreenModalId" {...props} dialogClassName="fullscreen-modal">
            <Modal.Header closeButton />

            <Modal.Body className="d-flex flex-column flex-md-row align-items-center justify-content-center qr-body p-3">
                <img class="gallery-image rounded cursor-pointer " src={props.zoomImage} alt="modal_class_image" />
            </Modal.Body>
        </Modal>
    )
}

export default LargeImageModal
