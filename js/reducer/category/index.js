import Types from "../../action/types";

const defaultState = {
    data:{}
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.CATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                data: {
                    t1:'init3'
                }
            }
        default:
            return state
    }
}