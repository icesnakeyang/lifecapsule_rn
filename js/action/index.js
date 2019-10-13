import {onThemeChange} from "./theme";
import {loginUserAuto, loginUserByNamePass, saveNickName} from "./user";
import {getNoteByNoteId, listNoteByCategory, listNoteRecent, refreshNoteList, saveNote} from "./note";
import {loadCategory, setCategory} from "./category";
import {changeLanguage, loadLanguage} from "./language";
import {
    getTrigger,
    getGogoPublicKey,
    listPublicKey,
    saveTrigger,
    clearTrigger,
    saveTriggerToServer,
    saveRecipient,
    saveRecipientToServer,
    saveRemarkServer
} from "./trigger";

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
    getTrigger,
    getGogoPublicKey,
    saveTrigger,
    clearTrigger,
    saveTriggerToServer,
    saveRemarkServer,
    saveRecipient,
    saveRecipientToServer
}