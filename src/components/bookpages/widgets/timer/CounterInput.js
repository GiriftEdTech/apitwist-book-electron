import React from "react"
import TimerControls from "./TimerControls"
import { getTranslatedText as t } from "../../../../_locale"

const CounterInput = ({
    isCountdown,
    time,
    handleMinuteChange,
    handleSecondChange,
    timerOn,
    handleReset,
    handleStartPause,
    readOnly,
    prevTimerOnRef
}) => {
    return (
        <>
            <div className="d-flex justify-content-center pb-3">
                <div className="d-flex flex-column align-items-center">
                    <label htmlFor="minutes-input">{t("minutes")}</label>
                    <input
                        id="minutes-input"
                        type="number"
                        className={`form-control ${isCountdown ? "countdown" : "stopwatch"}`}
                        min="0"
                        max="59"
                        value={timerOn ? (time.minutes < 10 ? "0" + time.minutes : time.minutes) : time.minutes}
                        onChange={handleMinuteChange}
                        readOnly={readOnly}
                    />
                </div>
                <div className="d-flex align-items-end seperator mb-2 mx-2">:</div>
                <div className="d-flex flex-column align-items-center">
                    <label htmlFor="seconds-input">{t("seconds")}</label>
                    <input
                        id="seconds-input"
                        type="number"
                        min="0"
                        max="59"
                        className={`form-control ${isCountdown ? "countdown" : "stopwatch"}`}
                        value={timerOn ? (time.seconds < 10 ? "0" + time.seconds : time.seconds) : time.seconds}
                        onChange={handleSecondChange}
                        readOnly={readOnly}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <TimerControls
                    isCountdown={isCountdown}
                    time={time}
                    handleReset={handleReset}
                    handleStartPause={handleStartPause}
                    timerOn={timerOn}
                    prevTimerOnRef={prevTimerOnRef}
                />
            </div>
        </>
    )
}

export default CounterInput
