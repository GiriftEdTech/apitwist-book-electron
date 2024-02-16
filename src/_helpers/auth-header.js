import { utils } from "./utils"

// return authorization header with password token
export function authHeader() {
    let token = utils.getPasswordToken()

    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
    }
}
