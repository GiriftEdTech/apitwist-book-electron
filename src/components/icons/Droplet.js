import * as React from "react"

function SvgDroplet(props) {
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
            className="droplet_svg__feather droplet_svg__feather-droplet"
            {...props}
        >
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
    )
}

export default SvgDroplet
