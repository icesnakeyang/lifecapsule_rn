import Types from "../../action/types";

const defaultState = {
    refreshing: true
}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.NOTE_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                noteList: action.noteList
            }
        case Types.NOTE_LIST_RECENT_SUCCESS:
            return {
                ...state,
                noteList: action.noteList,
                refreshing: action.refreshing
            }
        case Types.NOTE_LIST_REFRESHING:
            return {
                ...state,
                noteList: null,
                refreshing: action.refreshing
            }
        case Types.NOTE_GET_SUCCESS:
            return {
                ...state,
                note:action.note
            }
        default:
            return state
    }
}