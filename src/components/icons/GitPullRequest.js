import * as React from "react"

function SvgGitPullRequest(props) {
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
            className="git-pull-request_svg__feather git-pull-request_svg__feather-git-pull-request"
            {...props}
        >
            <circle cx={18} cy={18} r={3} />
            <circle cx={6} cy={6} r={3} />
            <path d="M13 6h3a2 2 0 012 2v7M6 9v12" />
        </svg>
    )
}

export default SvgGitPullRequest
