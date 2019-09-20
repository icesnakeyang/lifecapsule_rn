import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

export function refreshNoteList(token) {
    console.log('refresh note list')
    // return dispatch=>{
    //     dispatch({
    //         type:Types.NOTE_REFRESH_LIST_SUCCESS
    //     })
    // }

    return dispatch => {
                dispatch({
                    type: Types.USER_LOCAL_TOKEN_SUCCESS,
                    user: {
                        token: {
                            data:'ok'
                        }
                    }
                })
    }
}