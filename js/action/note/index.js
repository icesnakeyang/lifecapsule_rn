import Types from "../types";
import DataStore from "../../expand/dao/DataStore";
import {API} from "../../api/api";
import {Decrypt, Decrypt2, GenerateRandomString16, RSAencrypt} from "../../common/encoder/crypto";

export function onListNote(token) {
    const url = API.apiListNote
    return dispatch => {
        let dataStore = new DataStore()
        const postParams = {
            method: 'post',
            body: JSON.stringify({
                pageIndex: 1,
                pageSize: 10
            }),
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
                token: token
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

export function onNoteDetail(noteId, token) {
    console.log(noteId)
    console.log(token)
    let url = API.apiGetRSAKey
    let RSA = null
    let note = {}
    let dataStore = new DataStore()
    return dispatch => {
        dataStore.fetchNetData(url).then((data) => {
            console.log(data)
            RSA = data.data
            console.log(RSA)
            let params = {
                noteId: noteId,
            }
            const keyAES_1 = GenerateRandomString16();
            if (RSA) {
                const publicKey = RSA.publicKey
                const keyToken = RSA.keyToken

                params.encryptKey = RSAencrypt(keyAES_1, publicKey)
                params.keyToken = keyToken

                const url = API.apiGetNoteDetailByNoteId
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        'Content-Type': "application/json;charset=UTF-8",
                        token: token
                    }
                }).then((response) => {
                    console.log(response)
                    if (response.ok) {
                        return response.json()
                    }
                }).then((responseData) => {
                    console.log(responseData)
                    if (responseData.code === 0) {
                        note = responseData.data.note
                        console.log(note)
                        let strKey = note.userEncodeKey
                        strKey = Decrypt2(strKey, keyAES_1)
                        note.detail = Decrypt(note.detail, strKey, strKey)
                        console.log(note.detail)
                        dispatch({
                            type: Types.NOTE_DETAIL_SUCCESS,
                            note: note
                        })
                    }
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}