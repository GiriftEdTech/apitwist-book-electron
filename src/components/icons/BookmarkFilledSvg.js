import * as React from "react"

const BookmarkFilledSvg = (props) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-bookmark-fill"
        {...props}
    >
        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
    </svg>
)

export default BookmarkFilledSvg
