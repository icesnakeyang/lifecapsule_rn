import Types from "../types";

export function loadCategory() {
    return dispatch=>{
        dispatch({
            type:Types.CATEGORY_LOAD_SUCCESS,
            list:{
                data:'ok'
            }
        })
    }
}