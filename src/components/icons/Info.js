import * as React from "react"

function SvgInfo(props) {
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
            className="info_svg__feather info_svg__feather-info"
            {...props}
        >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 16v-4M12 8h.01" />
        </svg>
    )
}

export default React.memo(SvgInfo)
