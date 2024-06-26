import * as React from "react"

function SvgUnderline(props) {
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
            className="underline_svg__feather underline_svg__feather-underline"
            {...props}
        >
            <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3M4 21h16" />
        </svg>
    )
}

export default SvgUnderline
