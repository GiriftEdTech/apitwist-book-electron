import React from "react"
import { getTranslatedText as t } from "../../_locale"
import { useSelector } from "react-redux"
import { utils } from "../../_helpers"

const Footer = () => {
    const { user } = useSelector((state) => state.users)
    return (
        <footer className="footer text-center d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center">
                <span>Powered by </span>
                <img className="footer-logo" src={`/assets/img/logo/logo_no_motto.svg`} alt="ApiTwist Logo" />
            </div>
        </footer>
    )
}

export default React.memo(Footer)
