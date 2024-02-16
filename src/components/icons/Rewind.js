import * as React from "react"

function SvgRewind(props) {
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
            className="rewind_svg__feather rewind_svg__feather-rewind"
            {...props}
        >
            <path d="M11 19l-9-7 9-7v14zM22 19l-9-7 9-7v14z" />
        </svg>
    )
}

export default SvgRewind
