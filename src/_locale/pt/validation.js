export const validation = {
    /*-------------------
    ATUALIZAR NOTA DO USUÁRIO
    --------------------*/

    VAL_NAME_REQ: "O campo de nome é obrigatório.",
    VAL_SUR_REQ: "O campo de sobrenome é obrigatório.",
    VAL_MAIL_REQ: "O campo de e-mail é obrigatório.",
    VAL_MAIL_MAIL: "O e-mail deve ser um endereço de e-mail válido.",
    VAL_MAIL_UNIQ: "O e-mail já foi utilizado.",
    VAL_USERNAME_REQ: "O campo de nome de usuário é obrigatório.",
    VAL_USERNAME_REGEX: "O formato do nome de usuário é inválido.",
    VAL_USERNAME_UNIQ: "O nome de usuário já foi utilizado.",
    VAL_PHONE_NUMERIC: "O telefone deve ser um número.",
    VAL_PHONE_DIGIT: "O telefone deve ter 10 dígitos.",
    VAL_PHONE_UNIQ: "O telefone já foi utilizado.",
    VAL_AVATAR_MIME: "O avatar deve ser um arquivo dos tipos: .jpg .jpeg .png.",
    VAL_PASSWORD_CONFIRMED: "A confirmação de senha não corresponde.",
    VAL_PASSWORD_DIGITS: "A senha deve ter entre 6 e 24 dígitos.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Convite não encontrado. O link pode já ter sido usado ou ter expirado.",
    VAL_SUCCESS: "Perfil atualizado",
    CLIENT_TOKEN_ERROR: "Encontramos um problema. Por favor, tente novamente mais tarde.",

    /*---------------------
    FEEDBACKS
    --------------------- */

    VAL_TYPE_REQ: "O campo de tipo é obrigatório.",
    VAL_DETAIL_REQ: "O campo de detalhes é obrigatório.",

    /*---------------------
    MODAL DE CONTEÚDO
    --------------------- */

    textError: "O texto deve ter pelo menos 3 caracteres.",
    httpError: "Por favor, adicione 'http://' ou 'https://' antes da URL do site.",
    iframeError: "Por favor, adicione um código que comece com '<iframe'",
    fileError: "O arquivo deve ser adicionado"
}
