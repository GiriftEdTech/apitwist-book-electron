import * as React from "react"

function SvgUmbrella(props) {
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
            className="umbrella_svg__feather umbrella_svg__feather-umbrella"
            {...props}
        >
            <path d="M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0v-7" />
        </svg>
    )
}

export default SvgUmbrella
