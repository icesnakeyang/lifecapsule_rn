import Types from "../types";
import DataStore from "../../expand/dao/DataStore";
import {API} from "../../api/api";
import CryptoJS from "crypto-js";
import {Decrypt, Decrypt2, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../common/encoder/crypto";

export function onListNote(token) {
    const url = API.apiListNote
    let dataStore = new DataStore()
    const requestBody = {
        pageIndex: 1,
        pageSize: 10
    }
    return dispatch => {
        dataStore.fetchPostData(url, requestBody, token)
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
    let url = API.apiGetRSAKey
    let RSA = null
    let note = {}
    let dataStore = new DataStore()
    return dispatch => {
        dataStore.fetchNetData(url).then((data) => {
            RSA = data.data
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
                dataStore.fetchPostData(url, params, token)
                    .then((responseData) => {
                        if (responseData.code === 0) {
                            note = responseData.data.note
                            let strKey = note.userEncodeKey
                            strKey = Decrypt2(strKey, keyAES_1)
                            note.detail = Decrypt(note.detail, strKey, strKey)
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

export function updateNote(params) {
    let url=''

    /**
     * 生成一个uuid
     * 根据uuid生成一个sha256，作为AES私钥
     * 把AES转换为base64格式
     * 把note的detail进行AES加密，秘钥是base64的AES秘钥
     * 从服务器请求一个RSA公钥
     * 用RSA公钥来加密base64的AES私钥
     * 此时得到一个公钥加密了AES私钥的秘钥，和一个对应的keyToken
     * 把noteId,title,AES加密的detail，公钥加密的AES私钥，以及keyToken作为参数调用updateNote的api来保存
     */

    const uuid=GenerateKey()
    const keyAES=CryptoJS.SHA256(uuid)
    const keyAESBase64=CryptoJS.enc.Base64.stringify(keyAES)

    let postParams={
        noteId:params.note.noteId,
        title:params.note.title,
        detail:Encrypt(params.note.detail, keyAESBase64, keyAESBase64),
        encryptKey:keyAESBase64
    }

    return dispatch=> {
        url = API.apiGetRSAKey
        const dataStore = new DataStore()
        dataStore.fetchNetData(url)
            .then((response) => {
                if (response.code === 0) {
                    postParams.encryptKey = RSAencrypt(postParams.encryptKey, response.data.publicKey)
                    postParams.keyToken = response.data.keyToken

                    url = API.apiUpdateNote
                    dataStore.fetchPostData(url, postParams, params.token)
                        .then((response) => {
                            if(response.code===0){
                                dispatch({
                                    type:Types.NOTE_UPDATE_SUCCESS
                                })
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            dispatch({
                                type:Types.NOTE_UPDATE_FAIL,
                                error:error
                            })
                        })
                }
            })
    }

}

export function clearNote() {
    return dispatch=> {
        dispatch({
            type: Types.NOTE_CLEAR,
            note:null
        })
    }
}