import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { getTranslatedText as t } from "../../_locale"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Mail, Phone, User } from "../../components/icons"
import { alertActions } from "../../_actions"
import { utils } from "../../_helpers"

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user)

    useEffect(() => {
        dispatch(alertActions.clear())
    }, [])

    return (
        <Row>
            <Col xl="6" lg="12" className="d-flex my-3">
                <div className="mr-3">{utils.getAvatar(user, true)}</div>

                <div className="user-primary-info d-flex flex-column justify-content-between align-items-start">
                    <h4>
                        {user && user.name} {user && user.surname}
                    </h4>
                    <span className="text-muted">@{user && user.username}</span>
                    <NavLink to="/profile/edit" className="btn btn-primary btn-sm mt-auto px-2">
                        {t("edit")}
                    </NavLink>
                </div>
            </Col>
            <Col xl="6" lg="12" className="my-3 d-flex flex-column justify-content-center">
                <div className="user-info ">
                    <div className="d-flex flex-wrap my-2">
                        <div className="user-info-title">
                            <User />
                            <span className="card-text ml-3 mb-0">{t("name")}</span>
                        </div>
                        <p className="card-text mb-0">
                            {user && user.name} {user && user.surname}
                        </p>
                    </div>
                    <div className="d-flex flex-wrap my-2">
                        <div className="user-info-title">
                            <Phone />
                            <span className="card-text ml-3 mb-0">{t("phone")}</span>
                        </div>
                        <p className="card-text mb-0">{user && user.phone}</p>
                    </div>
                    <div className="d-flex flex-wrap my-2">
                        <div className="user-info-title">
                            <Mail />
                            <span className="card-text ml-3 mb-0">{t("email")}</span>
                        </div>
                        <p className="card-text mb-0">{user && user.email}</p>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Profile
