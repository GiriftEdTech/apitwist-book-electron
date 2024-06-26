import * as React from "react"

function SvgUploadCloud(props) {
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
            className="upload-cloud_svg__feather upload-cloud_svg__feather-upload-cloud"
            {...props}
        >
            <path d="M16 16l-4-4-4 4M12 12v9" />
            <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
            <path d="M16 16l-4-4-4 4" />
        </svg>
    )
}

export default SvgUploadCloud
