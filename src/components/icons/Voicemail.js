import * as React from "react"

function SvgVoicemail(props) {
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
            className="voicemail_svg__feather voicemail_svg__feather-voicemail"
            {...props}
        >
            <circle cx={5.5} cy={11.5} r={4.5} />
            <circle cx={18.5} cy={11.5} r={4.5} />
            <path d="M5.5 16h13" />
        </svg>
    )
}

export default SvgVoicemail
