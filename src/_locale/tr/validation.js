const validation = {
    /*-------------------
    UPDATE USER NOTE
    --------------------*/

    VAL_NAME_REQ: "İsim alanı gereklidir.",
    VAL_SUR_REQ: "Soyisim alanı gereklidir.",
    VAL_MAIL_REQ: "E-posta alanı gereklidir.",
    VAL_MAIL_MAIL: " Girilen e-posta adresi geçersiz.",
    VAL_MAIL_UNIQ: "E-posta daha önceden kayıt edilmiş.",
    VAL_USERNAME_REQ: "Kullanıcı Adı alanı gereklidir.", // sayfalar oluşturulurken çeviriler gözden geçirilecek.
    VAL_USERNAME_REGEX: "Kullanıcı Adı biçimi geçersiz.",
    VAL_USERNAME_UNIQ: "Kullanıcı Adı daha önceden kayıt edilmiş.",
    VAL_PHONE_NUMERIC: "Telefon sadece sayı olmalıdır.",
    VAL_PHONE_DIGIT: "Telefon 10 haneden oluşmalıdır.",
    VAL_PHONE_UNIQ: "Telefon daha önceden kayıt edilmiş.",
    VAL_AVATAR_MIME: "Avatar dosya biçimi .jpg .jpeg .png olmalıdır.",
    VAL_PASSWORD_CONFIRMED: "Parola tekrarı eşleşmiyor.",
    VAL_PASSWORD_DIGITS: "Parola 6 ile 24 arasında haneden oluşmalıdır.",
    VAL_PASSWORD_DEFAULTS: "",
    VAL_INVITATION_FAIL: "Davetiye bulunamadı. Link daha önce kullanılmış veya süresi dolmuş olabilir.",
    VAL_SUCCESS: "İşlem başarılı",
    CLIENT_TOKEN_ERROR: "Bir sorunla karşılaştık. Lütfen daha sonra tekrar deneyin.",

    /*---------------------
    FEEDBACKS
    --------------------- */

    VAL_TYPE_REQ: "Geri bildirim tipi alanı gereklidir.", // sayfalar oluşturulurken çeviriler gözden geçirilecek.
    VAL_DETAIL_REQ: "Geri bildirim detayı alanı gereklidir.", // sayfalar oluşturulurken çeviriler gözden geçirilecek.

    /*---------------------
    CONTENT MODAL
    --------------------- */

    textError: "Yazı en az 3 karakter olmalıdır.",
    httpError: "Web sitesinden önce 'http://' veya 'https://' ekleyin.",
    iframeError: "'<iframe' ile başlayan kodu ekleyin. ",
    fileError: "Dosya eklenmelidir."
}
export default validation
