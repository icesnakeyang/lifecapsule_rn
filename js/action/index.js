import {onThemeChange} from "./theme";
import {loginUserAuto, loginUserByNamePass, saveNickName} from "./user";
import {getNoteByNoteId, listNoteByCategory, listNoteRecent, refreshNoteList, saveNote} from "./note";
import {loadCategory, setCategory} from "./category";
import {changeLanguage, loadLanguage} from "./language";
import {getGogoKey, getGogoPublicKey, listPublicKey} from "./trigger";

export default {
    onThemeChange,
    refreshNoteList,
    loadCategory,
    loginUserAuto,
    loginUserByNamePass,
    saveNickName,
    changeLanguage,
    loadLanguage,
    listNoteByCategory,
    setCategory,
    listNoteRecent,
    saveNote,
    getNoteByNoteId,
    listPublicKey,
    getGogoKey,
    getGogoPublicKey
}