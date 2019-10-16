import {onThemeChange} from "./theme";
import {bindEmail1, bindPhone1, loginUserAuto, loginUserByNamePass, saveLoginPassword, saveNickName} from "./user";
import {getNoteByNoteId, listNoteByCategory, listNoteRecent, refreshNoteList, saveNote, updateNote} from "./note";
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
    saveRemarkServer, listRecipient, deleteRecipient, saveGogoKeyServer
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
    saveRecipientToServer,
    listRecipient,
    deleteRecipient,
    saveGogoKeyServer,
    updateNote,
    saveLoginPassword,
    bindPhone1,
    bindEmail1
}