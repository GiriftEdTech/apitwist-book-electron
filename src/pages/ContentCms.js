import React from "react"
import PlainHeader from "../components/partials/PlainHeader"
import H5pEditor from "../components/H5P/H5pEditor"
import Footer from "../components/partials/Footer"

const ContentCms = () => {
    return (
        <div>
            <PlainHeader />

            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <H5pEditor />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContentCms
