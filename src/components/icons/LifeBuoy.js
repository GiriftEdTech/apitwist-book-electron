import * as React from "react"

function SvgLifeBuoy(props) {
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
            className="life-buoy_svg__feather life-buoy_svg__feather-life-buoy"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <circle cx={12} cy={12} r={4} />
            <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M14.83 9.17l3.53-3.53M4.93 19.07l4.24-4.24" />
        </svg>
    )
}

export default SvgLifeBuoy
