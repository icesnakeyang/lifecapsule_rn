import Types from "../../action/types";

export default function onAction(state = [], action) {
    switch (action.type) {
        case Types.NOTE_LIST:
            return {
                ...state,
                noteList: action.noteList
            }
        case Types.NOTE_LIST_SUCCESS:
            return {
                // ...state,
                noteList: action.noteList
            }
        case Types.NOTE_LIST_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Types.NOTE_DETAIL_SUCCESS:
            return {
                ...state,
                note: action.note
            }
        default:
            return state
    }
}