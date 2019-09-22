import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

export function refreshNoteList() {
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