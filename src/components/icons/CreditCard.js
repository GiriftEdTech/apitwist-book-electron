import * as React from "react"

function SvgCreditCard(props) {
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
            className="credit-card_svg__feather credit-card_svg__feather-credit-card"
            {...props}
        >
            <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
            <path d="M1 10h22" />
        </svg>
    )
}

export default SvgCreditCard
