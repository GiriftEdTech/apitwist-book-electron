import * as React from "react"

function SvgCalendar(props) {
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
            className="calendar_svg__feather calendar_svg__feather-calendar"
            {...props}
        >
            <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    )
}

export default SvgCalendar
