import React from "react"
import { utils } from "../../_helpers"
import { languageList, getTranslatedText as t } from "../../_locale"

const Language = ({ width, toggleLanguage, isLanguageOpen, setLanguageFalse }) => {
    function languageMenu() {
        return (
            <ul className="lang_menu">
                {Object.keys(languageList).map((lang, index) => {
                    return (
                        <li
                            key={index}
                            className={utils.getStore("locale") === lang ? "active" : ""}
                            onClick={() => {
                                utils.changeLocale(lang, setLanguageFalse)
                            }}
                        >
                            <span className="lang_shortcode">{lang.toUpperCase()}</span>{" "}
                            {utils.capitalize(t(languageList[lang]))}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="lang p-2 rounded hover-bg">
            <span
                className={`text-uppercase ${
                    utils.getFirstPath() === "login" || utils.getFirstPath() === "register" ? "auth" : "header"
                }`}
                onClick={toggleLanguage && toggleLanguage}
            >
                {utils.getStore("locale") ?? "en"}
            </span>

            {width < 820 && isLanguageOpen ? languageMenu() : languageMenu()}
        </div>
    )
}

export default Language
