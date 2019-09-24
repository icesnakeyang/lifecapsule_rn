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
                        user: {
                            token: response.data.user.token
                            // token: 'dcfbc543-d549-467f-8e9c-de09c5038b78'
                        }
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
export function loginUser() {
    return dispatch => {
        dispatch({
            type: Types.USER_LOGIN_SUCCESS,
            user: {
                token: '3e75b1bb-d664-4949-9a22-d86bd5645bae'
            }
        })
    }
}