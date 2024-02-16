import React from "react"
import { Auth } from "../../components/auth/Auth"
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm"
import { getTranslatedText as t } from "../../_locale"

const ForgotPassword = ({ history }) => {
    return (
        <Auth title={t("forgotPassword")} text={t("forgotText")}>
            <ForgotPasswordForm history={history} />
        </Auth>
    )
}

export default ForgotPassword
