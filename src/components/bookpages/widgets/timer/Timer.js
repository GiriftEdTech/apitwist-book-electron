import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"
import "react-color-palette/lib/css/styles.css"
import Countdown from "./Countdown"
import Stopwatch from "./Stopwatch"
import { getTranslatedText as t } from "../../../../_locale"
import useViewport from "../../../../_hooks/useViewport"
import ModalCloseButton from "../../../partials/ModalCloseButton"

const Timer = ({ setTimerOpen }) => {
    const { width, height } = useViewport()
    const [isCountdown, setCountdown] = useState(true)
    const [deltaPosition, setDeltaPosition] = useState({
        x: 0,
        y: 0
    })

    const handleDrag = (e, ui) => {
        const { x, y } = deltaPosition
        setDeltaPosition({
            x: x + ui.deltaX,
            y: y + ui.deltaY
        })
    }

    useEffect(() => {
        setDeltaPosition({ x: width / 2, y: height / 2 })
    }, [])

    return (
        <Draggable
            handle=".drag"
            position={deltaPosition}
            onDrag={handleDrag}
            positionOffset={{ x: "-50%", y: "-50%" }}
            cancel=".auto-timer, .form-control , .timer-control"
        >
            <div className="timer-main-container d-flex flex-column align-items-center rounded bg-white shadow-lg cursor-move">
                <ModalCloseButton handleClick={() => setTimerOpen(false)} />

                <div className="d-flex w-100">
                    <div
                        className={`top-left-radius w-100 p-2 stopwatch ${
                            !isCountdown ? "" : "disabled"
                        } text-center cursor-pointer`}
                        onClick={() => setCountdown(false)}
                    >
                        <span className="mb-0">{t("stopwatch")}</span>
                    </div>
                    <div
                        className={`top-right-radius w-100 p-2 pr-4 countdown ${
                            isCountdown ? "" : "disabled"
                        } text-center cursor-pointer`}
                        onClick={() => setCountdown(true)}
                    >
                        <span className="mb-0">{t("countdown")}</span>
                    </div>
                </div>
                <div className={`timer pb-3 pt-2 bottom-radius drag ${!isCountdown ? `stopwatch` : `countdown`}`}>
                    {isCountdown ? <Countdown isCountdown={isCountdown} /> : <Stopwatch isCountdown={isCountdown} />}
                </div>
            </div>
        </Draggable>
    )
}

export default Timer
