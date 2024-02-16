import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, Container, Row } from "react-bootstrap"
import { history, utils } from "../../_helpers"
import { userService } from "../../_services"
import { userActions } from "../../_actions"
import Language from "../partials/Language"
import useViewport from "../../_hooks/useViewport"
import { useState } from "react"

export const Auth = ({ title, text, children }) => {
    const dispatch = useDispatch()
    const { width } = useViewport()
    const { loggedIn, loading } = useSelector((state) => state.users)
    const { isDark } = useSelector((state) => state.theme)
    const [isLanguageOpen, setLanguageOpen] = useState(false)
    const client_token = utils.getClientToken()
    const clientToken_expires_at = utils.getClientTokenExpiresAt()
    const password_token = utils.getPasswordToken()

    useEffect(() => {
        if (
            !client_token ||
            (clientToken_expires_at && clientToken_expires_at < new Date()) ||
            client_token === null ||
            client_token === "undefined"
        ) {
            userService.generateClientToken()
        }
    }, [client_token])

    useEffect(() => {
        if (password_token) {
            if (loggedIn) {
                history.push("/")
            } else {
                if (!loading) {
                    dispatch(userActions.profile())
                }
            }
        }
    }, [password_token, loading, loggedIn])

    return (
        <Container className="my-5">
            <Row className="m-0 justify-content-center align-items-center" style={{ height: "inherit" }}>
                <Col sm="12" md="10" className="d-flex justify-content-center auth_container p-0">
                    <Row className="m-0">
                        <Col lg="6" md="12" className="p-4 d-flex flex-column">
                            <div className="logo_wrapper mb-4 text-center">
                                <img
                                    className="logo auth-logo"
                                    src={
                                        process.env.PUBLIC_URL +
                                        `/assets/img/logo/${isDark ? "apitwist_logo_light" : "apitwist_logo"}.svg`
                                    }
                                    alt="Logo"
                                />
                            </div>
                            <div className="auth_section">
                                <h3 className="auth_title">{title}</h3>
                                <p className="auth_text">{text}</p>
                                {children}
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="auth_footer">© {new Date().getFullYear()} ApiTwist</div>

                                <Language
                                    width={width}
                                    isLanguageOpen={isLanguageOpen}
                                    setLanguageFalse={() => setLanguageOpen(false)}
                                />
                            </div>
                        </Col>
                        <Col
                            lg="6"
                            className="d-lg-flex d-none align-items-center justify-content-center px-1 py-0 auth_side"
                        >
                            <img
                                src={process.env.PUBLIC_URL + "/assets/img/login.png"}
                                alt="Login"
                                style={{
                                    maxWidth: "80%",
                                    maxHeight: "100%"
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
