import Types from "../types";
import DataStore from "../../expand/dao/DataStore";

export function onListNote(url) {
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

        dataStore.fetchPostData(url, postParams)
            .then((data) => {
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

export function onNoteDetail(noteId) {
    return dispatch => {
        dispatch({
            type: Types.NOTE_DETAIL
        })
        let dataStore = new DataStore()
        let encryptKey=''
        let keyToken=''
        dataStore.fetchData('security/requestRSAPublicKey')
            .then((response) => {
            })

        const postParams = {
            method: 'post',
            body: JSON.stringify({
                noteId,
                encryptKey,
                keyToken
            }),
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                token: '3e75b1bb-d664-4949-9a22-d86bd5645bae'
            }
        }

        dataStore.fetchPostData('note/getNoteDetailByNoteId', postParams)
            .then((data) => {
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