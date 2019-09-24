import {onThemeChange} from "./theme";
import {createBlankToken, getLocalToken, loginUser, logoutUser} from "./user";
import {refreshNoteList} from "./note";
import {loadCategory} from "./category";

export default {
    onThemeChange,
    getLocalToken,
    createBlankToken,
    loginUser,
    refreshNoteList,
    loadCategory,
    logoutUser
}