import * as React from "react"

function SvgMoreHorizontal(props) {
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
            className="more-horizontal_svg__feather more-horizontal_svg__feather-more-horizontal"
            {...props}
        >
            <circle cx={12} cy={12} r={1} />
            <circle cx={19} cy={12} r={1} />
            <circle cx={5} cy={12} r={1} />
        </svg>
    )
}

export default SvgMoreHorizontal
