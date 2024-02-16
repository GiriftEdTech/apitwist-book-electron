import React from "react"
import ClassCover from "./ClassCover"

const ClassContainer = ({ classes, component }) => {
    return (
        <div className="class_grid_container">
            {classes &&
                classes.map((cls, i) => {
                    return (
                        <div key={i}>
                            <ClassCover component={component} perClass={cls} index={i} />
                        </div>
                    )
                })}
        </div>
    )
}

export default ClassContainer
