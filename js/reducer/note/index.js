import Types from "../../action/types";

export default function onAction(state={}, action) {
    switch (action.type) {
        case Types.NOTE_REFRESH_LIST_SUCCESS:
            return{
                ...state,
                data:action.data
            }
        default:
            return state
    }
}