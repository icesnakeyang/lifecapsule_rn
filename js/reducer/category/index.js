import Types from "../../action/types";

const defaultState = {
    data: {}
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.CATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                categoryList: action.categoryList
            }
        default:
            return state
    }
}