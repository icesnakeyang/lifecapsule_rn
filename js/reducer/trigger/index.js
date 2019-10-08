import Types from "../../action/types";

const defaultStatus = {}

export default function onAction(state = defaultStatus, action) {
    switch (action.type) {
        case Types.TRIGGER_LIST_PUBLICKEY_SUCCESS:
            return {
                ...state,
                gogoPublickKeyList: action.gogoPublickKeyList
            }
        case Types.TRIGGER_GET_SUCCESS:
            return {
                ...state,
                trigger: action.trigger
            }
        case Types.TRIGGER_PUBLICKEY_GET_SUCCESS:
            return {
                ...state,
                trigger: action.trigger
            }
        case Types.TRIGGER_GET_FAIL:
            console.log(action)
            return {
                ...state,
                trigger: action.trigger,
                error: action.error
            }
        case Types.TRIGGER_SAVE_SUCCESS:
            return {
                ...state,
                trigger: action.trigger
            }
        default:
            return state
    }

}