import * as React from "react"

function SvgUserCheck(props) {
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
            className="user-check_svg__feather user-check_svg__feather-user-check"
            {...props}
        >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx={8.5} cy={7} r={4} />
            <path d="M17 11l2 2 4-4" />
        </svg>
    )
}

export default SvgUserCheck
