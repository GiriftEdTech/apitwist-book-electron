import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import { utils } from "../_helpers"
import { getTranslatedText as t } from "../_locale"

const Banner = () => {
    const history = useHistory()
    const { loggedIn, user } = useSelector((state) => state.users)
    return (
        <div className="banner my-5">
            <Container>
                <Row>
                    <Col xs="12" lg="7">
                        {loggedIn && utils.userIsNotStudent(user) ? (
                            <>
                                <h1 className="banner_title">EduMentor AI</h1>
                                <h3 className="banner_detail mt-3">{t("bannerDetail")}</h3>
                                <button
                                    onClick={() => {
                                        window.location.href = "/edumentor"
                                    }}
                                    className={"btn btn-primary mt-4"}
                                    style={{
                                        fontWeight: "600"
                                    }}
                                >
                                    EduMentor AI
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="banner_title">{t("bannerTitle")}</h1>{" "}
                                <h3 className="banner_detail mt-3">
                                    {t("bannerDetail1")}
                                    <a href="https://lms.apitwist.com" target="_blank">
                                        lms.apitwist.com
                                    </a>
                                    {t("bannerDetail2")}
                                </h3>
                            </>
                        )}
                    </Col>
                    <Col xs="12" lg={{ size: 4, offset: 1 }} className="text-center my-4">
                        <img
                            className="img-fluid"
                            src={process.env.PUBLIC_URL + "/assets/img/banner.svg"}
                            alt="banner"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default React.memo(Banner)
