import Types from "../../action/types";
import {Type} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";

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
        case Types.TRIGGER_CLEAR_SUCCESS:
            return {
                ...state,
                trigger: action.trigger,
                remark: action.remark
            }
        case Types.TRIGGER_SAVE_SERVER_SUCCESS:
            return {
                ...state
            }
        case Types.TRIGGER_SAVE_REMARK_SUCCESS:
            return {
                ...state,
                remark: action.remark
            }
        case Types.TRIGGER_SAVE_RECIPIENT_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Types.TRIGGER_SAVE_RECIPIENT_SUCCESS:
            return {
                ...state,
                recipient: action.recipient
            }
        default:
            return state
    }

}