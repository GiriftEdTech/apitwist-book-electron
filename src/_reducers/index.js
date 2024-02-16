import { combineReducers } from "redux"
import { books } from "./book.reducer"
import { activeBook } from "./activeBook.reducer"
import { activePage } from "./activePage.reducer"
import { pageDetails } from "./pageDetails.reducer"
import { alert } from "./alert.reducer"
import { scale } from "./scale.reducer"
import { boards } from "./boards.reducer"
import { bookmark } from "./bookmark.reducer"
import { users } from "./users.reducer"
import { bookmarks } from "./bookmarks.reducer"
import { lastViewed } from "./lastViewed.reducer"
import { theme } from "./theme.reducer"
import { favorite } from "./favorite.reducer"
import { openAi } from "./openAi.reducer"
import { translate } from "./translate.reducer"
import { imageSearcher } from "./image.searcher.reducer"
import { config } from "./config.reducer"
import { classes } from "./class.reducer"

const rootReducer = combineReducers({
    activeBook,
    activePage,
    boards,
    bookmark,
    users,
    scale,
    books,
    pageDetails,
    alert,
    bookmarks,
    lastViewed,
    theme,
    favorite,
    openAi,
    translate,
    imageSearcher,
    config,
    classes
})

export default rootReducer
