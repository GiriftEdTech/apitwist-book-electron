import { utils } from "../../_helpers"
import { languageList } from "../../_locale"
import { getTranslatedText as t } from "../../_locale"
import SelectBar from "./SelectBar"

const SelectLanguage = ({ formValues, setFormValues, optionSelected, name, placeHolder }) => {
    const getLanguageObject = (value) => {
        return utils.languages().find((language) => language.value === value)
    }
    const onInputChange = (field, value) => {
        if (field === "sourceLang" || field === "targetLang" || field === "lang") {
            setFormValues({ ...formValues, [field]: getLanguageObject(value) })
        } else {
            setFormValues({ ...formValues, [field]: typeof value === "string" ? value.trim() : value })
        }
    }

    return (
        <div className="w-100 h-100">
            <SelectBar
                options={utils.languages()}
                onInputChange={onInputChange}
                optionSelected={optionSelected}
                name={name}
                placeHolder={placeHolder}
            />
        </div>
    )
}

export default SelectLanguage
