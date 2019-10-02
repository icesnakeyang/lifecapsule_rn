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

export function getNoteByNoteId(params, callback) {
    return dispatch=> {
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
                                callback(true)
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