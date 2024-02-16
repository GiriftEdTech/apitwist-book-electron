const validation = {
    /*-------------------
    MISE À JOUR DE LA NOTE DE L'UTILISATEUR
    --------------------*/

    VAL_NAME_REQ: "Le champ du nom est obligatoire.",
    VAL_SUR_REQ: "Le champ du nom de famille est obligatoire.",
    VAL_MAIL_REQ: "Le champ du mail est obligatoire.",
    VAL_MAIL_MAIL: "Le mail doit être une adresse e-mail valide.",
    VAL_MAIL_UNIQ: "Le mail est déjà utilisé.",
    VAL_USERNAME_REQ: "Le champ du nom d'utilisateur est obligatoire.",
    VAL_USERNAME_REGEX: "Le format du nom d'utilisateur est invalide.",
    VAL_USERNAME_UNIQ: "Le nom d'utilisateur est déjà pris.",
    VAL_PHONE_NUMERIC: "Le téléphone doit être un nombre.",
    VAL_PHONE_DIGIT: "Le téléphone doit comporter 10 chiffres.",
    VAL_PHONE_UNIQ: "Le numéro de téléphone est déjà utilisé.",
    VAL_AVATAR_MIME: "L'avatar doit être un fichier de type : .jpg, .jpeg, .png.",
    VAL_PASSWORD_CONFIRMED: "La confirmation du mot de passe ne correspond pas.",
    VAL_PASSWORD_DIGITS: "Le mot de passe doit être entre 6 et 24 chiffres.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Invitation introuvable. Le lien a peut-être déjà été utilisé ou est expiré.",
    VAL_SUCCESS: "Profil mis à jour",
    CLIENT_TOKEN_ERROR: "Nous avons rencontré un problème. Veuillez réessayer plus tard.",

    /*---------------------
    RETOURS
    --------------------- */

    VAL_TYPE_REQ: "Le champ du type est obligatoire.",
    VAL_DETAIL_REQ: "Le champ du détail est obligatoire.",

    /*---------------------
    MODAL DE CONTENU
    --------------------- */

    textError: "Le texte doit comporter au moins 3 caractères.",
    httpError: "Veuillez ajouter 'http://' ou 'https://' avant l'URL du site web",
    iframeError: "Veuillez ajouter un code commençant par '<iframe'",
    fileError: "Un fichier doit être ajouté"
}
