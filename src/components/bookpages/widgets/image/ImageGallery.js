import { useState } from "react"
import LargeImageModal from "./LargeImageModal"
import { useSelector } from "react-redux"
import ImageLoader from "../../../partials/ImageLoader"
import { utils } from "../../../../_helpers"
import { getTranslatedText as t } from "../../../../_locale"
import { useEffect } from "react"

const ImageGallery = ({ images }) => {
    const { loading, totalHits } = useSelector((state) => state.imageSearcher)
    const [zoomImage, setZoomImage] = useState("")
    const [modalShow, setModalShow] = useState(false)
    const [displayOffset, setDisplayOffset] = useState({ from: 0, to: 3 * 4 })

    const handleScroll = (e) => {
        if (e.target.scrollTop + e.target.clientHeight + 1 >= e.target.scrollHeight) {
            setDisplayOffset((prevState) => ({
                from: 0,
                to: prevState.to + 3 * 4
            }))
        }
    }

    useEffect(() => {
        document.querySelector(".body").addEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="body cancel-drag cursor-default">
            <div class="container">
                <div class="px-2 row">
                    {loading &&
                        [...Array(9)].map(() => (
                            <div class="mb-3 pt-3 px-1 px-sm-2 col-12 col-sm-6 col-lg-4">
                                <ImageLoader width={"100%"} height={"100%"} />
                            </div>
                        ))}
                    {utils.arrayHasLength(images) &&
                        images.slice(displayOffset.from, displayOffset.to).map((image) => (
                            <div class="mb-3 pt-3 px-1 px-sm-2 col-12 col-sm-6 col-lg-4">
                                <figure
                                    className="mb-0 position-relative cursor-pointer"
                                    onClick={() => {
                                        setZoomImage(image.largeImageURL)
                                        setModalShow(true)
                                    }}
                                >
                                    <img
                                        class="gallery-image rounded cursor-pointer "
                                        src={image.largeImageURL}
                                        alt="modal_class_image"
                                    />
                                    <figcaption className="text-white font-weight-500 small p-2 bottom-radius">
                                        {image.tags}
                                    </figcaption>
                                </figure>
                            </div>
                        ))}

                    {!totalHits && totalHits < 1 && <span className="small px-2">{t("noImageFound")}</span>}
                </div>
            </div>
            <LargeImageModal zoomImage={zoomImage} show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}

export default ImageGallery
