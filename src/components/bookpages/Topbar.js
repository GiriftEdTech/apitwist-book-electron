import React, { forwardRef, useState } from "react"
import { Form, Navbar, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    Bookmark,
    BookOpen,
    ChevronDown,
    ChevronRight,
    Edit,
    Edit3,
    FileText,
    Home,
    Info,
    Layers,
    Menu,
    MessageCircle,
    Moon,
    Sidebar,
    Sun,
    LanguageSvg
} from "../icons"
import { Link } from "react-router-dom"
import { languageList, getTranslatedText as t } from "../../_locale"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Accordion from "@radix-ui/react-accordion"
import TooltipContainer from "./partials/TooltipContainer"
import useViewport from "../../_hooks/useViewport"
import { themeActions } from "../../_actions/theme.actions"
import { utils } from "../../_helpers"
import { contentActions } from "../../_actions/content.actions"
import { configActions } from "../../_actions"
import Switcher from "./partials/Switcher"
import Language from "../partials/Language"

const Topbar = forwardRef((props, ref) => {
    const { sidebarIsOpen, toggleSidebar, bookId, openTour, pageOrder, setFeedbackModalOpen } = props
    const { topBarRef } = ref
    const { isEditModeOpen } = useSelector((state) => state.config)
    const { width } = useViewport()
    const dispatch = useDispatch()
    const { book } = useSelector((state) => state.activeBook)
    const { page } = useSelector((state) => state.activePage)
    const bookmarks = useSelector((state) => state.bookmarks)
    const { isDark } = useSelector((state) => state.theme)
    const { user } = useSelector((state) => state.users)
    const pageDetails = useSelector((state) => state.pageDetails)
    const keys = Object.keys(localStorage).filter((key) => key.includes(`_${bookId}_`))
    const annotatedPages = keys.map((annotatedPage) => annotatedPage.split("_"))
    const sortedAnnotatedPages = annotatedPages.map((page) => page[2]).sort((a, b) => a - b)
    const annotatedPageIdList = sortedAnnotatedPages.filter(
        (pageId) => book && bookId === book.id && book.book_pages.some((page) => page.id === parseInt(pageId))
    )
    const [isLanguageOpen, setLanguageOpen] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [bookmarkIsOpen, setBookmarkIsOpen] = useState(false)
    const [contentMenuIsOpen, setContentMenuIsOpen] = useState(false)
    const [tocIsOpen, setTocIsOpen] = useState(false)
    const [annotationsIsOpen, setAnnotationsIsOpen] = useState(false)
    const [isQuickNoteDropdownOpen, setQuickNoteDropdownOpen] = useState()
    const filteredCreatorLength =
        pageDetails.contentFilter && Object.values(pageDetails.contentFilter).filter((item) => item === false).length

    const uniqueContentCreators = []

    pageDetails.contents &&
        pageDetails.contents.length > 0 &&
        pageDetails.contents.filter((content) => {
            const isDuplicate = uniqueContentCreators.includes(content.creator)
            if (!isDuplicate) {
                uniqueContentCreators.push(content.creator)
            }
        })

    const bookmarkedPageIds =
        bookmarks &&
        !bookmarks.loading &&
        bookmarks.bookmarked !== undefined &&
        Object.keys(bookmarks.bookmarked).length > 0 &&
        bookmarks.bookmarked[bookId] !== undefined &&
        bookmarks.bookmarked[bookId].map((page) => page.book_page_id)
    const bookmarkedPages =
        book &&
        !book.loading &&
        book.book_pages.filter(
            (page) =>
                bookmarkedPageIds !== false &&
                bookmarkedPageIds.length > 0 &&
                bookmarkedPageIds.some((bookmarkedPageId) => page.id === bookmarkedPageId)
        )

    const toc = book && !book.loading && book.toc && JSON.parse(book.toc)
    const book_pages = book && !book.loading && book.toc && book.book_pages

    const quickNotePages =
        book &&
        !book.loading &&
        book.quick_note_pages?.length > 0 &&
        book.book_pages.filter((page) => book.quick_note_pages.some((bookPage) => bookPage.id === page.id))

    const toggleMenu = () => {
        setMenuIsOpen(false)
    }

    const acordionItemWidth = 230
    const defaultSpace = 10

    const addChildrenWeb = (children, isFirstRendering) => {
        return (
            <DropdownMenu.Content
                align="start"
                className={`content ${isFirstRendering ? "ml-2 mt-3" : "subContentLeft subContentTop "}  `}
            >
                {children.map((child) => (
                    <DropdownMenu.Root key={child.page_id}>
                        <Link
                            to={`/books/${bookId}/pages/${
                                book_pages.find((page) => page.id === child.page_id).page_order
                            }`}
                            className="dropDownItem"
                            key={child.page_id}
                            onClick={() => {
                                setTocIsOpen(false)
                            }}
                        >
                            {child.children.length > 0 ? (
                                <DropdownMenu.TriggerItem
                                    className={`item cursor-pointer d-flex justify-content-between ${
                                        page && page.id === child.page_id && "item-active"
                                    }`}
                                >
                                    <span>{child.title}</span>
                                    <span className="d-flex">
                                        <span className="item-right ">
                                            {book_pages.find((page) => page.id === child.page_id).page_order}
                                        </span>
                                        {child.children.length > 0 && (
                                            <ChevronRight
                                                color={`var(--c-bg-primary)`}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        )}
                                    </span>
                                </DropdownMenu.TriggerItem>
                            ) : (
                                <DropdownMenu.Item
                                    className={`item cursor-pointer d-flex justify-content-between ${
                                        page && page.id === child.page_id && "item-active"
                                    }`}
                                >
                                    <span>{child.title}</span>
                                    <span className="d-flex">
                                        <span className="item-right ">
                                            {book_pages.find((page) => page.id === child.page_id).page_order}
                                        </span>
                                        {child.children.length > 0 && (
                                            <ChevronRight
                                                color={`var(--c-bg-primary)`}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        )}
                                    </span>
                                </DropdownMenu.Item>
                            )}
                        </Link>
                        {child.children.length > 0 && addChildrenWeb(child.children)}
                    </DropdownMenu.Root>
                ))}
            </DropdownMenu.Content>
        )
    }

    const addChildrenMobile = (children, space) => {
        let currentSpace = space ? space : defaultSpace

        return (
            <Accordion.Content>
                {children.map((child) => (
                    <Accordion.Root type="multiple" key={child.page_id}>
                        <Accordion.Item value={`item-${child.page_id}`}>
                            {child.children.length > 0 ? (
                                <Accordion.Trigger
                                    style={{
                                        marginLeft: currentSpace
                                    }}
                                    className={`item  ${
                                        child.children.length > 0 ? "acordionSubHeader" : "acordionItem"
                                    }
                                 ${page && page.id === child.page_id && "item-active"}`}
                                >
                                    <Link
                                        to={`/books/${bookId}/pages/${
                                            book_pages.find((page) => page.id === child.page_id).page_order
                                        }`}
                                        className="dropDownItem"
                                        onClick={(e) => toggleMenu(e)}
                                    >
                                        <span>{child.title}</span>
                                    </Link>
                                    <span>
                                        <span className="item-right">
                                            {book_pages.find((page) => page.id === child.page_id).page_order}
                                            {child.children.length > 0 && (
                                                <ChevronDown
                                                    color={"var(--c-bg-primary)"}
                                                    width={"1.5em"}
                                                    height={"1.5em"}
                                                />
                                            )}
                                        </span>
                                    </span>
                                </Accordion.Trigger>
                            ) : (
                                <Accordion.Item
                                    style={{
                                        marginLeft: currentSpace
                                    }}
                                    className={`item ${child.children.length > 0 ? "acordionSubHeader" : "acordionItem"}
                                ${page && page.id === child.page_id && "item-active"} `}
                                >
                                    <Link
                                        to={`/books/${bookId}/pages/${
                                            book_pages.find((page) => page.id === child.page_id).page_order
                                        }`}
                                        className="dropDownItem"
                                        onClick={(e) => toggleMenu(e)}
                                    >
                                        <span>{child.title}</span>
                                    </Link>
                                    <span>
                                        <span className="item-right">
                                            {book_pages.find((page) => page.id === child.page_id).page_order}
                                            {child.children.length > 0 && (
                                                <ChevronDown
                                                    color={"var(--c-bg-primary)"}
                                                    width={"1.5em"}
                                                    height={"1.5em"}
                                                />
                                            )}
                                        </span>
                                    </span>
                                </Accordion.Item>
                            )}
                            {child.children.length > 0 &&
                                addChildrenMobile(child.children, currentSpace + defaultSpace)}
                        </Accordion.Item>
                    </Accordion.Root>
                ))}
            </Accordion.Content>
        )
    }

    return (
        <Navbar
            ref={topBarRef}
            className="shadow-sm px-3 pm bg-white rounded justify-content-between topbar-header"
            style={{ zIndex: 2 }}
        >
            <div className="d-flex">
                {sidebarIsOpen ? (
                    ""
                ) : (
                    <TooltipContainer placement={"bottom"} name={sidebarIsOpen ? "" : t("openSidebar")}>
                        <div className="topbar-button mr-1 cursor-pointer" onClick={toggleSidebar}>
                            <Sidebar width="1.5em" height="1.5em" />
                        </div>
                    </TooltipContainer>
                )}
                {width > 820 ? (
                    <>
                        {/* TOC */}
                        <div className="d-flex top-menu" data-tut="toc_list">
                            <DropdownMenu.Root
                                open={tocIsOpen}
                                onOpenChange={() => setTocIsOpen(!tocIsOpen)}
                                className="root"
                            >
                                <DropdownMenu.Trigger className="trigger">
                                    <TooltipContainer placement={"bottom"} name={t("tableOfContents")}>
                                        <div className={`topbar-button ml-1 ${tocIsOpen && "bookmark-active"}`}>
                                            <BookOpen color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                                        </div>
                                    </TooltipContainer>
                                </DropdownMenu.Trigger>
                                {book && !book.loading && book.toc && toc ? (
                                    addChildrenWeb(toc, true)
                                ) : (
                                    <DropdownMenu.Content align="start" className={`content ml-2 mt-3`}>
                                        <DropdownMenu.Item className="item cursor-pointer">
                                            {t("noTableOfContents")}
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                )}
                            </DropdownMenu.Root>
                        </div>
                        {/* BOOKMARK */}
                        <div className="d-flex top-menu" data-tut="bookmark_list">
                            <DropdownMenu.Root
                                open={bookmarkIsOpen}
                                onOpenChange={() => setBookmarkIsOpen(!bookmarkIsOpen)}
                                className="root"
                            >
                                <DropdownMenu.Trigger className="trigger">
                                    <TooltipContainer placement={"bottom"} name={t("bookmarks")}>
                                        <div className={`topbar-button ml-1 ${bookmarkIsOpen && "bookmark-active"}`}>
                                            <Bookmark color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                                        </div>
                                    </TooltipContainer>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content align="start" className="content ml-2 mt-3">
                                    {bookmarkedPages && bookmarkedPages.length > 0 ? (
                                        bookmarkedPages.map((bookmarkedPage) => (
                                            <Link
                                                to={`/books/${bookId}/pages/${bookmarkedPage.page_order}`}
                                                className="dropDownItem"
                                                key={bookmarkedPage.page_order}
                                            >
                                                <DropdownMenu.Item
                                                    className={`item cursor-pointer d-flex justify-content-between   ${
                                                        page &&
                                                        page.page_order === bookmarkedPage.page_order &&
                                                        "item-active"
                                                    }`}
                                                >
                                                    <span>
                                                        <span>{t("page")}</span>
                                                        <span className="ml-2">{bookmarkedPage.page_order}</span>
                                                    </span>
                                                    <span className="item-right">{bookmarkedPage.page_order}</span>
                                                </DropdownMenu.Item>
                                            </Link>
                                        ))
                                    ) : (
                                        <DropdownMenu.Item className="item cursor-pointer">
                                            {t("noBookmark")}
                                        </DropdownMenu.Item>
                                    )}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                        {/* CONTENT SWITCH */}
                        <div className="d-flex top-menu" data-tut="content_list">
                            {Object.keys(user).length > 0 && utils.userIsNotStudent(user) && (
                                <TooltipContainer placement={"bottom"} name={t("switch")}>
                                    <DropdownMenu.Root
                                        open={contentMenuIsOpen}
                                        onOpenChange={() =>
                                            setTimeout(() => {
                                                setContentMenuIsOpen(!contentMenuIsOpen)
                                            }, 500)
                                        }
                                        className="root"
                                    >
                                        <DropdownMenu.Trigger className="trigger">
                                            <TooltipContainer placement={"bottom"} name={t("contents")}>
                                                <div
                                                    className={`topbar-button ml-1 
                                                }`}
                                                >
                                                    <span className="position-relative">
                                                        <Layers
                                                            color="var(--c-font-primary)"
                                                            width="1.5em"
                                                            height="1.5em"
                                                        />
                                                        {filteredCreatorLength > 0 && (
                                                            <span className="badge rounded-circle content-badge">
                                                                {filteredCreatorLength}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </TooltipContainer>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content align="start" className="content ml-2 mt-3">
                                            {uniqueContentCreators && uniqueContentCreators.length > 0 ? (
                                                uniqueContentCreators.map((creator, i) => (
                                                    <DropdownMenu.Item
                                                        className={`item content-item d-flex justify-content-between   
                                                    }`}
                                                        key={i}
                                                        onSelect={(e) => {
                                                            e.preventDefault()
                                                        }}
                                                    >
                                                        <Switcher
                                                            label={t(
                                                                creator === "publisher"
                                                                    ? "publisherContents"
                                                                    : creator === "inst"
                                                                    ? "instContents"
                                                                    : creator === "self" && "selfContents"
                                                            )}
                                                            checked={
                                                                pageDetails.contentFilter &&
                                                                pageDetails.contentFilter[creator]
                                                            }
                                                            handleSwitch={() =>
                                                                dispatch(contentActions.handleContentFilter(creator))
                                                            }
                                                            creator={creator}
                                                        />
                                                    </DropdownMenu.Item>
                                                ))
                                            ) : (
                                                <DropdownMenu.Item className="item cursor-pointer">
                                                    {t("noContent")}
                                                </DropdownMenu.Item>
                                            )}
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Root>
                                </TooltipContainer>
                            )}
                        </div>
                        {/* ANNOTATIONS */}
                        <div className="d-flex top-menu" data-tut="annotations_list">
                            <DropdownMenu.Root
                                open={annotationsIsOpen}
                                onOpenChange={() => setAnnotationsIsOpen(!annotationsIsOpen)}
                                className="root"
                            >
                                <DropdownMenu.Trigger className="trigger">
                                    <TooltipContainer placement={"bottom"} name={t("annotations")}>
                                        <div className={`topbar-button ml-1 ${annotationsIsOpen && "bookmark-active"}`}>
                                            <Edit3 color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                                        </div>
                                    </TooltipContainer>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content align="start" className="content ml-2 mt-3">
                                    {annotatedPageIdList && annotatedPageIdList.length > 0 ? (
                                        annotatedPageIdList.map((pageId) => (
                                            <Link
                                                to={`/books/${bookId}/pages/${
                                                    book &&
                                                    book.id === bookId &&
                                                    book.book_pages.find((page) => page.id === parseInt(pageId))
                                                        .page_order
                                                }`}
                                                className="dropDownItem"
                                                key={pageId}
                                            >
                                                <DropdownMenu.Item
                                                    className={`item cursor-pointer d-flex justify-content-between   ${
                                                        book &&
                                                        book.id === bookId &&
                                                        book.book_pages.find((page) => page.id === parseInt(pageId))
                                                            .page_order === pageOrder &&
                                                        "item-active"
                                                    }`}
                                                >
                                                    <span>
                                                        <span>{t("page")}</span>
                                                        <span className="ml-2">
                                                            {book &&
                                                                book.id === bookId &&
                                                                book.book_pages.find(
                                                                    (page) => page.id === parseInt(pageId)
                                                                ).page_order}
                                                        </span>
                                                    </span>
                                                    <span className="item-right">
                                                        {book &&
                                                            book.id === bookId &&
                                                            book.book_pages.find((page) => page.id === parseInt(pageId))
                                                                .page_order}
                                                    </span>
                                                </DropdownMenu.Item>
                                            </Link>
                                        ))
                                    ) : (
                                        <DropdownMenu.Item className="item cursor-pointer">
                                            {t("noAnnotation")}
                                        </DropdownMenu.Item>
                                    )}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                        <div className="d-flex top-menu" data-tut="quick_notes">
                            <DropdownMenu.Root
                                open={isQuickNoteDropdownOpen}
                                onOpenChange={() => setQuickNoteDropdownOpen(!isQuickNoteDropdownOpen)}
                                className="root"
                            >
                                <DropdownMenu.Trigger className="trigger">
                                    <TooltipContainer placement={"bottom"} name={t("quick_notes")}>
                                        <div
                                            className={`topbar-button ml-1 ${
                                                isQuickNoteDropdownOpen && "bookmark-active"
                                            }`}
                                        >
                                            <FileText color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                                        </div>
                                    </TooltipContainer>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content align="start" className="content ml-2 mt-3">
                                    {quickNotePages && quickNotePages.length > 0 ? (
                                        quickNotePages.map((quickNotePage) => (
                                            <Link
                                                to={`/books/${bookId}/pages/${
                                                    book &&
                                                    book.id === bookId &&
                                                    book.book_pages.find(
                                                        (page) => page.id === parseInt(quickNotePage.id)
                                                    ).page_order
                                                }`}
                                                className="dropDownItem"
                                                key={quickNotePage.id}
                                            >
                                                <DropdownMenu.Item
                                                    className={`item cursor-pointer d-flex justify-content-between   ${
                                                        book &&
                                                        book.id === bookId &&
                                                        book.book_pages.find(
                                                            (page) => page.id === parseInt(quickNotePage.id)
                                                        ).page_order === pageOrder &&
                                                        "item-active"
                                                    }`}
                                                >
                                                    <span>
                                                        <span>{t("page")}</span>
                                                        <span className="ml-2">
                                                            {book &&
                                                                book.id === bookId &&
                                                                book.book_pages.find(
                                                                    (page) => page.id === parseInt(quickNotePage.id)
                                                                ).page_order}
                                                        </span>
                                                    </span>
                                                    <span className="item-right">
                                                        {book &&
                                                            book.id === bookId &&
                                                            book.book_pages.find(
                                                                (page) => page.id === parseInt(quickNotePage.id)
                                                            ).page_order}
                                                    </span>
                                                </DropdownMenu.Item>
                                            </Link>
                                        ))
                                    ) : (
                                        <DropdownMenu.Item className="item cursor-pointer">
                                            {t("noQuickNotes")}
                                        </DropdownMenu.Item>
                                    )}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                    </>
                ) : (
                    /*********** ACORDION ************/
                    <DropdownMenu.Root
                        open={menuIsOpen}
                        onOpenChange={() => setMenuIsOpen(!menuIsOpen)}
                        className="root"
                    >
                        <DropdownMenu.Trigger className="trigger" data-tut="menu">
                            <div className={`topbar-button ${menuIsOpen && "bookmark-active"}`}>
                                <Menu color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                            </div>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content align="start" className="content acordionContent ml-1 mt-3">
                            {/* TABLE OF CONTENTS */}
                            <Accordion.Root type="multiple">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className="item acordionHeader">
                                        {t("tableOfContents")}
                                        <div className="d-flex ml-4">
                                            <BookOpen width={"1.5em"} height={"1.5em"} className="mr-1 " />
                                            <ChevronDown
                                                color={"var(--c-bg-primary)"}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        </div>
                                    </Accordion.Trigger>

                                    {book && !book.loading && book.toc && toc ? (
                                        addChildrenMobile(toc)
                                    ) : (
                                        <Accordion.Content>
                                            <DropdownMenu.Item
                                                className="item cursor-pointer ml-3"
                                                style={{ width: "unset" }}
                                            >
                                                {t("noTableOfContents")}
                                            </DropdownMenu.Item>
                                        </Accordion.Content>
                                    )}
                                </Accordion.Item>
                            </Accordion.Root>
                            {/* BOOKMARK */}
                            <Accordion.Root type="multiple">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className="item acordionHeader">
                                        {t("bookmarks")}
                                        <div className="d-flex ml-4">
                                            <Bookmark width={"1.5em"} height={"1.5em"} className="mr-1" />
                                            <ChevronDown
                                                color={"var(--c-bg-primary)"}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        </div>
                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                        {bookmarkedPages && bookmarkedPages.length > 0 ? (
                                            bookmarkedPages.map((bookmarkedPage) => (
                                                <Accordion.Root key={bookmarkedPage.page_order} type="multiple">
                                                    <Accordion.Item value={`item-${bookmarkedPage.page_order}`}>
                                                        <Link
                                                            to={`/books/${bookId}/pages/${bookmarkedPage.page_order}`}
                                                            className="dropDownItem"
                                                            onClick={(e) => toggleMenu(e)}
                                                        >
                                                            <Accordion.Trigger
                                                                className={`item subItem ${
                                                                    page &&
                                                                    page.page_order === bookmarkedPage.page_order &&
                                                                    "item-active"
                                                                }`}
                                                            >
                                                                <span>
                                                                    <span>{t("page")}</span>
                                                                    <span className="ml-2">
                                                                        {bookmarkedPage.page_order}
                                                                    </span>
                                                                </span>
                                                                <span className="mr-2 item-right">
                                                                    {bookmarkedPage.page_order}
                                                                </span>
                                                            </Accordion.Trigger>
                                                        </Link>
                                                    </Accordion.Item>
                                                </Accordion.Root>
                                            ))
                                        ) : (
                                            <DropdownMenu.Item
                                                className="item cursor-pointer ml-3"
                                                style={{ width: "unset" }}
                                            >
                                                {t("noBookmark")}
                                            </DropdownMenu.Item>
                                        )}
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                            {/* CONTENT SWITCH */}
                            {Object.keys(user).length > 0 && utils.userIsNotStudent(user) && (
                                <Accordion.Root type="multiple">
                                    <Accordion.Item value="item-1">
                                        <Accordion.Trigger className="item acordionHeader">
                                            <div>{t("contents")}</div>
                                            <div className="d-flex ml-4">
                                                {filteredCreatorLength > 0 && (
                                                    <span className="  rounded-circle mobile-content-badge">
                                                        {filteredCreatorLength}
                                                    </span>
                                                )}
                                                <Layers width={"1.5em"} height={"1.5em"} className="mr-1" />
                                                <ChevronDown
                                                    color={"var(--c-bg-primary)"}
                                                    width={"1.5em"}
                                                    height={"1.5em"}
                                                />
                                            </div>
                                        </Accordion.Trigger>

                                        <Accordion.Content>
                                            {uniqueContentCreators && uniqueContentCreators.length > 0 ? (
                                                uniqueContentCreators.map((creator, i) => (
                                                    <Accordion.Root key={i} type="multiple">
                                                        <Accordion.Item value={`${creator}`}>
                                                            <Accordion.Trigger
                                                                className={`item subItem position-relative}`}
                                                            >
                                                                <Switcher
                                                                    label={t(
                                                                        creator === "publisher"
                                                                            ? "publisherContents"
                                                                            : creator === "inst"
                                                                            ? "instContents"
                                                                            : creator === "self" && "selfContents"
                                                                    )}
                                                                    checked={
                                                                        pageDetails.contentFilter &&
                                                                        pageDetails.contentFilter[creator]
                                                                    }
                                                                    handleSwitch={() =>
                                                                        dispatch(
                                                                            contentActions.handleContentFilter(creator)
                                                                        )
                                                                    }
                                                                    creator={creator}
                                                                />
                                                            </Accordion.Trigger>
                                                        </Accordion.Item>
                                                    </Accordion.Root>
                                                ))
                                            ) : (
                                                <DropdownMenu.Item
                                                    className="item cursor-pointer ml-3 width-unset"
                                                    style={{ width: "unset" }}
                                                >
                                                    {t("noContent")}
                                                </DropdownMenu.Item>
                                            )}
                                        </Accordion.Content>
                                    </Accordion.Item>
                                </Accordion.Root>
                            )}
                            {/* ANNOTATION */}
                            <Accordion.Root type="multiple">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className="item acordionHeader">
                                        {t("annotations")}
                                        <div className="d-flex ml-4">
                                            <Edit3 width={"1.5em"} height={"1.5em"} className="mr-1" />
                                            <ChevronDown
                                                color={"var(--c-bg-primary)"}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        </div>
                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                        {annotatedPageIdList && annotatedPageIdList.length > 0 ? (
                                            annotatedPageIdList.map((pageId) => (
                                                <Accordion.Root
                                                    key={
                                                        book &&
                                                        book.id === bookId &&
                                                        book.book_pages.find((page) => page.id === parseInt(pageId))
                                                            .page_order
                                                    }
                                                    type="multiple"
                                                >
                                                    <Accordion.Item
                                                        value={`item-${
                                                            book &&
                                                            book.id === bookId &&
                                                            book.book_pages.find((page) => page.id === parseInt(pageId))
                                                                .page_order
                                                        }`}
                                                    >
                                                        <Link
                                                            to={`/books/${bookId}/pages/${
                                                                book &&
                                                                book.id === bookId &&
                                                                book.book_pages.find(
                                                                    (page) => page.id === parseInt(pageId)
                                                                ).page_order
                                                            }`}
                                                            className="dropDownItem"
                                                            onClick={(e) => toggleMenu(e)}
                                                        >
                                                            <Accordion.Trigger
                                                                className={`item subItem ${
                                                                    book &&
                                                                    book.id === bookId &&
                                                                    book.book_pages.find(
                                                                        (page) => page.id === parseInt(pageId)
                                                                    ).page_order === pageOrder &&
                                                                    "item-active"
                                                                }`}
                                                            >
                                                                <span>
                                                                    <span>{t("page")}</span>
                                                                    <span className="ml-2">
                                                                        {book &&
                                                                            book.id === bookId &&
                                                                            book.book_pages.find(
                                                                                (page) => page.id === parseInt(pageId)
                                                                            ).page_order}
                                                                    </span>
                                                                </span>
                                                                <span className="mr-2 item-right">
                                                                    {book &&
                                                                        book.id === bookId &&
                                                                        book.book_pages.find(
                                                                            (page) => page.id === parseInt(pageId)
                                                                        ).page_order}
                                                                </span>
                                                            </Accordion.Trigger>
                                                        </Link>
                                                    </Accordion.Item>
                                                </Accordion.Root>
                                            ))
                                        ) : (
                                            <DropdownMenu.Item
                                                className="item cursor-pointer ml-3"
                                                style={{ width: "unset" }}
                                            >
                                                {t("noAnnotation")}
                                            </DropdownMenu.Item>
                                        )}
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                            {/* QUICK NOTES */}
                            <Accordion.Root type="multiple">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className="item acordionHeader">
                                        {t("quick_notes")}
                                        <div className="d-flex ml-4">
                                            <Edit3 width={"1.5em"} height={"1.5em"} className="mr-1" />
                                            <ChevronDown
                                                color={"var(--c-bg-primary)"}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        </div>
                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                        {quickNotePages && quickNotePages.length > 0 ? (
                                            quickNotePages.map((quickNotePage) => (
                                                <Accordion.Root
                                                    key={
                                                        book &&
                                                        book.id === bookId &&
                                                        book.book_pages.find(
                                                            (page) => page.id === parseInt(quickNotePage.id)
                                                        ).page_order
                                                    }
                                                    type="multiple"
                                                >
                                                    <Accordion.Item
                                                        value={`item-${
                                                            book &&
                                                            book.id === bookId &&
                                                            book.book_pages.find(
                                                                (page) => page.id === parseInt(quickNotePage.id)
                                                            ).page_order
                                                        }`}
                                                    >
                                                        <Link
                                                            to={`/books/${bookId}/pages/${
                                                                book &&
                                                                book.id === bookId &&
                                                                book.book_pages.find(
                                                                    (page) => page.id === parseInt(quickNotePage.id)
                                                                ).page_order
                                                            }`}
                                                            className="dropDownItem"
                                                            onClick={(e) => toggleMenu(e)}
                                                        >
                                                            <Accordion.Trigger
                                                                className={`item subItem ${
                                                                    book &&
                                                                    book.id === bookId &&
                                                                    book.book_pages.find(
                                                                        (page) => page.id === parseInt(quickNotePage.id)
                                                                    ).page_order === pageOrder &&
                                                                    "item-active"
                                                                }`}
                                                            >
                                                                <span>
                                                                    <span>{t("page")}</span>
                                                                    <span className="ml-2">
                                                                        {book &&
                                                                            book.id === bookId &&
                                                                            book.book_pages.find(
                                                                                (page) =>
                                                                                    page.id ===
                                                                                    parseInt(quickNotePage.id)
                                                                            ).page_order}
                                                                    </span>
                                                                </span>
                                                                <span className="mr-2 item-right">
                                                                    {book &&
                                                                        book.id === bookId &&
                                                                        book.book_pages.find(
                                                                            (page) =>
                                                                                page.id === parseInt(quickNotePage.id)
                                                                        ).page_order}
                                                                </span>
                                                            </Accordion.Trigger>
                                                        </Link>
                                                    </Accordion.Item>
                                                </Accordion.Root>
                                            ))
                                        ) : (
                                            <DropdownMenu.Item
                                                className="item cursor-pointer ml-3"
                                                style={{ width: "unset" }}
                                            >
                                                {t("noQuickNotes")}
                                            </DropdownMenu.Item>
                                        )}
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                            {/* THEME */}
                            <Accordion.Root>
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger
                                        className="item acordionHeader"
                                        onClick={() => dispatch(themeActions.toggleTheme())}
                                    >
                                        <div>{isDark ? t("light") : t("dark")}</div>
                                        {isDark ? (
                                            <Sun
                                                color="var(--c-font-dark)"
                                                width="1.5em"
                                                height="1.5em"
                                                style={{ marginRight: 21 }}
                                            />
                                        ) : (
                                            <Moon
                                                color="var(--c-font-secondary)"
                                                width="1.5em"
                                                height="1.5em"
                                                style={{ marginRight: 21 }}
                                            />
                                        )}
                                    </Accordion.Trigger>
                                </Accordion.Item>
                            </Accordion.Root>
                            {/* REACT TOUR */}
                            <Accordion.Root>
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className="item acordionHeader">
                                        <div
                                            onClick={() => {
                                                openTour(), toggleMenu()
                                            }}
                                        >
                                            {t("ReacTour_Tooltip")}
                                        </div>
                                        <Info
                                            color="var(--c-font-primary)"
                                            width="1.5em"
                                            height="1.5em"
                                            style={{ marginRight: 21 }}
                                        />
                                    </Accordion.Trigger>
                                </Accordion.Item>
                            </Accordion.Root>
                            <Accordion.Root>
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger
                                        className="item acordionHeader"
                                        onClick={() => {
                                            setFeedbackModalOpen(true), toggleMenu()
                                        }}
                                    >
                                        <div>{t("feedback")}</div>
                                        <MessageCircle
                                            color="var(--c-font-primary)"
                                            width="1.5em"
                                            height="1.5em"
                                            style={{ marginRight: 21 }}
                                        />
                                    </Accordion.Trigger>
                                </Accordion.Item>
                            </Accordion.Root>
                            <Accordion.Root>
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className={`item position-relative}`}>
                                        <Switcher
                                            checked={isEditModeOpen}
                                            handleSwitch={() => dispatch(configActions.toggleEditMode())}
                                            label={t("editMode")}
                                        />
                                    </Accordion.Trigger>
                                </Accordion.Item>
                            </Accordion.Root>
                            {/*LANGUAGES */}
                            <Accordion.Root type="multiple">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger className="item acordionHeader">
                                        {utils.capitalize(t("languages"))}
                                        <div className="d-flex ml-4">
                                            <LanguageSvg width={"1.5em"} height={"1.5em"} />
                                            <ChevronDown
                                                color={"var(--c-bg-primary)"}
                                                width={"1.5em"}
                                                height={"1.5em"}
                                            />
                                        </div>
                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                        {Object.keys(languageList).map((language) => (
                                            <Accordion.Root key={language} type="multiple">
                                                <Accordion.Item value={`item-${language}`}>
                                                    <Link
                                                        className="dropDownItem"
                                                        onClick={(e) => utils.changeLocale(language, toggleMenu(e))}
                                                    >
                                                        <Accordion.Trigger
                                                            className={`item subItem ${
                                                                utils.getStore("locale") === language && "item-active"
                                                            }`}
                                                        >
                                                            <span>{utils.capitalize(t(languageList[language]))}</span>

                                                            <span className="mr-2 item-right">
                                                                {language.toUpperCase()}
                                                            </span>
                                                        </Accordion.Trigger>
                                                    </Link>
                                                </Accordion.Item>
                                            </Accordion.Root>
                                        ))}
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </div>
            <div className="mr-1">
                {book && !book.loading ? (
                    <span className="d-flex text-center">{book.name}</span>
                ) : (
                    <Spinner
                        style={{
                            width: "1rem",
                            height: "1rem",
                            float: "right",
                            fontSize: ".5rem"
                        }}
                    />
                )}
            </div>
            <div className="buttons d-flex">
                {width > 820 && (
                    <>
                        {utils.userIsNotStudent(user) && (
                            <Switcher
                                checked={isEditModeOpen}
                                handleSwitch={() => dispatch(configActions.toggleEditMode())}
                                label={t("editMode")}
                            />
                        )}
                        {/* REACT TOUR */}

                        <TooltipContainer placement={"bottom"} name={t("ReacTour_Tooltip")}>
                            <div onClick={openTour} className="topbar-button ml-1 cursor-pointer">
                                <Info color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                            </div>
                        </TooltipContainer>
                        <TooltipContainer placement={"bottom"} name={t("feedback")}>
                            <div
                                onClick={() => setFeedbackModalOpen(true)}
                                className="topbar-button ml-1 cursor-pointer"
                            >
                                <MessageCircle color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                            </div>
                        </TooltipContainer>
                        {/* THEME SELECT */}
                        <div className="d-flex top-menu" data-tut="theme">
                            <TooltipContainer placement={"bottom"} name={isDark ? t("light") : t("dark")}>
                                <div className="topbar-button ml-1 cursor-pointer">
                                    {isDark ? (
                                        <Sun
                                            color="var(--c-font-dark)"
                                            width="1.5em"
                                            height="1.5em"
                                            onClick={() => dispatch(themeActions.toggleTheme())}
                                        />
                                    ) : (
                                        <Moon
                                            color="var(--c-font-primary)"
                                            width="1.5em"
                                            height="1.5em"
                                            onClick={() => dispatch(themeActions.toggleTheme())}
                                        />
                                    )}
                                </div>
                            </TooltipContainer>
                        </div>
                        <div className="d-flex">
                            <Language
                                width={width}
                                toggleLanguage={() => setLanguageOpen(!isLanguageOpen)}
                                isLanguageOpen={isLanguageOpen}
                                setLanguageFalse={() => setLanguageOpen(false)}
                            />
                        </div>
                    </>
                )}
                <TooltipContainer placement={"bottom"} name={t("home")}>
                    <Link to="/">
                        <div className="d-flex align-items-center topbar-button">
                            <Home color="var(--c-font-primary)" width="1.5em" height="1.5em" />
                        </div>
                    </Link>
                </TooltipContainer>
            </div>
        </Navbar>
    )
})

export default React.memo(Topbar)
