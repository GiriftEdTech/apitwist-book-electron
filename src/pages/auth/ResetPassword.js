import React from "react"
import { Auth } from "../../components/auth/Auth"
import { getTranslatedText as t } from "../../_locale"
import ResetPasswordForm from "../../components/auth/ResetPasswordForm"

const ResetPassword = ({ history }) => {
    return (
        <Auth title={t("resetPassword")} text={t("resetText")}>
            <ResetPasswordForm history={history} />
        </Auth>
    )
}

export default ResetPassword
