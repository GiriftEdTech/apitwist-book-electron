import * as React from "react"

function SvgDisc(props) {
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
            className="disc_svg__feather disc_svg__feather-disc"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <circle cx={12} cy={12} r={3} />
        </svg>
    )
}

export default SvgDisc
