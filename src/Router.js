import React, { Component } from "react"
import { BrowserRouter as Router, Redirect, Route, Switch, matchPath } from "react-router-dom"
import { connect } from "react-redux"
import { history, utils } from "./_helpers/"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Register from "./pages/auth/Register"
import BookPage from "./pages/BookPage"
import NotFound from "./pages/errors/404-NotFound"
import TemporaryBook from "./pages/temporaryAnkuzef/TemporaryBook"
import Policy from "./pages/Policy"
import Profile from "./pages/Profile/Profile"
import ProfileEdit from "./pages/Profile/ProfileEdit"
import ProfileContainer from "./pages/Profile/ProfileContainer"
import MainLayout from "./pages/layouts/MainLayout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ContentCms from "./pages/ContentCms"
import TutoringAi from "./pages/TutoringAi"
import * as Sentry from "@sentry/react"

const routes = [
    { path: "/login" },
    { path: "/register" },
    { path: "/forgot" },
    { path: "/reset/:token" },
    { path: "/books/:id/pages/:pageOrder" },
    { path: "/profile/edit" },
    { path: "/profile" },
    { path: "/edumentor/:chat_id" },
    { path: "/edumentor" },
    { path: "/" }
]

!window.navigator.brave &&
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
            new Sentry.BrowserTracing({
                routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, routes, matchPath)
            }),
            new Sentry.Replay({
                maskAllText: false,
                blockAllMedia: false
            })
        ],
        tracePropagationTargets: [/^https:\/\/apitwist\.com\/api\/v1\/web/],
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        ignoreErrors: [
            /**
             * Thrown when firefox prevents an add-on from refrencing a DOM element that has been removed.
             * This can also be filtered by enabling the browser extension inbound filter
             */
            "TypeError: can't access dead object",
            /**
             * React internal error thrown when something outside react modifies the DOM
             * This is usually because of a browser extension or Chrome's built-in translate
             */
            "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
            "NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
        ],
        beforeSend: function (event, hint) {
            // filter out UnhandledRejection errors that have no information
            if (
                event !== undefined &&
                event.exception !== undefined &&
                event.exception.values !== undefined &&
                event.exception.values.length == 1
            ) {
                var e = event.exception.values[0]
                if (
                    e.type === "UnhandledRejection" &&
                    e.value === "Non-Error promise rejection captured with value: "
                ) {
                    return null
                }
            }
            if (hint.originalException === "Timeout") return null
            return event
        }
    })

class AppRouter extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.isDark) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }

    render() {
        // delete persist if still exists
        utils.deleteStore("persist:root")
        // remove user from local storage because it is now stored in redux
        utils.deleteStore("user")
        const book = this.props.book ?? utils.getStore("activeBook")
        const page = this.props.page ?? utils.getStore("activePage")

        const page_order =
            page && page.book_id && book && book.id && parseInt(page.book_id) === parseInt(book.id)
                ? page.page_order
                : 1

        return (
            <React.Fragment>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    theme={`${
                        utils.getStore("isDark") &&
                        utils.getStore("isDark") !== "undefined" &&
                        utils.getStore("isDark") !== null
                            ? "dark"
                            : "light"
                    }`}
                    pauseOnFocusLoss
                    pauseOnHover
                />
                <Router history={history}>
                    <Switch>
                        {/* Ankuzef */}
                        <TemporaryAnkuzefRoute
                            path="/books/9fcc5162-d93e-434a-91fd-22ee735e9f2c/pages/:pageOrder"
                            exact
                            bookId="22"
                            component={TemporaryBook}
                        />
                        {/* <Redirect
                            from="/books/9fcc5162-d93e-434a-91fd-22ee735e9f2c"
                            to={{
                                pathname: `/books/9fcc5162-d93e-434a-91fd-22ee735e9f2c/pages/${page_order}`
                            }}
                        /> */}
                        <TemporaryAnkuzefRoute
                            path="/books/2ffc03d9-b102-41b7-9e2f-59634374fa90/pages/:pageOrder"
                            exact
                            bookId="24"
                            component={TemporaryBook}
                        />
                        {/* <Redirect
                            from="/books/2ffc03d9-b102-41b7-9e2f-59634374fa90"
                            to={{
                                pathname: `/books/2ffc03d9-b102-41b7-9e2f-59634374fa90/pages/${page_order}`
                            }}
                        /> */}

                        {/* Auth */}
                        <LoginRoute path="/login" exact component={Login} />
                        <LoginRoute path="/register" exact component={Register} />
                        <LoginRoute path="/forgot" exact component={ForgotPassword} />
                        <LoginRoute path="/reset/:token" exact component={ResetPassword} />

                        {/* Books */}
                        <AuthenticatedRoute
                            exact
                            path="/books/:id/pages/:pageOrder/content/:contentId/h5p/:h5pId"
                            component={ContentCms}
                        />
                        <AuthenticatedRoute path="/books/:id/pages/:pageOrder" component={BookPage} />

                        <Redirect
                            from="/books/:id"
                            to={{
                                pathname: `/books/:id/pages/${page_order}`
                            }}
                        />
                        <Redirect from="/books/" to="/" />

                        {/* Home, Profile */}
                        <Route exact path={["/", "/profile", "/profile/edit", "/edumentor", "/edumentor/:chat_id"]}>
                            <MainLayout>
                                <AuthenticatedRoute exact path="/" component={Home} />
                                <Route path="/profile">
                                    <ProfileContainer>
                                        <AuthenticatedRoute exact path="/profile/edit" component={ProfileEdit} />
                                        <AuthenticatedRoute exact path="/profile" component={Profile} />
                                    </ProfileContainer>
                                </Route>
                                <AuthenticatedRoute
                                    exact
                                    path={["/edumentor", "/edumentor/:chat_id"]}
                                    component={TutoringAi}
                                />
                            </MainLayout>
                        </Route>

                        {/* Policy */}
                        <Route path="/policies" exact component={Policy} />

                        {/* Errors */}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }
}

function LoginRoute({ component: Component, ...rest }) {
    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    utils.getPasswordToken() &&
                    utils.getPasswordToken() !== "undefined" &&
                    utils.getPasswordToken() !== null ? (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        </>
    )
}

function AuthenticatedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                utils.getPasswordToken() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

function TemporaryAnkuzefRoute({ component: Component, bookId, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                (props) => (
                    // // document.referrer.includes("ankara.edu.tr") ? (
                    // true ? (
                    //     <Component bookId={bookId} {...props} />
                    // ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
                // )
            }
        />
    )
}

function mapStateToProps(state) {
    const { book } = state.activeBook
    const { page } = state.activePage
    const users = state.users
    const { isDark } = state.theme
    return { page, book, users, isDark }
}

export default connect(mapStateToProps)(AppRouter)
