import * as React from "react"

function SvgCopy(props) {
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
            className="copy_svg__feather copy_svg__feather-copy"
            {...props}
        >
            <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
    )
}

export default SvgCopy
