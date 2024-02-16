import React, { Component } from "react"
import FillColorIcon from "../ToolbarIcons/FillColorIcon"
import TooltipContainer from "./TooltipContainer"
import { getTranslatedText as t } from "../../../_locale"

const FillColor = ({ isShrinked, dropdownPosition, tooltipFalse, onButtonClick, color }) => {
    return (
        <TooltipContainer placement={dropdownPosition} name={t("fillColor")} tooltipFalse={tooltipFalse}>
            <li
                className={`toolbar-button d-flex align-items-center justify-content-center ${
                    isShrinked ? "shrinkElement" : ""
                }`}
            >
                <span className={`button normal-btn fill-color`} title="Fill color" onClick={onButtonClick}>
                    <FillColorIcon color={color} />
                </span>
            </li>
        </TooltipContainer>
    )
}

export default FillColor
