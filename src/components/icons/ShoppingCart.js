import * as React from "react"

function SvgShoppingCart(props) {
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
            className="shopping-cart_svg__feather shopping-cart_svg__feather-shopping-cart"
            {...props}
        >
            <circle cx={9} cy={21} r={1} />
            <circle cx={20} cy={21} r={1} />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
    )
}

export default SvgShoppingCart
