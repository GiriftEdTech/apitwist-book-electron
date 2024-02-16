import { toast } from "react-toastify"
import { Airplay, Cast, Globe, Image, Music, PenTool, Video, Youtube } from "../components/icons"
import React from "react"
import { languageList, getTranslatedText as t } from "../_locale"

export const utils = {
    setStore,
    getClientToken,
    getClientTokenExpiresAt,
    getPasswordToken,
    getStore,
    getRole,
    deleteStore,
    clearStore,
    escapeRegexCharacters,
    userCanCreateBooks,
    userCanSubscribeBook,
    userIsNotStudent,
    handleResponse,
    isValidEmail,
    getAvatar,
    getLogo,
    arrayHasLength,
    objectHasLength,
    getContentTypeIcon,
    calcTopPercentage,
    percentageToPixel,
    calcLeftPercentage,
    handleNewLine,
    capitalize,
    replaceSpacesWithPlus,
    changeLocale,
    getFirstPath,
    pageHasBookmark,
    getContentNameByUser,
    getObjectById,
    getLanguageShortage,
    languages,
    calculatePxtoPercentage,
    createContentPercentage,
    isUserStudent,
    getPath,
    isClassExpired,
    getDurationAddedTime,
    getMinutes,
    addZero

    // formatPhoneNumber
}

/**
 * Set localStorage
 */
function setStore(name, content) {
    if (!name) return
    if (typeof content !== "string") {
        content = JSON.stringify(content)
    }
    return window.localStorage.setItem(name, content)
}

/**
 * Get clientToken
 */
function getClientToken() {
    return window.localStorage.getItem("clientToken")
}

/**
 * Get clientToken ExpiresAt
 */
function getClientTokenExpiresAt() {
    return window.localStorage.getItem("clientToken_expires_at")
}

/**
 * Get localStorage
 */
function getPasswordToken() {
    return (
        window.localStorage.getItem("passwordToken") &&
        window.localStorage.getItem("passwordToken") !== "undefined" &&
        window.localStorage.getItem("passwordToken")
    )
}

/**
 * Get localStorage
 */
function getStore(name) {
    if (!name) return
    return window.localStorage.getItem(name)
}

/**
 * Delete localStorage
 */
function deleteStore(name) {
    if (!name) return
    return window.localStorage.removeItem(name)
}

/**
 * Clear localStorage
 */
function clearStore() {
    return window.localStorage.clear()
}

/**
 * Clear localStorage
 */
function escapeRegexCharacters(str) {
    if (!str) return false
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Get If User Has Permission To Create Book
 */
function userCanCreateBooks(user) {
    let role = getRole(user)
    let creators = [
        "super-admin",
        "admin",
        "publisher-manager",
        "teacher",
        "program-coordinator",
        "institution-manager"
    ]
    return creators.includes(role)
}

/**
 * Get If User Has Permission To Subscribe To A Book
 */
function userCanSubscribeBook(user) {
    let role = getRole(user)
    let subscriberRoles = ["student"]
    return subscriberRoles.includes(role)
}

/**
 * Get If User Has Permission To studio.apitwist.com
 */
function userIsNotStudent(user) {
    let role = getRole(user)
    return role !== "student"
}

/**
 * Get User's Role
 */
function getRole(user) {
    let roles = user && objectHasLength(user) && user.roles
    let roleNames = []
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            roleNames.push(roles[i].name)
        }
    }

    return roleNames.includes("super-admin")
        ? "super-admin"
        : roleNames.includes("admin")
        ? "admin"
        : roleNames.includes("institution-manager")
        ? "institution-manager"
        : roleNames.includes("publisher-manager")
        ? "publisher-manager"
        : roleNames.includes("program-coordinator")
        ? "program-coordinator"
        : roleNames.includes("teacher")
        ? "teacher"
        : roleNames.includes("student")
        ? "student"
        : "error"
}

/**
 * Handle response
 */
