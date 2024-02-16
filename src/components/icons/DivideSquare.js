import * as React from "react"

function SvgDivideSquare(props) {
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
            className="divide-square_svg__feather divide-square_svg__feather-divide-square"
            {...props}
        >
            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
            <path d="M8 12h8M12 16h0M12 8h0" />
        </svg>
    )
}

export default SvgDivideSquare
