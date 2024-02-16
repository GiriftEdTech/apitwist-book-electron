import { toast } from "react-toastify"
import { authHeader, utils } from "../_helpers"
import { getTranslatedText as t } from "../_locale"

const config = {
    apiUrl: process.env.REACT_APP_API_URL
}

export const feedbackService = {
    submitFeedback
}

function submitFeedback({ type, detail, url, section, book_id, page }) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ type, detail, url, section, book_id, page })
    }
    return fetch(`${config.apiUrl}/feedbacks/store`, requestOptions)
        .then(utils.handleResponse)
        .then((response) => {
            if (response.status !== true) {
                response.messages.map((msg) => console.log(msg))
                response.messages.map((msg_1) => toast.error(t(msg_1)))
            } else {
                toast.success(t("feedbackMessage"))
            }
            return response
        })
        .catch(function (error) {
            return Promise.reject(error)
        })
}
