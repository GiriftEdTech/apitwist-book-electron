import React from "react"
import { Auth } from "../../components/auth/Auth"
import RegisterForm from "../../components/auth/RegisterForm"
import { getTranslatedText as t } from "../../_locale"

const Register = ({ history }) => {
    return (
        <Auth title={t("register")} text={t("registerText")}>
            <RegisterForm history={history} />
        </Auth>
    )
}

export default Register
