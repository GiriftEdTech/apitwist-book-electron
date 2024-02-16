import React, { Component } from "react"
import TextStrokeColorIcon from "../ToolbarIcons/TextStrokeColorIcon"
import TooltipContainer from "./TooltipContainer"
import { getTranslatedText as t } from "../../../_locale"

const TextStrokeColor = ({ isShrinked, dropdownPosition, tooltipFalse, onButtonClick, color }) => {
    return (
        <TooltipContainer placement={dropdownPosition} name={t("textStrokeColor")} tooltipFalse={tooltipFalse}>
            <li
                className={`toolbar-button d-flex align-items-center justify-content-center ${
                    isShrinked ? "shrinkElement" : ""
                }`}
            >
                <span
                    className={`button normal-btn text-and-stroke-color`}
                    title="Text and stroke color"
                    onClick={onButtonClick}
                >
                    <TextStrokeColorIcon color={color} />
                </span>
            </li>
        </TooltipContainer>
    )
}

export default TextStrokeColor