function handleResponse(response) {
    return response.text().then((text) => {
        if (response.ok) {
            const data = text && JSON.parse(text)
            return data
        } else {
            const data = text && JSON.parse(text)
            let error = {
                code: response.status,
                message: response.statusText
            }
            if (response.status === 401) {
                utils.deleteStore("passwordToken")
                window.location.href = "/login"
            } else {
                if (response.status === 404) {
                    toast.error(response.statusText)
                }

                if (response.status === 401) {
                    switch (data.message) {
                        case "Invalid login credentials":
                            error = {
                                code: 401,
                                message: "Incorrect email or password."
                            }
                            break
                        default:
                            error = {
                                code: 401,
                                message: data.message
                            }
                    }
                }
            }
            toast.error(error.message ? error.message : error.code)
            return Promise.reject(error)
        }
    })
}

/**
 * Validate Email address
 */
function isValidEmail(value) {
    return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value))
}

/**
 * Format Phone Number
 */
// function formatPhoneNumber(value) {
//   if (!value) return
//   const currentValue = value.replace(/[^\d]/g, '')
//   const mobileNoLength = currentValue.length
//   if (mobileNoLength >= 7) {
//     if (mobileNoLength < 4) return currentValue
//     if (mobileNoLength < 7)
//       return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`
//     return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
//       3,
//       6
//     )}-${currentValue.slice(6, 10)}`
//   } else {
//     return currentValue
//   }
// }

/**
 * Can Use Dom?
 */
export const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement)
/**
 * Get User's Avatar
 */
function getAvatar(user, isBig = false) {
    if (user && user.avatar && user.avatar.url) {
        if (isBig) {
            return (
                <img
                    src={process.env.REACT_APP_CONTENT_URL + user.avatar.url}
                    alt="User Avatar"
                    className="img-fluid user-image"
                    style={{ width: "100px" }}
                />
            )
        } else {
            return (
                <img
                    src={process.env.REACT_APP_CONTENT_URL + user.avatar.url}
                    alt="User Avatar"
                    className="avatar rounded-circle shadow"
                    width="45px"
                    height="45px"
                />
            )
        }
    } else {
        if (isBig) {
            return (
                <div className="avatar-name avatar-name-big shadow">
                    <span className="avatar-content">{getFirstLetters()}</span>
                </div>
            )
        } else {
            return (
                <div className="avatar-name shadow">
                    <span className="avatar-content">{getFirstLetters()}</span>
                </div>
            )
        }
    }

    function getFirstLetters() {
        if (!user || Object.keys(user).length === 0) return "##"
        let name = user.name.toUpperCase()
        let surname = user.surname.toUpperCase()
        if (name && surname) {
            return name.charAt(0) + surname.charAt(0)
        } else if (name) {
            return name.charAt(0)
        } else if (surname) {
            return surname.charAt(0)
        } else {
            return "##"
        }
    }
}

function getLogo(user) {
    return (
        user &&
        Object.keys(user).length > 0 &&
        user.institutions &&
        user.institutions.length > 0 &&
        user.institutions[0].logo &&
        Object.keys(user.institutions[0].logo).length > 0 &&
        user.institutions[0].logo.url &&
        user.institutions[0].logo.url !== null &&
        process.env.REACT_APP_CONTENT_URL + user.institutions[0].logo.url
    )
}

function arrayHasLength(arr) {
    return arr && arr.length > 0
}

function objectHasLength(obj) {
    return obj && Object.keys(obj).length > 0
}

