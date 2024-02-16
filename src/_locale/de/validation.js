const validation = {
    /*-------------------
    BENUTZERHINWEIS AKTUALISIEREN
    --------------------*/

    VAL_NAME_REQ: "Das Feld für den Namen ist erforderlich.",
    VAL_SUR_REQ: "Das Feld für den Nachnamen ist erforderlich.",
    VAL_MAIL_REQ: "Das Feld für die Mail ist erforderlich.",
    VAL_MAIL_MAIL: "Die Mail muss eine gültige E-Mail-Adresse sein.",
    VAL_MAIL_UNIQ: "Die Mail wird bereits verwendet.",
    VAL_USERNAME_REQ: "Das Feld für den Benutzernamen ist erforderlich.",
    VAL_USERNAME_REGEX: "Das Format des Benutzernamens ist ungültig.",
    VAL_USERNAME_UNIQ: "Der Benutzername wird bereits verwendet.",
    VAL_PHONE_NUMERIC: "Die Telefonnummer muss eine Zahl sein.",
    VAL_PHONE_DIGIT: "Die Telefonnummer muss aus 10 Ziffern bestehen.",
    VAL_PHONE_UNIQ: "Die Telefonnummer wird bereits verwendet.",
    VAL_AVATAR_MIME: "Der Avatar muss eine Datei des Typs .jpg, .jpeg, .png sein.",
    VAL_PASSWORD_CONFIRMED: "Die Passwortbestätigung stimmt nicht überein.",
    VAL_PASSWORD_DIGITS: "Das Passwort muss zwischen 6 und 24 Zeichen lang sein.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Einladung nicht gefunden. Der Link könnte bereits verwendet worden oder abgelaufen sein.",
    VAL_SUCCESS: "Profil aktualisiert",
    CLIENT_TOKEN_ERROR: "Wir sind auf ein Problem gestoßen. Bitte versuchen Sie es später erneut.",

    /*---------------------
    FEEDBACKS
    --------------------- */

    VAL_TYPE_REQ: "Das Feld für den Typ ist erforderlich.",
    VAL_DETAIL_REQ: "Das Feld für das Detail ist erforderlich.",

    /*---------------------
    INHALTS-MODAL
    --------------------- */

    textError: "Text muss mindestens 3 Zeichen lang sein.",
    httpError: "Bitte fügen Sie 'http://' oder 'https://' vor der Webseiten-URL hinzu",
    iframeError: "Bitte fügen Sie Code beginnend mit '<iframe' hinzu",
    fileError: "Datei muss hinzugefügt werden"
}

export default validation
