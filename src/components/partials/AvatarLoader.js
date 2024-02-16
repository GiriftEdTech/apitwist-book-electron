import React from "react"
import ContentLoader from "react-content-loader"

const AvatarLoader = (props) => (
    <ContentLoader
        speed={2}
        width={45}
        height={45}
        viewBox="0 0 45 45"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="23" cy="23" r="22" />
    </ContentLoader>
)

export default AvatarLoader
