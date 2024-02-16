import React from "react"
import { utils } from "../../_helpers"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import Avatar from "./Avatar"
import { LogOut, User } from "../icons"
import { getTranslatedText as t } from "../../_locale"
import { useEffect } from "react"
import { userActions } from "../../_actions"
import Logo from "./Logo"

const PlainHeader = () => {
    const dispatch = useDispatch()
    const { user, loggedIn } = useSelector((state) => state.users)

    useEffect(() => {
        loggedIn === null && Object.keys(user).length === 0 && dispatch(userActions.profile())
    }, [loggedIn, user])

    return (
        <header className="align-items-center d-flex">
            <div className="logo d-flex">
                <Logo />
            </div>
            <div className="right d-flex align-items-center ml-auto">
                <div className="avatar">
                    <Avatar />
                    <ul className="profile_menu">
                        <NavLink to="/profile">
                            <li>
                                <User className="mr-2" /> {t("profile")}
                            </li>
                        </NavLink>
                        <li
                            onClick={() => {
                                dispatch(userActions.logout())
                            }}
                        >
                            <LogOut className="mr-2" /> {t("logout")}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default PlainHeader
