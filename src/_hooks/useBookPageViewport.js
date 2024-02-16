import { useEffect, useState } from "react"

const useBookPageViewport = (myRef) => {
    const [pageWidth, setPageWidth] = useState(0)
    const [pageHeight, setPageHeight] = useState(0)

    const handleResize = () => {
        setPageWidth(myRef.current.offsetWidth)
        setPageHeight(myRef.current.offsetHeight)
    }

    useEffect(() => {
        if (myRef.current) {
            setPageWidth(myRef.current.offsetWidth)
            setPageHeight(myRef.current.offsetHeight)
        }
        window.addEventListener("load", handleResize)
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("load", handleResize)
            window.removeEventListener("resize", handleResize)
        }
    }, [myRef, handleResize])

    return { pageWidth, pageHeight }
}
export default useBookPageViewport
