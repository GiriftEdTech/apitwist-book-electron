import React from "react"
import SvgStar from "../../icons/Star"

const StarRate = ({ rate, children }) => {
    return (
        <div className="star_container">
            <SvgStar fill="var(--c-star)" color="var(--c-star)" />
            <h5>{rate}</h5>
            {children}
        </div>
    )
}

export default StarRate
