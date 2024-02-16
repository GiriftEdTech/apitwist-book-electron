import React from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

const TooltipContainer = ({ placement, name, children, tooltipFalse, icon }) => {
    return (
        <OverlayTrigger
            placement={placement ?? "right"}
            overlay={
                <Tooltip id="button-tooltip">
                    <div style={{ marginTop: 1 }}>
                        {name}
                        {icon && <span className="tooltip-icon">{icon}</span>}
                    </div>
                </Tooltip>
            }
            show={tooltipFalse}
        >
            {children}
        </OverlayTrigger>
    )
}

export default React.memo(TooltipContainer)
