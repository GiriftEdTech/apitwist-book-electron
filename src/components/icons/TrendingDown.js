import * as React from "react"

function SvgTrendingDown(props) {
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
            className="trending-down_svg__feather trending-down_svg__feather-trending-down"
            {...props}
        >
            <path d="M23 18l-9.5-9.5-5 5L1 6" />
            <path d="M17 18h6v-6" />
        </svg>
    )
}

export default SvgTrendingDown
