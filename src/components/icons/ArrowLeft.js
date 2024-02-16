import * as React from "react"

function SvgArrowLeft(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow-left_svg__feather arrow-left_svg__feather-arrow-left"
            {...props}
        >
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    )
}

export default SvgArrowLeft
