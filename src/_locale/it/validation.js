const validation = {
    /*-------------------
    AGGIORNAMENTO NOTA UTENTE
    --------------------*/

    VAL_NAME_REQ: "Il campo nome è obbligatorio.",
    VAL_SUR_REQ: "Il campo cognome è obbligatorio.",
    VAL_MAIL_REQ: "Il campo mail è obbligatorio.",
    VAL_MAIL_MAIL: " La mail deve essere un indirizzo email valido.",
    VAL_MAIL_UNIQ: "La mail è già stata utilizzata.",
    VAL_USERNAME_REQ: "Il campo nome utente è obbligatorio.",
    VAL_USERNAME_REGEX: "Il formato del nome utente non è valido.",
    VAL_USERNAME_UNIQ: "Il nome utente è già stato utilizzato.",
    VAL_PHONE_NUMERIC: "Il telefono deve essere un numero.",
    VAL_PHONE_DIGIT: "Il telefono deve essere di 10 cifre.",
    VAL_PHONE_UNIQ: "Il telefono è già stato utilizzato.",
    VAL_AVATAR_MIME: "L'avatar deve essere un file di tipo: .jpg .jpeg .png.",
    VAL_PASSWORD_CONFIRMED: "La conferma della password non corrisponde.",
    VAL_PASSWORD_DIGITS: "La password deve essere tra 6 e 24 cifre.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Invito non trovato. Il link potrebbe essere già stato utilizzato o scaduto.",
    VAL_SUCCESS: "Profilo aggiornato",
    CLIENT_TOKEN_ERROR: "Abbiamo riscontrato un problema. Si prega di riprovare più tardi.",

    /*---------------------
    FEEDBACK
    --------------------- */

    VAL_TYPE_REQ: "Il campo tipo è obbligatorio.",
    VAL_DETAIL_REQ: "Il campo dettaglio è obbligatorio.",

    /*---------------------
    MODALE CONTENUTO
    --------------------- */

    textError: "Il testo deve essere di almeno 3 caratteri.",
    httpError: "Si prega di aggiungere 'http://' o 'https://' prima dell'URL del sito web",
    iframeError: "Si prega di aggiungere codice che inizia con '<iframe'",
    fileError: "Deve essere aggiunto un file"
}
export default validation
