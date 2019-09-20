import Types from "../../action/types";

export default function onAction(state={}, action) {
    console.log('action note')
    console.log(action.type)
    switch (action.type) {
        case Types.NOTE_REFRESH_LIST_SUCCESS:
            console.log('reducer note list success')
            return{
                ...state,
                noteList:action.noteList
            }
        default:
            return state
    }
}