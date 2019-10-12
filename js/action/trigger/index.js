import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";
import {Type} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";

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
        let publicKeyId = params.publicKeyId
        let token = params.token
        let dataStore = new DataStore()
        const body = {
            gogoKeyId: publicKeyId
        }
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    let newTrigger = {}
                    if (params.trigger) {
                        newTrigger = params.trigger
                    }
                    newTrigger.gogoKey = response.data.key
                    dispatch({
                        type: Types.TRIGGER_PUBLICKEY_GET_SUCCESS,
                        trigger: newTrigger
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
                    let trigger = null
                    if (response.data.trigger) {
                        trigger = response.data.trigger
                    }
                    dispatch({
                        type: Types.TRIGGER_GET_SUCCESS,
                        trigger: trigger
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                } else {
                    dispatch({
                        type: Types.TRIGGER_GET_FAIL,
                        trigger: {},
                        error: response.code
                    })
                    setTimeout(() => {
                        callback(false)
                    }, 1)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TRIGGER_GET_FAIL,
                    trigger: {},
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 1)
            })
    }
}

export function saveTrigger(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_SAVE_SUCCESS,
            trigger: params
        })
        setTimeout(() => {
            callback(true)
        }, 1)
    }
}

export function saveTriggerToServer(params, callback) {
    return dispatch => {
        let url = API.apiSaveTrigger
        let body = {
            triggerId: params.triggerId,
            remark: params.remark,
            noteId: params.noteId,
            gogoKey: params.gogoKey
        }
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, params.token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_SAVE_SERVER_SUCCESS,
                        trigger: params
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                }
            })
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

export function clearTrigger() {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_CLEAR_SUCCESS,
            trigger: null,
            remark: null
        })
    }
}

export function saveTriggerRemark(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_SAVE_REMARK_SUCCESS,
            remark: params.remark
        })
        setTimeout(() => {
            callback(true)
        }, 1)
    }
}

export function createRecipient(params, callback) {
    return dispatch => {
        let token = params.token

        let body = {
            noteId: params.noteId,
            triggerId: params.triggerId,
            name: params.name,
            phone: params.phone,
            email: params.email,
            address: params.address
        }

        let url = API.apiCreateRecipient

        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_CREATE_RECIPIENT_SUCCESS
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                } else {
                    dispatch({
                        type: Types.TRIGGER_CREATE_RECIPIENT_FAIL,
                        error: response.code
                    })
                    setTimeout(() => {
                        callback(false)
                    }, 1)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TRIGGER_CREATE_RECIPIENT_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 1)
            })
    }
}

export function saveRecipient(params, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_SAVE_RECIPIENT_SUCCESS,
            recipient: params
        })
        setTimeout(() => {
            callback(true)
        }, 1)
    }

}

export function saveRecipientToServer(params, callback) {
    return dispatch => {
        let url = ''
        let body = {}
        if (params.recipientId) {
            url = API.apiUpdateRecipient
            body.recipientId = params.recipientId
        } else {
            url = API.apiCreateRecipient
        }
        const token = params.token
        body.recipientName = params.name
        body.phone = params.phone
        body.email = params.email
        body.address = params.address
        body.remark = params.remark
        body.noteId = params.noteId
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_SAVE_RECIPIENT_SERVER_SUCCESS
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 1)
                } else {
                    dispatch({
                        type: Types.TRIGGER_SAVE_RECIPIENT_SERVER_FAIL,
                        error: response.code
                    })
                    setTimeout(() => {
                        callback(false)
                    }, 1)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TRIGGER_SAVE_RECIPIENT_SERVER_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 1)
            })
    }
}