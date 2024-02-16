import StopwatchHoc from "../../../../_hooks/StopwatchHoc"
import CounterInput from "./CounterInput"

function Stopwatch({ isCountdown, time, handleStartPause, handleReset, isRunning, prevTimerOnRef }) {
    return (
        <CounterInput
            isCountdown={isCountdown}
            time={time}
            timerOn={isRunning}
            handleReset={handleReset}
            handleStartPause={handleStartPause}
            readOnly={true}
            prevTimerOnRef={prevTimerOnRef}
        />
    )
}
export default StopwatchHoc(Stopwatch)
