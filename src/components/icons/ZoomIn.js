import * as React from "react"

function SvgZoomIn(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17px"
            height="17px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="zoom-in_svg__feather zoom-in_svg__feather-zoom-in"
            {...props}
        >
            <circle cx={11} cy={11} r={8} />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
        </svg>
    )
}

export default SvgZoomIn
