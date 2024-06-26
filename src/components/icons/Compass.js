import * as React from "react"

function SvgCompass(props) {
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
            className="compass_svg__feather compass_svg__feather-compass"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
        </svg>
    )
}

export default SvgCompass
