import * as React from "react"

function SvgVolume(props) {
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
            className="volume_svg__feather volume_svg__feather-volume"
            {...props}
        >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
        </svg>
    )
}

export default SvgVolume
