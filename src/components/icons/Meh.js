import * as React from "react"

function SvgMeh(props) {
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
            className="meh_svg__feather meh_svg__feather-meh"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <path d="M8 15h8M9 9h.01M15 9h.01" />
        </svg>
    )
}

export default SvgMeh
