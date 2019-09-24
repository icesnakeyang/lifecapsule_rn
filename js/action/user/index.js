/**
 * 读取本地的token
 */
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";
import {API} from "../../api/api";

export function getLocalToken() {
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData('life_token')
            .then((data) => {
                dispatch({
                    type: Types.USER_LOCAL_TOKEN_SUCCESS,
                    user: {
                        token: data.data
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: Types.USER_LOCAL_TOKEN_FAIL,
                    error: error
                })
            })
    }
}

/**
 * 创建一个临时新用户
 */
export function createBlankToken() {
    const url = API.apiCreateNewUser
    let dataStore = new DataStore()
    return dispatch => {
        dataStore.fetchPostData(url, {}, '')
            .then((response) => {
                if (response.code === 0) {
                    dataStore.saveData('life_token', response.data.user.token)
                    dispatch({
                        type: Types.USER_CREATE_BLANK_USER_SUCCESS,
                        user: response.data.user
                    })
                } else {
                    dispatch({
                        type: Types.USER_CREATE_BLANK_USER_FAIL,
                        error: response.code
                    })
                }
            })
    }
}

/**
 * 用户登录
 */
export function loginUser(token) {
    return new Promise((resolve, reject) => {
        let url = API.apiLoginBlankUser
        let dataStore = new DataStore()
        return dispatch => {
            dataStore.fetchPostData(url, {}, token)
                .then((response) => {
                    if (response.code === 0) {
                        dispatch({
                            type: Types.USER_LOGIN_SUCCESS,
                            user: response.data.user
                        })
                    } else {
                    }
                })
        }
    })
}

export function logoutUser() {
    let dataStore = new DataStore()
    return dispatch => {
        if (dataStore.removeData('life_token')) {
            dispatch({
                type: Types.USER_LOGOUT_SUCCESS,
                user: {}
            })
        } else {
        }
    }
}