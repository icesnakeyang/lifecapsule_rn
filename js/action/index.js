import {onThemeChange} from "./theme";
import {onListNote, onNoteDetail} from "./note";
import {createBlankToken, getLocalToken, loginUser} from "./user";
import {getRSA} from "./encoder";

export default {
    onThemeChange,
    onListNote,
    onNoteDetail,
    getLocalToken,
    createBlankToken,
    loginUser,
    getRSA
}