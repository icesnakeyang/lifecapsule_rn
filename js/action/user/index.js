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
                console.log('read from local')
                console.log(data)
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
        console.log(url)
        dataStore.fetchPostData(url, {}, '')
            .then((response) => {
                console.log('create from server')
                console.log(response)
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
    console.log(token)
    let url = API.apiLoginBlankUser
    let dataStore = new DataStore()
    return dispatch => {
        dataStore.fetchPostData(url, {}, token)
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    console.log('0')
                    console.log(response.data.user)
                    dispatch({
                        type: Types.USER_LOGIN_SUCCESS,
                        user: response.data.user
                    })
                } else {
                    console.log(1)
                }
            })
    }
}

export function logoutUser() {
    console.log('log out')
    let dataStore = new DataStore()
    return dispatch => {
        if (dataStore.removeData('life_token')) {
            console.log('log out success')
            dispatch({
                type: Types.USER_LOGOUT_SUCCESS,
                user: {}
            })
        } else {
            console.log('log out error')
        }
    }
}