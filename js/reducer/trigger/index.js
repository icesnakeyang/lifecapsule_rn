import Types from "../../action/types";

const defaultStatus = {}

export default function onAction(state = defaultStatus, action) {
    switch (action.type) {
        case Types.TRIGGER_LOAD_PUBLICKEY_SUCCESS:
            return {
                ...state,
                gogoPublickKeyList: action.gogoPublickKeyList
            }
        case Types.TRIGGER_GET_SUCCESS:
            return {
                ...state,
                trigger: action.trigger
            }
        default:
            return state
    }

}