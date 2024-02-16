import * as React from "react"

function SvgType(props) {
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
            className="type_svg__feather type_svg__feather-type"
            {...props}
        >
            <path d="M4 7V4h16v3M9 20h6M12 4v16" />
        </svg>
    )
}

export default SvgType
