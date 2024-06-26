import * as React from "react"

function SvgItalic(props) {
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
            className="italic_svg__feather italic_svg__feather-italic"
            {...props}
        >
            <path d="M19 4h-9M14 20H5M15 4L9 20" />
        </svg>
    )
}

export default SvgItalic
