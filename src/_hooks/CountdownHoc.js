import React, { useState, useEffect } from "react"
import { useRef } from "react"
import useSound from "use-sound"
const CountdownHoc = (WrappedComponent) => {
    const Countdown = (props) => {
        const [time, setTime] = useState({ minutes: "00", seconds: "00" })
        const [intervalID, setIntervalID] = useState(null)
        const [timerOn, setTimerOn] = useState(false)
        const prevTimerOnRef = useRef()
        const [play] = useSound("https://apitwist-media-service.s3.eu-central-1.amazonaws.com/sounds/bell-ring.mp3")

        useEffect(() => {
            if (timerOn) {
                const newIntervalID = setInterval(() => {
                    setTime((prevTime) => {
                        if (Number(prevTime.minutes) === 0 && Number(prevTime.seconds) === 0) {
                            clearInterval(intervalID)
                            setTimerOn(false)
                            setTime({ minutes: "00", seconds: "00" })
                        } else if (Number(prevTime.seconds) === 0) {
                            return { minutes: Number(prevTime.minutes) - 1, seconds: 59 }
                        } else if (Number(prevTime.minutes) === 0 && Number(prevTime.seconds) === 1) {
                            play()
                            return { ...prevTime, seconds: Number(prevTime.seconds) - 1 }
                        } else {
                            return { ...prevTime, seconds: Number(prevTime.seconds) - 1 }
                        }
                    })
                }, 1000)
                setIntervalID(newIntervalID)
            } else {
                clearInterval(intervalID)
            }
            return () => clearInterval(intervalID)
        }, [timerOn])

        const handleReset = () => {
            clearInterval(intervalID)
            setTimerOn(false)
            setTime({ minutes: "00", seconds: "00" })
        }

        const handleStartPause = () => {
            setTimerOn((prevTimerOn) => !prevTimerOn)
            prevTimerOnRef.current = timerOn
        }

        const handleMinuteChange = (event) => {
            if (/^\d{0,2}$/.test(event.target.value)) {
                setTime((prevTime) => ({
                    ...prevTime,
                    minutes: Math.abs(parseInt(event.target.value > 60 ? 60 : event.target.value))
                }))
            }
        }

        const handleSecondChange = (event) => {
            setTime((prevTime) => ({
                ...prevTime,
                seconds: Math.abs(parseInt(event.target.value > 60 ? 60 : event.target.value))
            }))
        }

        return (
            <WrappedComponent
                time={time}
                handleMinuteChange={handleMinuteChange}
                handleSecondChange={handleSecondChange}
                timerOn={timerOn}
                setTimerOn={setTimerOn}
                handleReset={handleReset}
                handleStartPause={handleStartPause}
                setTime={setTime}
                prevTimerOnRef={prevTimerOnRef}
                {...props}
            />
        )
    }

    return Countdown
}

export default CountdownHoc
