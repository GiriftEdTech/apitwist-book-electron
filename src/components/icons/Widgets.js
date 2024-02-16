import * as React from "react"

const Widgets = (props) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth={1.7}
        transform="rotate(270)"
        {...props}
    >
        <g strokeLinecap="round">
            <rect x={3} y={3} width={7} height={7} rx={1} />
            <rect x={3} y={14} width={7} height={7} rx={1} />
            <rect x={14} y={3} width={7} height={7} rx={1} />
            <path d="M17.5 14v7M21 17.5h-7" />
        </g>
    </svg>
)

export default Widgets
