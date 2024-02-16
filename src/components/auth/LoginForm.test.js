import React from "react"
import { fireEvent, render as rtlRender, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { Auth } from "./Auth"
import LoginForm from "./LoginForm"
import { store } from "../../_helpers"
import { BrowserRouter } from "react-router-dom"

const render = (component) => rtlRender(<Provider store={store}>{component}</Provider>)

describe("Login", () => {
    test("renders the Apitwist logo", () => {
        render(<Auth />)
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument
    })

    test('renders the Auth component with title "login"', () => {
        render(<Auth title="login" />)
        expect(screen.getByText(/login/i)).toBeInTheDocument
    })

    test("renders email and password input in LoginForm", () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )
        expect(screen.getByPlaceholderText(/Please enter your email./i)).toBeInTheDocument
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument
    })

    test("validate when email and password value is empty and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )
        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        const passwordInputEl = screen.getByPlaceholderText(/password/i)
        fireEvent.change(passwordInputEl, { target: { value: "" } })
        fireEvent.change(emailInputEl, { target: { value: "" } })
        expect(emailInputEl.value).toMatch("")
        expect(passwordInputEl.value).toMatch("")
        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)
        expect(screen.getByText("Please enter your Password!")).toBeInTheDocument
        expect(screen.getByText("Please enter your Email!")).toBeInTheDocument
    })

    test("validate form when email is not valid 'test' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )
        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test" } })
        expect(emailInputEl.value).toMatch("test")
        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)
        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })

    test("validate form when email is not valid 'test@' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )
        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test@" } })
        expect(emailInputEl.value).toMatch("test@")
        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)
        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })

    test("validate form when email is not valid 'test@gmail' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        )
        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test@gmail" } })
        expect(emailInputEl.value).toMatch("test@gmail")
        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)
        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })
})
