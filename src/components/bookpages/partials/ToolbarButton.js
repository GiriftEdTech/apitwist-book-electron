import React from "react"
import TooltipContainer from "./TooltipContainer"

const ToolbarButton = ({
    image,
    name,
    rotate,
    active,
    onButtonClick,
    children,
    dropdownPosition,
    icon,
    data_tut,
    tooltipFalse,
    color_class
}) => {
    return (
        <TooltipContainer placement={dropdownPosition} name={name} icon={icon} tooltipFalse={tooltipFalse}>
            <li
                data-tut={data_tut}
                className={`toolbar-button d-flex align-items-center justify-content-center 
        ${active ? "active" : ""}  btn-${color_class ?? ""}`}
                onMouseUp={(e) => {
                    e.preventDefault()
                    onButtonClick()
                }}
                onTouchEnd={(e) => {
                    e.preventDefault()
                    onButtonClick()
                }}
            >
                {image && (
                    <img
                        src={`/assets/img/toolbar/${image}.svg`}
                        alt="Tool"
                        style={rotate ? { transform: `rotate(${rotate})` } : {}}
                        className="toolbar-image"
                    />
                )}
                {children}
            </li>
        </TooltipContainer>
    )
}

export default React.memo(ToolbarButton)
