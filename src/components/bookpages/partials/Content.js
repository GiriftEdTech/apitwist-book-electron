import { useEffect, useState } from "react"
import ContentButton from "./ContentButton"
import ResizableModal from "./ResizableModal"

const Content = ({
    content,
    shownContent,
    setShownContent,
    sidebarIsOpen,
    pageId,
    pageWidth,
    pageHeight,
    isEditable,
    resizableModalShow,
    setResizableModalShow,
    fullSizeShow,
    setFullSizeShow
}) => {
    return (
        <>
            <ContentButton
                content={content}
                shownContent={shownContent}
                setShownContent={setShownContent}
                resizableModalShow={resizableModalShow}
                setResizableModalShow={setResizableModalShow}
                isEditable={isEditable}
                pageId={pageId}
                pageHeight={pageHeight}
                pageWidth={pageWidth}
            />

            <ResizableModal
                resizableModalShow={resizableModalShow}
                setResizableModalShow={setResizableModalShow}
                content={content}
                shownContent={shownContent}
                sidebarIsOpen={sidebarIsOpen}
                fullSizeShow={fullSizeShow}
                setFullSizeShow={setFullSizeShow}
                pageWidth={pageWidth}
                pageId={pageId}
                isEditable={isEditable}
            />
        </>
    )
}

export default Content
