import React from "react"
import ContentLoader from "react-content-loader"

const ImageLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={props.width}
            height={props.height}
            viewBox={`0 0 100 100`}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="0" rx="3" ry="3" width={props.width} height={props.height} />
        </ContentLoader>
    )
}

export default ImageLoader
