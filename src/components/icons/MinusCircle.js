import * as React from "react"

function SvgMinusCircle(props) {
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
            className="minus-circle_svg__feather minus-circle_svg__feather-minus-circle"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <path d="M8 12h8" />
        </svg>
    )
}

export default SvgMinusCircle
