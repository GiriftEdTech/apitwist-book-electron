import * as React from "react"

function SvgClock(props) {
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
            className="clock_svg__feather clock_svg__feather-clock"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 6v6l4 2" />
        </svg>
    )
}

export default SvgClock
