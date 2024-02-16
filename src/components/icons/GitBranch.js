import * as React from "react"

function SvgGitBranch(props) {
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
            className="git-branch_svg__feather git-branch_svg__feather-git-branch"
            {...props}
        >
            <path d="M6 3v12" />
            <circle cx={18} cy={6} r={3} />
            <circle cx={6} cy={18} r={3} />
            <path d="M18 9a9 9 0 01-9 9" />
        </svg>
    )
}

export default SvgGitBranch
