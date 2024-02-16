import React from "react"
import { Pause, Play, RefreshCcw } from "../../../icons"
import { getTranslatedText as t } from "../../../../_locale"

const TimerControls = ({ isCountdown, time, handleStartPause, handleReset, timerOn, prevTimerOnRef }) => {
    return (
        <>
            {!timerOn && prevTimerOnRef.current && (Number(time.minutes) > 0 || Number(time.seconds) > 0) ? (
                <>
                    <button
                        className="btn btn-primary mr-2 timer-control d-flex align-items-center"
                        onClick={handleStartPause}
                    >
                        <Play className="mr-1" /> {t("continue")}
                    </button>
                    <button
                        className="btn btn-danger ml-2 timer-control d-flex align-items-center"
                        onClick={handleReset}
                    >
                        <RefreshCcw className="mr-1" /> {t("reset")}
                    </button>
                </>
            ) : !timerOn ? (
                <button
                    disabled={isCountdown && Number(time.minutes) === 0 && Number(time.seconds) === 0}
                    className="btn btn-primary timer-control d-flex align-items-center"
                    onClick={handleStartPause}
                >
                    <Play className="mr-1" /> {t("start")}
                </button>
            ) : (
                <>
                    <button
                        className="btn btn-primary mr-2 timer-control d-flex align-items-center"
                        onClick={handleStartPause}
                    >
                        <Pause className="mr-1" /> {t("pause")}
                    </button>
                    <button
                        className="btn btn-danger ml-2 timer-control d-flex align-items-center"
                        onClick={handleReset}
                    >
                        <RefreshCcw className="mr-1" /> {t("reset")}
                    </button>
                </>
            )}
        </>
    )
}

export default TimerControls
