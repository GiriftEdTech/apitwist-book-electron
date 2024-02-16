import * as React from "react"

function SvgXSquare(props) {
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
            className="x-square_svg__feather x-square_svg__feather-x-square"
            {...props}
        >
            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
            <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
    )
}

export default SvgXSquare
