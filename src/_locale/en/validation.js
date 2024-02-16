const validation = {
    /*-------------------
    UPDATE USER NOTE
    --------------------*/

    VAL_NAME_REQ: "The name field is required.",
    VAL_SUR_REQ: "The surname field is required.",
    VAL_MAIL_REQ: "The mail field is required.",
    VAL_MAIL_MAIL: " The mail must be a valid email address.",
    VAL_MAIL_UNIQ: "The mail has already been taken.",
    VAL_USERNAME_REQ: "The username field is required.",
    VAL_USERNAME_REGEX: "The username format is invalid.",
    VAL_USERNAME_UNIQ: "The username has already been taken.",
    VAL_PHONE_NUMERIC: "The phone must be a number.",
    VAL_PHONE_DIGIT: "The phone must be 10 digits.",
    VAL_PHONE_UNIQ: "The phone has already been taken.",
    VAL_AVATAR_MIME: "The avatar must be a file of type: .jpg .jpeg .png.",
    VAL_PASSWORD_CONFIRMED: "The password confirmation does not match.",
    VAL_PASSWORD_DIGITS: "The password must be between 6 and 24 digits.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Invitation not found. The link may be already used or expired.",
    VAL_SUCCESS: "Profile updated",
    CLIENT_TOKEN_ERROR: "We've run into a problem. Please try again later.",

    /*---------------------
    FEEDBACKS
    --------------------- */

    VAL_TYPE_REQ: "The type field is required.",
    VAL_DETAIL_REQ: "The detail field is required.",

    /*---------------------
    CONTENT MODAL
    --------------------- */

    textError: "Text must be at least 3 characters.",
    httpError: "Please add 'http://' or 'https://' before web site url",
    iframeError: "Please add code starting with '<iframe'",
    fileError: "File must be added"
}
export default validation
