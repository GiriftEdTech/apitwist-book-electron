const validation = {
    /*-------------------
    GEBRUIKERSOPMERKING BIJWERKEN
    --------------------*/

    VAL_NAME_REQ: "Het veld naam is verplicht.",
    VAL_SUR_REQ: "Het veld achternaam is verplicht.",
    VAL_MAIL_REQ: "Het veld e-mail is verplicht.",
    VAL_MAIL_MAIL: "De e-mail moet een geldig e-mailadres zijn.",
    VAL_MAIL_UNIQ: "De e-mail is al in gebruik.",
    VAL_USERNAME_REQ: "Het veld gebruikersnaam is verplicht.",
    VAL_USERNAME_REGEX: "Het formaat van de gebruikersnaam is ongeldig.",
    VAL_USERNAME_UNIQ: "De gebruikersnaam is al in gebruik.",
    VAL_PHONE_NUMERIC: "Het telefoonnummer moet een nummer zijn.",
    VAL_PHONE_DIGIT: "Het telefoonnummer moet 10 cijfers zijn.",
    VAL_PHONE_UNIQ: "Het telefoonnummer is al in gebruik.",
    VAL_AVATAR_MIME: "De avatar moet een bestand zijn van het type: .jpg .jpeg .png.",
    VAL_PASSWORD_CONFIRMED: "De wachtwoordbevestiging komt niet overeen.",
    VAL_PASSWORD_DIGITS: "Het wachtwoord moet tussen 6 en 24 cijfers zijn.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Uitnodiging niet gevonden. De link kan al gebruikt zijn of verlopen.",
    VAL_SUCCESS: "Profiel bijgewerkt",
    CLIENT_TOKEN_ERROR: "We zijn op een probleem gestuit. Probeer het later opnieuw.",

    /*---------------------
    FEEDBACKS
    --------------------- */

    VAL_TYPE_REQ: "Het veld type is verplicht.",
    VAL_DETAIL_REQ: "Het veld detail is verplicht.",

    /*---------------------
    INHOUD MODAAL
    --------------------- */

    textError: "Tekst moet minimaal 3 tekens zijn.",
    httpError: "Voeg 'http://' of 'https://' toe voor website-URL",
    iframeError: "Voeg code toe die begint met '<iframe'",
    fileError: "Bestand moet worden toegevoegd"
}
export default validation
