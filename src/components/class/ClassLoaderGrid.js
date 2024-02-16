import React from "react"
import ClassLoader from "./ClassLoader"

const ClassLoaderGrid = () => {
    return (
        <div className="d-flex justify-content-center">
            <ClassLoader className="mx-3" />
            <ClassLoader className="mx-3 d-none d-md-block" />
            <ClassLoader className="mx-3 d-none d-lg-block" />
        </div>
    )
}

export default ClassLoaderGrid
