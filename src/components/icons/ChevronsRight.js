import * as React from "react"

function SvgChevronsRight(props) {
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
            className="chevrons-right_svg__feather chevrons-right_svg__feather-chevrons-right"
            {...props}
        >
            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
        </svg>
    )
}

export default SvgChevronsRight
