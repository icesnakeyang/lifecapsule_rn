import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

export function onListNote(url) {
    console.log(1)
    console.log(url)
    return dispatch => {
        dispatch({
            type: Types.NOTE_LIST
        })
        let dataStore = new DataStore()
        const postParams = {
            method: 'post',
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 10
            }),
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                token: '3e75b1bb-d664-4949-9a22-d86bd5645bae'
            }
        }

        console.log(2)
        dataStore.fetchPostData(url, postParams)
            .then((data) => {
                console.log(data.data.noteList)
                dispatch({
                    type: Types.NOTE_LIST_SUCCESS,
                    noteList: data.data.noteList
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: Types.NOTE_LIST_FAIL,
                    error
                })
            })
    }
}