import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { openAiActions } from "../_actions/openAi.actions"

const AudioRecorderHoc = (WrappedComponent) => {
    const AudioRecorder = (props) => {
        const [isRecording, setIsRecording] = useState(false)
        const mediaRecorderRef = useRef(null)
        const audioChunksRef = useRef([])
        const dispatch = useDispatch()

        const handleStartRecording = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.addEventListener("dataavailable", handleDataAvailable)
            mediaRecorder.addEventListener("stop", handleStop)

            mediaRecorder.start()
            setIsRecording(true)
        }

        const handleStopRecording = () => {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current.stream.getTracks()[0].stop()
            setIsRecording(false)
        }

        const handleDataAvailable = (event) => {
            audioChunksRef.current.push(event.data)
        }

        const handleStop = () => {
            const blob = new Blob(audioChunksRef.current)
            const file = new File([blob], "input.wav", { type: "audio/wav" })

            const fileSizeInBytes = file.size
            const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024)

            if (fileSizeInMegabytes > 25) {
                toast.warning(t("tooLongAudio"))
            } else {
                dispatch(openAiActions.getSpeechToText(file))
                audioChunksRef.current = []
            }
        }

        return (
            <WrappedComponent
                isRecording={isRecording}
                handleStartRecording={handleStartRecording}
                handleStopRecording={handleStopRecording}
                {...props}
            />
        )
    }

    return AudioRecorder
}

export default AudioRecorderHoc
