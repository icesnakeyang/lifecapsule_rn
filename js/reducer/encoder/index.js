import Types from "../../action/types";

export default function onAction(state = [], action) {
    switch (action.type) {
        case Types.RSA_GET_SUCCESS:
            return {
                ...state,
                RSA: action.RSA
            }
        case Types.RSA_GET_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}