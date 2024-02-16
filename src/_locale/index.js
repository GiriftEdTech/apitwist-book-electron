import { utils } from "../_helpers"
import en from "./en"
import tr from "./tr"
import pl from "./pl"
import el from "./el"
import is from "./is"
import pt from "./pt"
import de from "./de"
import fr from "./fr"
import it from "./it"
import nl from "./nl"
import ro from "./ro"

export const languageList = {
    en: "english",
    tr: "turkish",
    pl: "polski",
    el: "greek",
    is: "icelandic",
    pt: "portuguese",
    de: "german",
    fr: "french",
    it: "italian",
    nl: "netherlandish",
    ro: "romanian"
}

export const languages = {
    en,
    tr,
    pl,
    el,
    is,
    pt,
    de,
    fr,
    it,
    nl,
    ro
}

const getTranslatedText = (string, locale) => {
    let curLocale = utils.getStore("locale")
    if (!curLocale) {
        utils.setStore("locale", "en")
        curLocale = "en"
    }
    const curTranslation = languages[locale] ?? languages[curLocale] ?? languages["en"]
    return curTranslation[string] ?? string
}

export { getTranslatedText }
