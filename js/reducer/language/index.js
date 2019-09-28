import Types from "../../action/types";

const defaultState = {
    data: {}
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LANGUAGE_LOAD_SUCCESS:
            return {
                ...state,
                language: action.language
            }
        case Types.LANGUAGE_SAVE_SUCCESS:
            return {
                ...state,
                language: action.language
            }
        default:
            return state
    }
}