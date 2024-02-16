import { useEffect, useRef } from "react"
import ChatSummaries from "./ChatSummaries"
import { ChevronRight } from "../icons"
import { useSelector } from "react-redux"

const SummarySideBar = ({ pageWidth, headerHeigth }) => {
    const summarySidebarRef = useRef(null)
    const { isDark } = useSelector((state) => state.theme)
    const getSidebarElement = () => {
        return summarySidebarRef?.current
    }
    const toggleSidebar = () => {
        getSidebarElement() && getSidebarElement().classList.toggle("active")
    }
    useEffect(() => {
        if (pageWidth) {
            if (pageWidth < 768) {
                getSidebarElement() &&
                    getSidebarElement().classList.contains("active") &&
                    getSidebarElement().classList.remove("active")
            } else {
                getSidebarElement() &&
                    !getSidebarElement().classList.contains("active") &&
                    getSidebarElement().classList.add("active")
            }
        }
    }, [pageWidth])

    return (
        <div className="row">
            <div
                ref={summarySidebarRef}
                className="tutoring-sidebar active shadow"
                style={{ height: `calc(100vh - ${headerHeigth}px - 5px)` }}
            >
                <ChatSummaries />
            </div>

            <button className="cursor-pointer" onClick={() => toggleSidebar()}>
                <ChevronRight color={isDark && "var(--c-font-dark)"} />
            </button>
        </div>
    )
}

export default SummarySideBar
