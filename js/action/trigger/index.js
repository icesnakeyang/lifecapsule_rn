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
                        gogoKey: response.data.key
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                }
            })
    }

}

export function getTrigger(params, callback) {
    return dispatch => {
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
                        trigger: response.data.trigger
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                }
            })
    }
}

export function saveTrigger(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_SAVE_SUCCESS,
            trigger:params
        })
        setTimeout(() => {
            callback(true)
        }, 1)
    }
}

export function saveGogoKey(params, callback) {
    return dispatch => {
        let url = API.apiSaveGogoKey
        let body = {
            //       token
            //  triggerId
            // keyParams
            //  gogoKeyId
            //  triggerName
            //  noteId
            //  triggerRemark
            //  title
            // description

        }

    }
}