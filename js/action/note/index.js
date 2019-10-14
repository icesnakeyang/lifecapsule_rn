import Types from "../types";
import DataStore from "../../expand/dao/DataStore";
import {API} from "../../api/api";
import {Decrypt, Decrypt2, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../common/encoder/crypto";
import CryptoJS from "crypto-js";
import {DeviceEventEmitter} from "react-native";
import NavigationUtil from "../../navigator/NavigationUtil";

export function listNoteRecent(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.NOTE_LIST_REFRESHING,
            noteList: null,
            refreshing: true
        })
        let dataStore = new DataStore()
        let url = API.apiListNote
        let body = {
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
        }
        dataStore.fetchPostData(url, body, params.token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.NOTE_LIST_RECENT_SUCCESS,
                        noteList: response.data.noteList,
                        refreshing: false
                    })
                    callback(true)
                }
            })
            .catch((error) => {
                callback(false)
            })
    }
}

export function listNoteByCategory(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.NOTE_LIST_REFRESHING,
            noteList: null,
            refreshing: true
        })
        let dataStore = new DataStore()
        let url = API.apiListNoteByCategory
        let body = {
            categoryId: params.categoryId,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize
        }
        dataStore.fetchPostData(url, body, params.token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.NOTE_LIST_CATEGORY_SUCCESS,
                        noteList: response.data.noteList
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 10)
                }
            })
    }
}

export function saveNote(params, callback) {
    return dispatch => {
        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid)
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)
        const categoryId = params.categoryId
        const token = params.token
        let body = {
            title: params.title,
            detail: Encrypt(params.detail, keyAESBase64, keyAESBase64),
            encryptKey: keyAESBase64,
            categoryId: categoryId
        }
        let url = API.apiGetRSAKey
        let dataStore = new DataStore()
        dataStore.fetchNetData(url)
            .then((response) => {
                if (response.code === 0) {
                    body.encryptKey = RSAencrypt(body.encryptKey, response.data.publicKey)
                    body.keyToken = response.data.keyToken
                    url = API.apiCreateNote
                    dataStore.fetchPostData(url, body, token)
                        .then((response) => {
                            if (response.code === 0) {
                                dispatch({
                                    type: Types.NOTE_SAVE_SUCCESS
                                })
                                callback(true)
                            } else {
                            }
                        })
                        .catch((error) => {
                        })
                } else {
                }
            })
            .catch((error) => {
            })
    }
}

export function updateNote(params, callback) {
    return dispatch => {
        let url = ''
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
        const uuid = GenerateKey()
        const keyAES = CryptoJS.SHA256(uuid)
        const keyAESBase64 = CryptoJS.enc.Base64.stringify(keyAES)

        let postParams = {
            noteId: params.noteId,
            title: params.title,
            detail: Encrypt(params.detail, keyAESBase64, keyAESBase64),
            encryptKey: keyAESBase64
        }

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
                            if (response.code === 0) {
                                setTimeout(() => {
                                    callback(true)
                                }, 100)
                            } else {
                                setTimeout(() => {
                                    callback(false)
                                }, 100)
                            }
                        })
                        .catch((error) => {
                            setTimeout(() => {
                                callback(false)
                            }, 100)
                        })
                }
            })
    }

}

export function getNoteByNoteId(params, callback) {
    return dispatch => {
        let url = API.apiGetRSAKey
        let RSA = null
        let dataStore = new DataStore()
        dataStore.fetchNetData(url)
            .then((data) => {
                RSA = data.data
                const keyAES_1 = GenerateRandomString16();
                if (RSA) {
                    const publicKey = RSA.publicKey
                    const keyToken = RSA.keyToken

                    params.encryptKey = RSAencrypt(keyAES_1, publicKey)
                    params.keyToken = keyToken
                    const url = API.apiGetNoteDetailByNoteId
                    dataStore.fetchPostData(url, params, params.token)
                        .then((responseData) => {
                            if (responseData.code === 0) {
                                let note = responseData.data.note
                                let strKey = note.userEncodeKey
                                strKey = Decrypt2(strKey, keyAES_1)
                                note.detail = Decrypt(note.detail, strKey, strKey)
                                dispatch({
                                    type: Types.NOTE_GET_SUCCESS,
                                    note: responseData.data.note
                                })
                                setTimeout(() => {
                                    callback(true)
                                }, 1)
                            } else {
                                callback(false)
                            }
                        })
                        .catch((error) => {
                            callback(false)
                        })
                }
            }).catch((error) => {
            callback(false)
        })
    }
}