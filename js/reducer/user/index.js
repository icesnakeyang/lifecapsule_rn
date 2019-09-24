import Types from "../../action/types";

const defaultState = {}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.USER_LOCAL_TOKEN_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case Types.USER_LOCAL_TOKEN_FAIL:
            return {
                ...state,
                user: action.error
            }
        case Types.USER_CREATE_BLANK_USER_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case Types.USER_LOGIN_SUCCESS:
            console.log(action)
            return {
                ...state,
                user: action.user
            }
        case Types.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                user: {}
            }
        default:
            return state

    }
}