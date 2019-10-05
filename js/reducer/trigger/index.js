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
                publicKey: action.publicKey,
                status:action.status
            }
        case Types.TRIGGER_GET:
            return {
                ...state,
                status:action.status
            }
        case Types.TRIGGER_SAVE_USER_REMARK_SUCCESS:
            return {
                ...state,
                userRemark:action.userRemark
            }
        default:
            return state
    }

}