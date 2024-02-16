import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import Avatar from "./Avatar"
import { LogOut, Menu, Moon, Search, Sun, User, X } from "../icons"
import { utils } from "../../_helpers"
import { userActions } from "../../_actions"
import { getTranslatedText as t } from "../../_locale"
import SearchAutoSuggest from "./SearchAutoSuggest"
import useClickOutsideDetector from "../../_hooks/useClickOutsideDetector"
import AddBookModal from "./AddBookModal"
import useViewport from "../../_hooks/useViewport"
import { themeActions } from "../../_actions/theme.actions"
import Language from "./Language"
import Logo from "./Logo"

const Header = () => {
    const dispatch = useDispatch()
    let history = useHistory()
    const { width } = useViewport()
    const ref = useRef()
    const { user } = useSelector((state) => state.users)
    const { isDark } = useSelector((state) => state.theme)

    const [isHamburgerOpen, setHamburgerOpen] = useState(false)
    const [isSearchOpen, setSearchOpen] = useState(false)
    const [isLanguageOpen, setLanguageOpen] = useState(false)
    const [isProfileOpen, setProfileOpen] = useState(false)
    const [isAddBookOpen, setAddBookOpen] = useState(false)

    const setModalsClose = () => {
        setSearchOpen(false)
        setLanguageOpen(false)
        setProfileOpen(false)
    }

    useClickOutsideDetector(ref, setModalsClose)

    const toggleHamburger = () => {
        setHamburgerOpen(!isHamburgerOpen)
        setSearchOpen(false)
        setLanguageOpen(false)
        setProfileOpen(false)
        setAddBookOpen(false)
    }

    const toggleLanguage = () => {
        setLanguageOpen(!isLanguageOpen)
        setProfileOpen(false)
        setSearchOpen(false)
        setAddBookOpen(false)
    }

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen)
        setProfileOpen(false)
        setLanguageOpen(false)
        setAddBookOpen(false)
    }

    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen)
        setLanguageOpen(false)
        setSearchOpen(false)
        setAddBookOpen(false)
    }

    const toggleAddBook = () => {
        setAddBookOpen(!isAddBookOpen)
        setProfileOpen(false)
        setLanguageOpen(false)
        setSearchOpen(false)
        setAddBookOpen(false)
    }

    const onHide = useCallback(() => {
        setAddBookOpen(false)
    }, [])

    const hideSelf = useCallback(() => {
        setAddBookOpen(false)
    }, [])

    return (
        <header className="align-items-center d-flex" ref={ref}>
            <div className="logo d-none d-md-flex">
                <Logo />
            </div>

            {isHamburgerOpen ? (
                <X
                    className="d-block d-lg-none ml-2 x_svg__feather cursor-pointer"
                    fill="var(--c-font-primary)"
                    width="1.5em"
                    height="1.5em"
                    onClick={toggleHamburger}
                    style={{ zIndex: "12" }}
                />
            ) : (
                <Menu
                    className="d-block d-lg-none ml-2 menu_svg__feather cursor-pointer  "
                    width="1.5em"
                    height="1.5em"
                    onClick={toggleHamburger}
                    style={{ zIndex: "13" }}
                />
            )}

            <ul className={`nav-items d-none d-lg-flex ${isHamburgerOpen ? "opened" : ""}`}>
                <li className="home-link">
                    <NavLink to="/">{t("home")}</NavLink>
                </li>

                <li>
                    <a className="studio_link text-nowrap" href="https://lms.apitwist.com/" target="_blank">
                        {t("online_activity")}
                    </a>
                </li>

                {user && Object.keys(user).length > 0 && utils.userCanSubscribeBook(user) ? (
                    <li className="create_button" onClick={() => setAddBookOpen(!isAddBookOpen)}>
                        {t("addBook")}
                    </li>
                ) : null}

                <AddBookModal show={isAddBookOpen} onHide={onHide} hideSelf={hideSelf} />
            </ul>
            {width < 820 ? (
                <div className="right d-flex align-items-center ml-auto">
                    <div className="p-2 hover-bg rounded">
                        {" "}
                        {isDark ? (
                            <Sun
                                color="var(--c-font-dark)"
                                width="1.5em"
                                height="1.5em"
                                onClick={() => dispatch(themeActions.toggleTheme())}
                            />
                        ) : (
                            <Moon width="1.5em" height="1.5em" onClick={() => dispatch(themeActions.toggleTheme())} />
                        )}
                    </div>

                    <Language
                        width={width}
                        toggleLanguage={toggleLanguage}
                        isLanguageOpen={isLanguageOpen}
                        setLanguageFalse={() => setLanguageOpen(false)}
                    />
                    <div className="p-2 hover-bg rounded">
                        <Search width="1.5em" height="1.5em" onClick={toggleSearch} style={{ cursor: "pointer" }} />
                    </div>
                    {isSearchOpen && (
                        <div className="search">
                            <Search width="1.5em" height="1.5em" onClick={toggleSearch} />
                            <SearchAutoSuggest history={history} />

                            {/*<input*/}
                            {/*  className="search_input"*/}
                            {/*  type="text"*/}
                            {/*  placeholder={t('searchForBooks')}*/}
                            {/*  autoFocus*/}
                            {/*/>*/}

                            <X className="x-button" width="1.5em" height="1.5em" onClick={toggleSearch} />
                        </div>
                    )}

                    <div className="avatar" onClick={toggleProfile}>
                        <Avatar />
                        {isProfileOpen && (
                            <ul className="profile_menu">
                                <NavLink to="/profile">
                                    <li>
                                        <User className="mr-2" /> {t("profile")}
                                    </li>
                                </NavLink>
                                <li
                                    onClick={() => {
                                        dispatch(userActions.logout())
                                    }}
                                >
                                    <LogOut className="mr-2" /> {t("logout")}
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            ) : (
                <div className="right d-flex align-items-center ml-auto">
                    <div className="p-2 hover-bg rounded">
                        {isDark ? (
                            <Sun
                                width="1.5em"
                                height="1.5em"
                                onClick={() => dispatch(themeActions.toggleTheme())}
                                style={{ cursor: "pointer" }}
                            />
                        ) : (
                            <Moon
                                color="var(--c-font-primary)"
                                width="1.5em"
                                height="1.5em"
                                onClick={() => dispatch(themeActions.toggleTheme())}
                                style={{ cursor: "pointer" }}
                            />
                        )}
                    </div>
                    <Language width={width} setLanguageFalse={() => setLanguageOpen(false)} />
                    <div className="p-2 hover-bg rounded">
                        <Search width="1.5em" height="1.5em" onClick={toggleSearch} style={{ cursor: "pointer" }} />
                    </div>
                    {isSearchOpen && (
                        <div className="search">
                            <Search width="1.5em" height="1.5em" onClick={toggleSearch} />
                            <SearchAutoSuggest history={history} />

                            {/*<input*/}
                            {/*  className="search_input"*/}
                            {/*  type="text"*/}
                            {/*  placeholder={t('searchForBooks')}*/}
                            {/*  autoFocus*/}
                            {/*/>*/}

                            <X className="x-button" width="1.5em" height="1.5em" onClick={toggleSearch} />
                        </div>
                    )}

                    <div className="avatar">
                        <Avatar />
                        <ul className="profile_menu">
                            <NavLink to="/profile">
                                <li>
                                    <User className="mr-2" /> {t("profile")}
                                </li>
                            </NavLink>
                            <li
                                onClick={() => {
                                    dispatch(userActions.logout())
                                }}
                            >
                                <LogOut className="mr-2" /> {t("logout")}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    )
}

export default React.memo(Header)