function getContentTypeIcon(content_type_id, width, height) {
    switch (content_type_id) {
        case 2:
            return <Image width={width ? width : ""} height={height ? height : ""} />
            break
        case 3:
            return <Music width={width ? width : ""} height={height ? height : ""} />
            break
        case 4:
            return <Airplay width={width ? width : ""} height={height ? height : ""} />
            break
        case 5:
            return <Video width={width ? width : ""} height={height ? height : ""} />
            break
        case 6:
            return <Youtube width={width ? width : ""} height={height ? height : ""} />
            break
        case 7:
            return <Globe width={width ? width : ""} height={height ? height : ""} />
            break
        case 8:
            return <Cast width={width ? width : ""} height={height ? height : ""} />
            break
        case 1:
        default:
            return <PenTool width={width ? width : ""} height={height ? height : ""} />
            break
    }
}

function calcTopPercentage(contentPositionY, pageHeight) {
    return ((contentPositionY / pageHeight) * 100).toFixed(2)
}

function calculatePxtoPercentage(elementPx, pagePx) {
    return ((pagePx - elementPx) / pagePx).toFixed(2)
}

function percentageToPixel(percentage, containerSize) {
    return ((percentage * containerSize) / 100).toFixed(0)
}

function calcLeftPercentage(contentPositionX, pageWidth) {
    return ((contentPositionX / pageWidth) * 100).toFixed(2)
}

