import Types from "../../action/types";

const defaultState = {
    categoryId: null
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.CATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                categoryList: action.categoryList
            }
        case Types.CATEGORY_SET_SUCCESS:
            return {
                ...state,
                categoryId: action.categoryId
            }
        default:
            return state
    }
}