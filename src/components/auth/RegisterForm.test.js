import React from "react"
import { fireEvent, render as rtlRender, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { Auth } from "./Auth"
import RegisterForm from "./RegisterForm"
import { store } from "../../_helpers"
import { BrowserRouter } from "react-router-dom"

const render = (component) => rtlRender(<Provider store={store}>{component}</Provider>)

describe("Register", () => {
    test("renders the Apitwist logo", () => {
        render(<Auth />)
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument
    })

    test("renders the Auth component with title register", () => {
        render(
            <Auth title="register">
                <BrowserRouter>
                    <RegisterForm />
                </BrowserRouter>
            </Auth>
        )

        expect(screen.getByText("register")).toBeInTheDocument
    })

    test("validate form when all input elements is empty and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        )
        const nameInputEl = screen.getByPlaceholderText(/john/i)
        fireEvent.change(nameInputEl, { target: { value: "" } })
        expect(nameInputEl.value).toMatch("")

        const surnameInputEl = screen.getByPlaceholderText(/doe/i)
        fireEvent.change(surnameInputEl, { target: { value: "" } })
        expect(surnameInputEl.value).toMatch("")

        const usernameInputEl = screen.getByPlaceholderText(/username/i)
        fireEvent.change(usernameInputEl, { target: { value: "" } })
        expect(usernameInputEl.value).toMatch("")

        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "" } })
        expect(emailInputEl.value).toMatch("")

        const countryInputEl = screen.getByText(/Select country/i)
        fireEvent.change(countryInputEl, { target: { value: "" } })
        expect(countryInputEl.value).toMatch("")

        const phoneInputEl = screen.getByPlaceholderText(/555 123 45 67/i)
        fireEvent.change(phoneInputEl, { target: { value: "" } })
        expect(phoneInputEl.value).toMatch("")

        const institutionInputEl = screen.getByPlaceholderText(/Select institution/i)
        fireEvent.change(institutionInputEl, { target: { value: "" } })
        expect(institutionInputEl.value).toMatch("")

        const bookCodeInputEl = screen.getByPlaceholderText(/Book Code/i)
        fireEvent.change(bookCodeInputEl, { target: { value: "" } })
        expect(bookCodeInputEl.value).toMatch("")

        const passwordInputEl = screen.getByPlaceholderText("Password")
        fireEvent.change(passwordInputEl, { target: { value: "" } })
        expect(passwordInputEl.value).toMatch("")

        const confirmPasswordInputEl = screen.getByPlaceholderText("Confirm Password")
        fireEvent.change(confirmPasswordInputEl, { target: { value: "" } })
        expect(confirmPasswordInputEl.value).toMatch("")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter your Name!")).toBeInTheDocument
        expect(screen.getByText("Please enter your Surname!")).toBeInTheDocument
        expect(screen.getByText("Please enter your Username!")).toBeInTheDocument
        expect(screen.getByText("Please enter your Email!")).toBeInTheDocument
        expect(screen.getByText("Please select Country!")).toBeInTheDocument
        expect(screen.getByText("Please enter a valid Phone number!")).toBeInTheDocument
        expect(screen.getByText("Please select Institution!")).toBeInTheDocument
        expect(screen.getByText("Please enter book code!")).toBeInTheDocument
        expect(screen.getAllByText("Please enter your Password!")).toBeInTheDocument
    })

    test("validate form when all input elements value is 'test' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        )
        const nameInputEl = screen.getByPlaceholderText(/john/i)
        fireEvent.change(nameInputEl, { target: { value: "test" } })
        expect(nameInputEl.value).toMatch("test")

        const surnameInputEl = screen.getByPlaceholderText(/doe/i)
        fireEvent.change(surnameInputEl, { target: { value: "test" } })
        expect(surnameInputEl.value).toMatch("test")

        const usernameInputEl = screen.getByPlaceholderText(/username/i)
        fireEvent.change(usernameInputEl, { target: { value: "test" } })
        expect(usernameInputEl.value).toMatch("test")

        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test" } })
        expect(emailInputEl.value).toMatch("test")

        const countryInputEl = screen.getByText(/Select country/i)
        fireEvent.change(countryInputEl, { target: { value: "test" } })
        expect(countryInputEl.value).toMatch("test")

        const phoneInputEl = screen.getByPlaceholderText(/555 123 45 67/i)
        fireEvent.change(phoneInputEl, { target: { value: "test" } })
        expect(phoneInputEl.value).toMatch("test")

        const institutionInputEl = screen.getByPlaceholderText(/Select institution/i)
        fireEvent.change(institutionInputEl, { target: { value: "test" } })
        expect(institutionInputEl.value).toMatch("test")

        const bookCodeInputEl = screen.getByPlaceholderText(/Book Code/i)
        fireEvent.change(bookCodeInputEl, { target: { value: "test" } })
        expect(bookCodeInputEl.value).toMatch("test")

        const passwordInputEl = screen.getByPlaceholderText("Password")
        fireEvent.change(passwordInputEl, { target: { value: "test" } })
        expect(passwordInputEl.value).toMatch("test")

        const confirmPasswordInputEl = screen.getByPlaceholderText("Confirm Password")
        fireEvent.change(confirmPasswordInputEl, { target: { value: "test" } })
        expect(confirmPasswordInputEl.value).toMatch("test")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
        expect(screen.getByText("Please select Country!")).toBeInTheDocument
        expect(screen.getByText("Please enter a valid Phone number!")).toBeInTheDocument
        expect(screen.getByText("Please select Institution!")).toBeInTheDocument
        expect(screen.getByText("Your password must be between 6 and 24 characters!")).toBeInTheDocument
    })
    test("validate form when email input value is 'test@' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        )
        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test@" } })
        expect(emailInputEl.value).toMatch("test@")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })

    test("validate form when email input value is 'test@gmail' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        )
        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test@gmail" } })
        expect(emailInputEl.value).toMatch("test@gmail")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })

    test("validate form when password and phone value is changed  as'123456'and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        )

        const passwordInputEl = screen.getByPlaceholderText("Password")
        fireEvent.change(passwordInputEl, { target: { value: "123456" } })
        expect(passwordInputEl.value).toMatch("123456")

        const phoneInputEl = screen.getByPlaceholderText(/555 123 45 67/i)
        fireEvent.change(phoneInputEl, { target: { value: "123456" } })
        expect(phoneInputEl.value).toMatch("123456")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)
        expect(screen.getByText("Your password should contain at least 1 Uppercase, 1 Lowercase, 1 Numeric character."))
            .toBeInTheDocument
        expect(screen.getByText("You can use only 10 digits (555 123 45 67)")).toBeInTheDocument
    })

    test("validate form when confirm password value is not match with password and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        )

        const passwordInputEl = screen.getByPlaceholderText("Password")
        fireEvent.change(passwordInputEl, { target: { value: "Apitwist2023?" } })
        expect(passwordInputEl.value).toMatch("Apitwist2023?")

        const confirmPasswordInputEl = screen.getByPlaceholderText("Confirm Password")
        fireEvent.change(confirmPasswordInputEl, { target: { value: "Apitwist2023" } })
        expect(confirmPasswordInputEl.value).toMatch("Apitwist2023")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)
        expect(screen.getAllByText("Your passwords don't match!")).toBeInTheDocument
    })
})
