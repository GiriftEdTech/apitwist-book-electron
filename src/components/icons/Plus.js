import * as React from "react"

function SvgPlus(props) {
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
            className="plus_svg__feather plus_svg__feather-plus"
            {...props}
        >
            <path d="M12 5v14M5 12h14" />
        </svg>
    )
}

export default SvgPlus
