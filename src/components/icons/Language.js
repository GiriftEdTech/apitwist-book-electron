import * as React from "react"
const Language = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0}
        viewBox="0 0 512 512"
        {...props}
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M48 112h288M192 64v48m80 336 96-224 96 224m-162.5-64h133M281.3 112S257 206 199 277 80 384 80 384"
        />
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M256 336s-35-27-72-75-56-85-56-85"
        />
    </svg>
)
export default Language
