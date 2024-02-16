import React from "react"
import { Auth } from "../../components/auth/Auth"
import LoginForm from "../../components/auth/LoginForm"
import { getTranslatedText as t } from "../../_locale"

const Login = ({ history }) => {
    return (
        <Auth title={t("login")} text={t("loginText")}>
            <LoginForm history={history} />
        </Auth>
    )
}

export default Login
