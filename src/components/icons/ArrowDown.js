import * as React from "react"

function SvgArrowDown(props) {
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
            className="arrow-down_svg__feather arrow-down_svg__feather-arrow-down"
            {...props}
        >
            <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
    )
}

export default SvgArrowDown
