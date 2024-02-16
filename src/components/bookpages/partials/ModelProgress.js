import React from "react"
import { utils } from "../../../_helpers"
import { getTranslatedText as t } from "../../../_locale"

const ModelProgress = ({ selectedModel }) => {
    return (
        <div className="d-flex flex-column w-100 px-3 mt-1 progress-model">
            {Object.keys(selectedModel.attribute).map((item) => (
                <div className="d-flex mb-2">
                    <small className="text-muted mb-1">{utils.capitalize(t(item))}</small>
                    <div class="progress">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${selectedModel.attribute[item] * 20}%` }}
                            aria-valuenow={`${selectedModel.attribute[item] * 20}%`}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ModelProgress
