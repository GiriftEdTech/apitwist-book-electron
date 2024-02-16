import * as React from "react"

function SvgPocket(props) {
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
            className="pocket_svg__feather pocket_svg__feather-pocket"
            {...props}
        >
            <path d="M4 3h16a2 2 0 012 2v6a10 10 0 01-10 10A10 10 0 012 11V5a2 2 0 012-2z" />
            <path d="M8 10l4 4 4-4" />
        </svg>
    )
}

export default SvgPocket
