import React, { useState } from "react"
import { useSelector } from "react-redux"
import Autosuggest from "react-autosuggest"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import { Badge } from "react-bootstrap"
import { utils } from "../../_helpers"
import { getTranslatedText as t } from "../../_locale"
import Favorite from "../books/partials/Favorite"
import { Heart } from "../icons"

const SearchAutoSuggest = ({ history }) => {
    const { books } = useSelector((state) => state.books)
    const { favorited } = useSelector((state) => state.favorite)

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState([])

    // Teach Autosuggest how to calculate suggestions for any given input value.
    const getSuggestions = (value) => {
        const inputValue = utils.escapeRegexCharacters(value.trim().toLocaleLowerCase("tr"))
        const inputLength = inputValue.length
        //const regex = new RegExp('\\b' + inputValue, 'i')

        if (inputLength === 0) {
            return []
        }

        // return books.filter((book) => regex.test(getSuggestionValue(book)))
        let filtered_books = books.filter((book) => {
            let book_str = JSON.stringify(book.name).toLocaleLowerCase("tr")
            return book_str.includes(inputValue)
        })
        return favorited && favorited.length > 0
            ? filtered_books.sort((a, b) => {
                  return (
                      favorited.findIndex((id) => id === b.id) - favorited.findIndex((id) => id === a.id) ||
                      JSON.stringify(b.name)
                          .toLocaleLowerCase("tr")
                          .localeCompare(JSON.stringify(a.name).toLocaleLowerCase("tr"))
                  )
              })
            : filtered_books
    }

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = (suggestion) => suggestion.name

    // Use your imagination to render suggestions.
    const renderSuggestion = (suggestion, { query }) => {
        const suggestionText = getSuggestionValue(suggestion)
        const matches = match(suggestionText, query)
        const parts = parse(suggestionText, matches)

        const bookCover = suggestion.first_page
            ? process.env.REACT_APP_IMAGES_URL + "h-" + suggestion.first_page.image_url
            : process.env.PUBLIC_URL + "/assets/img/empty_cover.jpeg"

        return (
            <span
                className="suggestion-content"
                style={{
                    background: suggestion.color
                }}
            >
                <div
                    className={"suggestion_book_cover"}
                    style={{
                        backgroundImage: `url('${bookCover}')`
                    }}
                >
                    <img
                        src={bookCover}
                        alt="book_page"
                        style={{
                            visibility: "hidden",
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </div>
                <span className="name">
                    {parts.map((part, index) => {
                        const className = part.highlight ? "highlight" : null
                        return (
                            <span className={className} key={index}>
                                {part.text}
                            </span>
                        )
                    })}
                    - {suggestion.publisher.name}
                    <Badge variant="primary" className="ml-3">
                        {suggestion.book_category.name}
                    </Badge>
                    {favorited && favorited.length > 0 && favorited.includes(suggestion.id) && (
                        <Heart className="ml-3" fill="red" color="red" />
                    )}
                </span>
            </span>
        )
    }

    const onChange = (event, { newValue }) => {
        setValue(newValue)
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    // Autosuggest will call this function when a suggestion is selected.
    const onSuggestionSelected = (e, { suggestion }) => {
        history.push(`/books/${suggestion.id}`)
    }

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: t("searchForBooks"),
        value,
        autoFocus: true,
        onChange
    }

    return (
        <Autosuggest
            highlightFirstSuggestion={true}
            focusInputOnSuggestionClick={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    )
}

export default SearchAutoSuggest
