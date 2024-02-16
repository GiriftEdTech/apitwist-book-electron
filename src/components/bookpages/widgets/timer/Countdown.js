import React from "react"
import CounterInput from "./CounterInput"
import CountdownHoc from "../../../../_hooks/CountdownHoc"
const CountDown = ({
    isCountdown,
    time,
    handleMinuteChange,
    handleSecondChange,
    timerOn,
    setTimerOn,
    handleReset,
    handleStartPause,
    setTime,
    prevTimerOnRef
}) => {
    return (
        <div>
            <CounterInput
                isCountdown={isCountdown}
                time={time}
                handleMinuteChange={handleMinuteChange}
                handleSecondChange={handleSecondChange}
                timerOn={timerOn}
                handleReset={handleReset}
                handleStartPause={handleStartPause}
                readOnly={timerOn}
                prevTimerOnRef={prevTimerOnRef}
            />
            <div className="d-flex justify-content-center pt-3">
                <small
                    onClick={() => {
                        setTime({ minutes: 0, seconds: 30 })
                        setTimerOn(true)
                    }}
                    className="border rounded cursor-pointer p-1 mr-1 auto-timer"
                >
                    00 : 30
                </small>
                <small
                    onClick={() => {
                        setTime({ minutes: 1, seconds: 0 })
                        setTimerOn(true)
                    }}
                    className="border rounded p-1 cursor-pointer mr-1 auto-timer"
                >
                    01 : 00
                </small>
                <small
                    onClick={() => {
                        setTime({ minutes: 5, seconds: 0 })
                        setTimerOn(true)
                    }}
                    className="border rounded p-1 cursor-pointer mr-1 auto-timer"
                >
                    05 : 00
                </small>
                <small
                    onClick={() => {
                        setTime({ minutes: 15, seconds: 0 })
                        setTimerOn(true)
                    }}
                    className="border rounded p-1 cursor-pointer auto-timer"
                >
                    15 : 00
                </small>
            </div>
        </div>
    )
}

export default CountdownHoc(CountDown)
