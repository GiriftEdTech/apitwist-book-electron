import React from "react"
import { fireEvent, render as rtlRender, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { Auth } from "./Auth"

import { store } from "../../_helpers"
import { BrowserRouter } from "react-router-dom"
import ForgotPasswordForm from "./ForgotPasswordForm"

const render = (component) => rtlRender(<Provider store={store}>{component}</Provider>)

describe("Register", () => {
    test("renders the Apitwist logo", () => {
        render(<Auth />)
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument
    })

    test("renders the Auth component with title forgotPassword", () => {
        render(
            <Auth title="forgotPassword">
                <BrowserRouter>
                    <ForgotPasswordForm />
                </BrowserRouter>
            </Auth>
        )

        expect(screen.getByText("forgotPassword")).toBeInTheDocument
    })

    test("validate form when all input elements is empty and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
            </BrowserRouter>
        )

        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "" } })
        expect(emailInputEl.value).toMatch("")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter your Email!")).toBeInTheDocument
    })

    test("validate form when email value is 'test' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
            </BrowserRouter>
        )

        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test" } })
        expect(emailInputEl.value).toMatch("test")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })

    test("validate form when email value is not valid 'test@' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
            </BrowserRouter>
        )

        const emailInputEl = screen.getByPlaceholderText(/Please enter your email./i)
        fireEvent.change(emailInputEl, { target: { value: "test@" } })
        expect(emailInputEl.value).toMatch("test@")

        const button = screen.getByRole("button", { type: /submit/i })
        fireEvent.click(button)

        expect(screen.getByText("Please enter a valid Email!")).toBeInTheDocument
    })
    test("validate form when email value is not valid 'test@gmail' and submit button is clicked", () => {
        render(
            <BrowserRouter>
                <ForgotPasswordForm />
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
