import Types from "../../action/types";

const defaultState = {
    theme: {
        THEME_COLOR:'#008871',
        THEME_ICON_COLOR:'#ddd'
    }
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}