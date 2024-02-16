import React, { useEffect, useLayoutEffect } from "react"
import Header from "../../components/partials/Header"
import Footer from "../../components/partials/Footer"
import { utils } from "../../_helpers"
import { userActions } from "../../_actions"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getTranslatedText as t } from "../../_locale"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { MessageCircle } from "../../components/icons"
import Feedback from "../../components/partials/Feedback"
import { useHistory } from "react-router-dom"
import { useReactPath } from "../../_hooks/useReactPath"
import * as Sentry from "@sentry/react"

const MainLayout = ({ children }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user, loading, loggedIn, hasReset, hasRegister } = useSelector((state) => state.users)
    const { books } = useSelector((state) => state.books)
    const { isDark } = useSelector((state) => state.theme)
    const client_token = utils.getClientToken()
    const clientToken_expires_at = utils.getClientTokenExpiresAt()
    const password_token = utils.getPasswordToken()
    const [feedbackModalIsOpen, setFeedbackModalOpen] = useState(false)
    const path = useReactPath()
    function clearLocalStorage() {
        utils.deleteStore("clientToken")
        utils.deleteStore("clientToken_expires_at")
        utils.deleteStore("passwordToken")
    }

    useEffect(() => {
        utils.objectHasLength(user) && Sentry.setUser({ email: user.email, id: user.id })
        if (!user && !loggedIn && !loading) {
            setTimeout(() => {
                history.push("/login")
                window.location.reload()
            }, 300)
        }
    }, [user, loggedIn, loading])

    useEffect(() => {
        if (!client_token || !clientToken_expires_at || !password_token || password_token === "undefined") {
            clearLocalStorage()
            setTimeout(() => {
                history.push("/login")
                window.location.reload()
            }, 300)
        }
        if (password_token && password_token !== "undefined" && user && Object.keys(user).length === 0) {
            dispatch(userActions.profile())
        }
    }, [])

    useEffect(() => {
        if (hasReset) {
            toast.success(t("passwordChanged"))
        }

        if (hasRegister) {
            toast.success(t("registeredSuccess"))
        }
    }, [hasReset, hasRegister])

    return loggedIn ? (
        <>
            <Header />
            <main>{children}</main>
            {!path.includes("edumentor") && <Footer />}
            <div className="feedback left">
                <Button
                    className="btn btn-primary rounded-pill shadow-lg d-flex align-items-center"
                    onClick={() => setFeedbackModalOpen(true)}
                >
                    <MessageCircle className="mr-1" width="0.9em" />
                    <span>{t("feedback")}</span>
                </Button>
            </div>

            {feedbackModalIsOpen && <Feedback show={feedbackModalIsOpen} setShow={setFeedbackModalOpen} />}
        </>
    ) : null
}

export default MainLayout
