import React from "react"
import ContentLoader from "react-content-loader"

const SidebarLoader = (props) => {
    return (
        <ContentLoader speed={2} width={200} height={250} viewBox="0 0 200 250" {...props}>
            <rect x="5" y="5" rx="4" ry="4" width="190" height="6" />
            <rect x="5" y="5" rx="4" ry="4" width="6" height="240" />
            <rect x="190" y="5" rx="4" ry="4" width="6" height="240" />
            <rect x="5" y="240" rx="4" ry="4" width="190" height="6" />

            <rect x="25" y="25" rx="6" ry="6" width="150" height="200" />
        </ContentLoader>
    )
}
export default React.memo(SidebarLoader)
