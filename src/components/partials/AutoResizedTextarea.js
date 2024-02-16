import React, { useEffect, useRef } from "react"
import { FormControl } from "react-bootstrap"

const AutoResizedTextarea = ({ name, placeholder, value, onChange, onKeyDown, row }) => {
    const textareaRef = useRef(null)
    const calculateHeight = (element) => {
        const lineHeight = parseInt(getComputedStyle(element).lineHeight)

        const height = element.scrollHeight

        if (!value) {
            return row ? lineHeight * row + 12 : lineHeight + 12
        } else {
            return Math.max(row ? lineHeight * 3 + 12 : lineHeight, height)
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = calculateHeight(textareaRef.current) + "px"
        }
    }, [value])
    return (
        <FormControl
            id={name}
            as="textarea"
            name={name}
            aria-label="With textarea"
            className="assistant-textarea rounded pr-5 mr-2 overflow-auto"
            placeholder={placeholder}
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onKeyDown={onKeyDown}
        />
    )
}

export default AutoResizedTextarea
