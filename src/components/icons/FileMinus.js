import * as React from "react"

function SvgFileMinus(props) {
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
            className="file-minus_svg__feather file-minus_svg__feather-file-minus"
            {...props}
        >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6M9 15h6" />
        </svg>
    )
}

export default SvgFileMinus
