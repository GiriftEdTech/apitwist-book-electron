import * as React from "react"

function SvgPause(props) {
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
            className="pause_svg__feather pause_svg__feather-pause"
            {...props}
        >
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
    )
}

export default SvgPause
