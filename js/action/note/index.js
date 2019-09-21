import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

export function refreshNoteList() {
    console.log('refresh note list')
    // return dispatch=>{
    //     dispatch({
    //         type:Types.NOTE_REFRESH_LIST_SUCCESS
    //     })
    // }
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData('life_token')
            .then((data) => {
                dispatch({
                    type: Types.USER_LOCAL_TOKEN_SUCCESS,
                    user: {
                        token: data
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: Types.USER_LOCAL_TOKEN_FAIL,
                    error: error
                })
            })
    }
}