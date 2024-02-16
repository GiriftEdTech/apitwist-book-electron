const validation = {
    /*-------------------
    ACTUALIZARE NOTĂ UTILIZATOR
    --------------------*/

    VAL_NAME_REQ: "Câmpul nume este obligatoriu.",
    VAL_SUR_REQ: "Câmpul prenume este obligatoriu.",
    VAL_MAIL_REQ: "Câmpul mail este obligatoriu.",
    VAL_MAIL_MAIL: " Mailul trebuie să fie o adresă de email validă.",
    VAL_MAIL_UNIQ: "Mailul a fost deja folosit.",
    VAL_USERNAME_REQ: "Câmpul nume utilizator este obligatoriu.",
    VAL_USERNAME_REGEX: "Formatul numelui de utilizator este invalid.",
    VAL_USERNAME_UNIQ: "Numele de utilizator a fost deja folosit.",
    VAL_PHONE_NUMERIC: "Telefonul trebuie să fie un număr.",
    VAL_PHONE_DIGIT: "Telefonul trebuie să fie de 10 cifre.",
    VAL_PHONE_UNIQ: "Numărul de telefon a fost deja folosit.",
    VAL_AVATAR_MIME: "Avatarul trebuie să fie un fișier de tipul: .jpg .jpeg .png.",
    VAL_PASSWORD_CONFIRMED: "Confirmarea parolei nu se potrivește.",
    VAL_PASSWORD_DIGITS: "Parola trebuie să aibă între 6 și 24 de cifre.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Invitația nu a fost găsită. Link-ul poate fi deja folosit sau expirat.",
    VAL_SUCCESS: "Profil actualizat",
    CLIENT_TOKEN_ERROR: "Am întâmpinat o problemă. Vă rugăm să încercați mai târziu.",

    /*---------------------
    FEEDBACK-URI
    --------------------- */

    VAL_TYPE_REQ: "Câmpul tip este obligatoriu.",
    VAL_DETAIL_REQ: "Câmpul detaliu este obligatoriu.",

    /*---------------------
    MODAL CONȚINUT
    --------------------- */

    textError: "Textul trebuie să aibă cel puțin 3 caractere.",
    httpError: "Vă rugăm să adăugați 'http://' sau 'https://' înaintea URL-ului site-ului web",
    iframeError: "Vă rugăm să adăugați codul începând cu '<iframe'",
    fileError: "Trebuie adăugat un fișier"
}

export default validation
