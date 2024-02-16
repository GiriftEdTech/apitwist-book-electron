import React from "react"
import ContentLoader from "react-content-loader"

const ClassLoader = (props) => {
    return (
        <ContentLoader speed={2} width={350} height={250} viewBox="0 0 350 250" {...props}>
            <rect x="5" y="5" rx="4" ry="4" width="340" height="6" />
            <rect x="5" y="5" rx="4" ry="4" width="6" height="240" />
            <rect x="340" y="5" rx="4" ry="4" width="6" height="240" />
            <rect x="5" y="240" rx="4" ry="4" width="340" height="6" />

            <rect x="220" y="25" rx="6" ry="6" width="88" height="28" />

            <rect x="50" y="75" rx="4" ry="4" width="120" height="10" />
            <rect x="50" y="95" rx="4" ry="4" width="120" height="10" />
            <rect x="50" y="115" rx="4" ry="4" width="120" height="10" />
            <rect x="50" y="135" rx="4" ry="4" width="150" height="10" />

            <rect x="50" y="175" rx="2" ry="2" width="80" height="4" />
            <rect x="50" y="175" rx="2" ry="2" width="4" height="30" />
            <rect x="50" y="201" rx="2" ry="2" width="80" height="4" />
            <rect x="128" y="175" rx="2" ry="2" width="4" height="30" />
        </ContentLoader>
    )
}

export default ClassLoader
