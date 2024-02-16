import { useState } from "react"
import SvgStar from "../../icons/Star"
import ReactStars from "react-rating-stars-component"

const RateButton = ({ color }) => {
    const { isOpened, setIsOpened } = useState(false)

    return (
        <div
            style={{
                position: "relative",
                display: "inline",
                width: "100%"
            }}
            onMouseEnter={() => setIsOpened(!isOpened)}
            onMouseLeave={() => setIsOpened(!isOpened)}
        >
            <div className="rate_button">
                <SvgStar fill="none" stroke="currentColor" /> Rate This
            </div>
            <div
                className="rate_button_modal"
                style={{
                    display: isOpened ? "block" : "none",
                    background: color
                }}
            >
                <ReactStars className="stars_container" size={16} half={false} activeColor={"var(--c-star)"} />
            </div>
        </div>
    )
}
export default RateButton
