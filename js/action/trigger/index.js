import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";
import {unstable_batchedUpdates} from "react-redux/es/utils/reactBatchedUpdates.native";

/**
 * 读取所公共触发器模板列表
 */
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

/**
 * 读取公共触发器模板详情
 */
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

/**
 * 读取一个触发器详情
 */
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

export function listRecipient(params, callback) {
    return dispatch => {
        let url = API.apiListRecipientByTriggerId
        let token = params.token
        let body = {
            triggerId: params.triggerId
        }
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_LIST_RECIPIENT_SUCCESS,
                        recipientList: response.data.recipientList
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    dispatch({
                        type: Types.TRIGGER_LIST_RECIPIENT_FAIL,
                        error: response.code
                    })
                    setTimeout(() => {
                        callback(false)
                    }, 100)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TRIGGER_LIST_RECIPIENT_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

//删除
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

/**
 * 保存remark到服务器
 * 保存remark时，直接保存到服务器
 * 跳转回trigger页面时，刷新trigger
 * 如果没有trigger后台会自动创建一个
 */
export function saveRemarkServer(params, callback) {
    return dispatch => {
        let url = API.apiSaveTriggerRemark
        let body = {
            triggerId: params.triggerId,
            noteId: params.noteId,
            remark: params.remark
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_SAVE_REMARK_SUCCESS
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

/**
 * 保存gogokey到服务器
 * 如果没有trigger后台会自动创建一个
 * 保存成功后，跳转回trigger页面，并刷新trigger
 */
export function saveGogoKeyServer(params, callback) {
    return dispatch => {
        let url = API.apiSaveGogoKey
        let token = params.token
        let body = {
            triggerId: params.triggerId,
            gogoPublicKeyId: params.gogoPublicKeyId,
            keyParams: params.keyParams,
            noteId: params.noteId
        }
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, params.token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TRIGGER_SAVE_GOGOKEY_SERVER_SUCCESS
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                }
            })
    }
}

/**
 * 保存recipient到服务器，
 * 如果没有trigger后台会自动创建一个
 *
 */
export function saveRecipientServer(params, callback) {
    return dispatch => {
        let url = API.apiSaveRecipient
        let token = params.token
        let body = {
            noteId: params.noteId,
            triggerId: params.triggerId,
            name: params.name,
            phone: params.phone,
            email: params.email,
            address: params.address,
            remark: params.remark,
            recipientId: params.recipient
        }
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
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

export function clearTrigger(callback) {
    return dispatch => {
        dispatch({
            type: Types.TRIGGER_CLEAR_SUCCESS,
            trigger: null,
            remark: null,
            recipient: null
        })
        setTimeout(() => {
            callback(true)
        }, 1)
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
        let url = API.apiSaveRecipient
        let body = {}
        if (params.recipientId) {
            body.recipientId = params.recipientId
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

export function deleteRecipient(params, callback) {
    return dispatch => {
        let url = API.apiDeleteRecipient
        let body = {
            recipientId: params.recipientId
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
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

}