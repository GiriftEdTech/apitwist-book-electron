import React from "react"
import { useSelector } from "react-redux"
import Select from "react-select"
import { getTranslatedText as t } from "../../_locale"

const SelectBar = ({ options, optionSelected, onInputChange, name, placeHolder }) => {
    const { isDark } = useSelector((state) => state.theme)
    let colors = {
        bgPrimary: "#7367f0",
        bgDark0: "hsl(224, 38%, 14%)",
        bgDark1: "hsl(224, 27%, 22%)",
        bgDark2: "hsl(224, 28%, 42%)",
        white: "hsl(0, 0%, 100%)",
        black: "black",
        fontDark: "#d0d2d6",
        btnHover: "hsl(0, 0%, 90%)",
        fontSecondary: "rgba(98, 98, 98, 1)",
        shadow: "0 0 0 0.2rem rgb(111 76 209 / 60%)",
        border: "1px solid rgba(111, 76, 209, 0.603)"
    }

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
            color: isDark ? colors.fontDark : colors.black,
            backgroundColor: isDark ? colors.bgDark1 : colors.white,
            "&:hover": {
                backgroundColor: isDark ? colors.bgDark2 : colors.btnHover
            }
        }),

        singleValue: (provided, state) => ({
            ...provided,
            color: isDark ? colors.fontDark : colors.black
        }),
        control: (provided, state) => ({
            ...provided,
            fontSize: "14px",
            backgroundColor: isDark ? colors.bgDark1 : colors.white,
            border: state.isFocused && colors.border,
            boxShadow: state.isFocused && colors.shadow,
            "&:hover": {
                backgroundColor: colors.shadow
            }
        }),

        placeholder: (provided) => ({
            ...provided,
            fontSize: "14px",
            color: isDark ? colors.fontDark : colors.fontSecondary
        }),
        input: (provided) => ({
            ...provided,
            fontSize: "14px",
            color: isDark ? colors.fontDark : colors.black
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: isDark ? colors.bgDark1 : colors.white
        })
    }

    const handleSelect = (selected) => {
        onInputChange(name, selected.value)
    }

    return (
        <>
            <Select
                id="books"
                maxMenuHeight={300}
                styles={customStyles}
                options={options}
                placeholder={placeHolder}
                onChange={(selected) => handleSelect(selected)}
                value={optionSelected}
                name={name}
                classNamePrefix="select"
            />
        </>
    )
}

export default SelectBar
