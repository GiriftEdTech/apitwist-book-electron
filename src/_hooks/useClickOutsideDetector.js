import { useEffect, useState } from "react"

const useClickOutsideDetector = (ref, fn) => {
    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return
            }
            if (fn) fn()
        }
        document.body.addEventListener("click", onBodyClick)
        document.body.addEventListener("touchstart", onBodyClick)
        return () => {
            document.body.removeEventListener("click", onBodyClick)
            document.body.removeEventListener("touchstart", onBodyClick)
        }
    }, [])
}
export default useClickOutsideDetector
