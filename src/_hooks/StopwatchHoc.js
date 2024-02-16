import React, { useState, useEffect } from "react"
import { useRef } from "react"

const StopwatchHoc = (WrappedComponent) => {
    const Stopwatch = (props) => {
        const [isRunning, setIsRunning] = useState(false)
        const [time, setTime] = useState({ minutes: "00", seconds: "00" })
        const prevTimerOnRef = useRef()

        useEffect(() => {
            let intervalId
            if (isRunning) {
                intervalId = setInterval(() => {
                    setTime((prevTime) => {
                        let minutes = Number(prevTime.minutes)
                        let seconds = Number(prevTime.seconds) + 1
                        if (seconds >= 60) {
                            minutes += 1
                            seconds = 0
                        }
                        return { minutes, seconds }
                    })
                }, 1000)
            }
            return () => clearInterval(intervalId)
        }, [isRunning])

        const handleStartPause = () => {
            setIsRunning((prevIsRunning) => !prevIsRunning)
            prevTimerOnRef.current = isRunning
        }

        const handleReset = () => {
            setTime({ minutes: "00", seconds: "00" })
            setIsRunning(false)
        }

        return (
            <WrappedComponent
                time={time}
                handleStartPause={handleStartPause}
                handleReset={handleReset}
                isRunning={isRunning}
                prevTimerOnRef={prevTimerOnRef}
                {...props}
            />
        )
    }

    return Stopwatch
}

export default StopwatchHoc
