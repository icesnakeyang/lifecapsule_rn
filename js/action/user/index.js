/**
 * 读取本地的token
 */
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function getLocalToken() {
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData('life_token')
            .then((data) => {
                dispatch({
                    type: Types.USER_LOCAL_TOKEN_SUCCESS,
                    user: {
                        token: data
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
    return  dispatch => {
        dispatch({
            type: Types.USER_CREATE_BLANK_USER_SUCCESS,
            user: {
                // token: '3e75b1bb-d664-4949-9a22-d86bd5645bae'
                token: 'dcfbc543-d549-467f-8e9c-de09c5038b78'
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