import { utils } from "./utils"

// return authorization header with password token
export function clientHeader() {
    let token = utils.getClientToken()

    return {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json"
    }
}
