import React from "react"
import { NavLink } from "react-router-dom"
import { utils } from "../../_helpers"
import { useSelector } from "react-redux"

const Logo = () => {
    const { user } = useSelector((state) => state.users)
    const { isDark } = useSelector((state) => state.theme)
    return (
        <div className="logo">
            <NavLink to="/">
                {utils.getLogo(user) ? (
                    <img src={`${utils.getLogo(user)}`} alt="ApiTwist Logo" />
                ) : (
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            "/assets/img/logo/" +
                            (isDark ? "apitwist_logo_light" : "apitwist_logo") +
                            ".svg"
                        }
                        alt="ApiTwist Logo"
                    />
                )}
            </NavLink>
        </div>
    )
}

export default React.memo(Logo)
