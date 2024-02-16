import React from "react"
import { Container, Col, Row } from "react-bootstrap"
import { getTranslatedText as t } from "../../_locale"
import { Home } from "../../components/icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const NotFound = () => {
    const { isDark } = useSelector((state) => state.theme)
    return (
        <Container style={{ height: "100vh" }}>
            <Row className="m-0 justify-content-center align-items-center" style={{ height: "inherit" }}>
                <Col sm="12" md="10" className="d-flex justify-content-center auth_container p-0">
                    <Row className="m-0">
                        <Col lg="6" md="12" className="p-4 d-flex flex-column justify-content-between">
                            <div className="logo_wrapper mb-4">
                                <img
                                    className="logo error-logo"
                                    src={process.env.PUBLIC_URL + "/assets/img/logo/apitwist_logo.svg"}
                                    alt="Logo"
                                />
                            </div>
                            <div className="auth_section py-5">
                                <h1 className="display-4 mb-3" style={{ fontSize: "2rem" }}>
                                    {t("notFound")}
                                </h1>
                                <Link to="/" className="btn btn-primary">
                                    <Home color="var(--c-body-bg)" width="1.5em" height="1.5em" />
                                    <span className="vertical-middle ml-1 text-white">{t("home")}</span>
                                </Link>
                            </div>
                            <div className="auth_footer">© {new Date().getFullYear()} ApiTwist</div>
                        </Col>
                        <Col lg="6" md="12" className="d-lg-flex d-none align-items-center justify-content-center">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/assets/img/" +
                                    (isDark ? "dark_404" : "light_404") +
                                    ".png"
                                }
                                alt="404NotFound"
                                style={{
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    width: "100%"
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound
