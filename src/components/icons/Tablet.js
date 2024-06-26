import * as React from "react"

function SvgTablet(props) {
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
            className="tablet_svg__feather tablet_svg__feather-tablet"
            {...props}
        >
            <rect x={4} y={2} width={16} height={20} rx={2} ry={2} />
            <path d="M12 18h.01" />
        </svg>
    )
}

export default SvgTablet