function handleNewLine(string) {
    const startsWithDoubleNewLines = string.startsWith("\n\n")
    if (startsWithDoubleNewLines) {
        return string.slice(1)
    } else {
        return "\n" + string
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function replaceSpacesWithPlus(sentence) {
    if (sentence.trim() === "") return
    const words = sentence.replace(/\s+/g, " ").trim().split(" ")
    const modifiedWords = words.map((word, index) => (index === words.length - 1 ? word.trim() : word.trim() + "+"))
    return modifiedWords.join("")
}

function changeLocale(locale, callback) {
    utils.setStore("locale", locale)

    callback && callback
    window.location.reload()
}

function getFirstPath() {
    return window.location.pathname.split("/")[1]
}

function pageHasBookmark(bookmarked, pageId, bookId) {
    return (
        bookmarked &&
        utils.objectHasLength(bookmarked) &&
        bookmarked[bookId] !== undefined &&
        bookmarked[bookId].some((bookmarkedPage) => bookmarkedPage.book_page_id === pageId)
    )
}

function getContentNameByUser(content_name, user) {
    let isUserStudent = utils.objectHasLength(user) && !utils.userIsNotStudent(user)
    return content_name === "textarea" ? (isUserStudent ? t("note") : t(content_name)) : t(content_name)
}

function getObjectById(obj, targetId) {
    return Object.values(obj).find((item) => item.id === targetId) || null
}

function languages() {
    return Object.keys(languageList).map((language) => ({
        value: languageList[language],
        label: utils.capitalize(t(languageList[language])),
        shortLang: language
    }))
}

function getLanguageShortage(lang) {
    return languages().find((language) => language.value === lang.value).shortLang
}

function createContentPercentage(topBarRef, pageHeight, pageWidth, contents) {
    //Get page scrolled position to be able to create content after scrolled position
    let pageScrolledYPosition = utils.calcTopPercentage(window.scrollY, pageHeight)

    //Get page element and upside elements of page
    const pageRef = topBarRef.current.parentElement
    const canvasRef = pageRef.children[1]
    const canvasStyle = window.getComputedStyle(canvasRef)

    //Reduce upside elements' height from the visible window height
    const canvasMarginTop = +canvasStyle.getPropertyValue("margin-top").split("px")[0]
    let innerHeight = window.innerHeight - topBarRef.current.offsetHeight - canvasMarginTop

    //Make grid the book page height and width to find how many cells are needed to fit the contents
    let gridHeight = pageHeight
    let gridWidth = pageWidth

    //Calculate content size and gap between contents as percentage since size can change depending on the window size(responsively)
    const contentWidth = utils.calcTopPercentage(43, gridWidth)
    const contentHeight = utils.calcTopPercentage(30, gridHeight)
    const gapBetweenContents = utils.calcTopPercentage(10, gridWidth)

    //Calculate each cell size as percentage
    let cellWidth = Math.floor(+gapBetweenContents + +contentWidth + +gapBetweenContents)
    let cellHeight = Math.floor(+gapBetweenContents + +contentHeight + +gapBetweenContents)

    //Calculate visible screen height and width which you can create content
    let innerHeightPercentage = 100 - utils.calculatePxtoPercentage(innerHeight, pageHeight) * 100
    let cellCountByRow = Math.floor(100 / cellHeight)
    let innerWidthPercentage = 100 - utils.calculatePxtoPercentage(gridWidth, pageWidth)
    let cellCountByColumn = Math.floor(innerWidthPercentage / cellWidth)

    //Calculate how many cells are needed to fit the contents
    let rows = cellCountByRow
    let columns = cellCountByColumn

    //Define as 0 to starts top and left corner of the bookpage
    let gridStartsAtY = 0
    let gridStartsAtX = 0

    //Divide whole bookpage as cell
    const cells = []

    for (let j = 0; j < columns; j++) {
        cells[j] = []
        for (let i = 0; i < rows; i++) {
            const x = gridStartsAtX + j * +cellWidth
            const y = gridStartsAtY + i * +cellHeight
            const width = +cellWidth
            const height = +cellHeight

            cells[j][i] = [y, y + height, x, x + width]
        }
    }

    // Find which cell is visible on the screen
    const cellsCreationRanged = cells.map((subarray) =>
        subarray.filter(
            (subsubArray) =>
                subsubArray[0] >= +pageScrolledYPosition &&
                subsubArray[1] <= +pageScrolledYPosition + +innerHeightPercentage
        )
    )

    // Filter empty cells which is not including content's any part so
    //There is no any collusion with content and cell
    const filteredEmptyCells = cellsCreationRanged.map((subarray) =>
        subarray.filter((subsubArray) =>
            contents.every((content) => {
                const { pivot } = content
                const contentStartsAtY = +pivot.top
                const contentStartsAtX = +pivot.left

                const [y, yPlusHeight, x, xPlusWidth] = subsubArray

                const contentEndsAtY = contentStartsAtY + +contentHeight
                const contentEndsAtX = contentStartsAtX + +contentWidth

                const hasContentInsideCell =
                    contentStartsAtX < xPlusWidth &&
                    contentEndsAtX > x &&
                    contentStartsAtY < yPlusHeight &&
                    contentEndsAtY > y

                return !hasContentInsideCell
            })
        )
    )

    // Find the first empty cell in empty filtered cells

    let firstEmptyCell = filteredEmptyCells.filter((subarray) => subarray.length > 0)

    //return empty cell's top and left position
    return { top: firstEmptyCell[0][0][0], left: firstEmptyCell[0][0][2] }
}

function isUserStudent(user) {
    if (user && Object.keys(user).length > 0) {
        let role = getRole(user)
        return role === "student"
    }
}

function isClassExpired(cls) {
    return Date.now() > new Date(cls.ends_at)
}

function getPath(cls, token) {
    if (cls.is_enrolled && cls.enrollment_status === "active") {
        return `https://class.apitwist.com/class/${cls.code}?token=${token}`
    }
    if (cls.enrollment_status === "pending") {
        return "#"
    }

    if (Boolean(cls.is_public) && !isClassExpired(cls)) {
        return `https://class.apitwist.com/class/${cls.code}?isPublic=true`
    }

    if (!Boolean(cls.is_public)) {
        return `https://class.apitwist.com/class/${cls.code}/enroll`
    }

    if (!isClassExpired(cls)) {
        if (
            cls.enrollment_status === "rejected" ||
            cls.enrollment_status === "blocked" ||
            cls.enrollment_status === null
        ) {
            return `https://class.apitwist.com/class/${cls.code}/enroll`
        }
    }
}

function getMinutes() {
    return 1000 * 60
}

function getDurationAddedTime(starts_at, duration) {
    return new Date(starts_at).getTime() + duration * getMinutes()
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
