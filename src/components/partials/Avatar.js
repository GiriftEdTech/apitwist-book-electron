import { useSelector } from "react-redux"
import { utils } from "../../_helpers"
import React from "react"
import AvatarLoader from "./AvatarLoader"

const Avatar = () => {
    const { user, loggedIn, loading } = useSelector((state) => state.users)

    return (
        <>
            {loading && !loggedIn && !user && <AvatarLoader />}
            {loggedIn && user && utils.getAvatar(user)}
        </>
    )
}
export default Avatar
