import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function listPublicKey(params, callback) {
    return dispatch => {
        let url = API.apiListGogoPublicKey
        let body = {}
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_LIST_PUBLICKEY_SUCCESS,
                        gogoPublickKeyList: response.data.gogoPublicKeyList
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
}

export function getGogoPublicKey(params, callback) {
    return dispatch => {
        let url = API.apiGetGogoPublicKey
        let gogoKeyId = params.gogoKeyId
        let token = params.token
        let dataStore = new DataStore()
        const body = {
            gogoKeyId: gogoKeyId
        }
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_PUBLICKEY_GET_SUCCESS,
                        publicKey: response.data.key,
                        status: 'SETTING_GOGOKEY'
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                }
            })
    }

}

export function getGogoKey(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_GET,
            status: 'GETTING_TRIGGER'
        })
        let url = API.apiGetTriggerByNoteId
        let noteId = params.noteId
        let token = params.token
        let dataStore = new DataStore()
        const body = {
            noteId: noteId
        }
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_GET_SUCCESS,
                        trigger: response.data.trigger,
                        isSetting: false
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                }
            })
    }

}

export function saveUserRemark(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_SAVE_USER_REMARK_SUCCESS,
            userRemark: params.userRemark
        })
        setTimeout(() => {
            callback(true)
        }, 1)
    }
}

export function saveParam(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_SAVE_PARAM_SUCCESS,
            params: params
        })
        setTimeout(() => {
            callback(true)
        }, 1)
    }

}