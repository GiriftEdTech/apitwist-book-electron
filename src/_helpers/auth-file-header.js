import { utils } from "./utils"

// return authorization header with password token
export function authFileHeader() {
    let token = utils.getPasswordToken()

    return { Authorization: "Bearer " + token, Accept: "application/json" }
}
