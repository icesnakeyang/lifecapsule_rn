import Types from "../../action/types";

const defaultState = {
    theme: {
        THEME_HEAD_COLOR: '#2d3741',
        THEME_HEAD_TEXT: '#f4f5f6',
        THEME_BACK_COLOR:'#f5f5f5',
        THEME_ROW_COLOR: '#ffffff',
        THEME_ROW_ICON: '#07bd36',
        THEME_TEXT_COLOR:'#3f3f3f'
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