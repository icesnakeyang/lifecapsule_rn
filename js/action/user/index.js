/**
 * 读取本地的token
 */
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";
import {API} from "../../api/api";
import {RSAencrypt} from "../../common/encoder/crypto";

const TOKEN_NAME = 'life_token'

function getLocalStorageToken() {
    return new Promise((resolve, reject) => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData(TOKEN_NAME)
            .then((data) => {
                resolve(data.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function saveLocalStorageToken(token) {
    let dataStore = new DataStore()
    dataStore.saveData(TOKEN_NAME, token, callback)
}

function removeLocalStorageToken() {
    let dataStore = new DataStore()
    dataStore.removeData(TOKEN_NAME)
}

/**
 * 创建一个临时新用户
 */
function createBlankToken() {
    return new Promise((resolve, reject) => {
        const url = API.apiCreateNewUser
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, {})
            .then((response) => {
                if (response.code === 0) {
                    resolve(response)
                } else {
                    reject(response.code)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 用户打开app时的自动登录
 * 先读取localStorage，如果有token就验证token有效性
 *      如果有效就返回该token的用户信息
 *      如果过期，就进行云端AI处理。（以后开发）
 * 如果没有token就创建一个新用户
 */
export function loginUserAuto() {
    return dispatch => {
        dispatch({
            type: Types.USER_LOGIN
        })
        //获取本地token
        getLocalStorageToken()
            .then((token) => {
                if (token) {
                    //获取到本地token，用token来获取用户数据
                    loginUserByToken(token)
                        .then((response) => {
                            if (response.code === 0) {
                                //token有效，把用户数据写进redux
                                dispatch({
                                    type: Types.USER_LOGIN_SUCCESS,
                                    user: response.data.user
                                })
                            } else {
                                //token失效，让AI来处理

                            }
                        })
                        .catch((error) => {
                            dispatch({
                                type: Types.USER_LOGIN_FAIL,
                                error: error
                            })
                        })
                } else {
                    //本地没有token，创建一个新用户
                    createBlankToken()
                        .then((response) => {
                            //把新用户的token保存到localstorage
                            saveLocalStorageToken(response.user.token)
                            dispatch({
                                type: Types.USER_CREATE_BLANK_USER_SUCCESS,
                                user: response.data.user
                            })
                        })
                        .catch((error) => {
                            dispatch({
                                type: Types.USER_CREATE_BLANK_USER_FAIL,
                                error: error
                            })
                        })
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.USER_LOGIN_FAIL,
                    error: error
                })
            })
    }
}

/**
 * 通过token从服务器获取用户数据
 * @param token
 * @returns {Promise<R>}
 */
function loginUserByToken(token) {
    return new Promise((resolve, reject) => {
        let dataStore = new DataStore()
        const url = API.apiLoginBlankUser

        dataStore.fetchPostData(url, {}, token)
            .then((response) => {
                if (response.code === 0) {
                    resolve(response)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * 通过用户名，密码登录
 * @param username
 * @param password
 * @returns {Function}
 */
export function loginUserByNamePass(username, password, callBack) {
    return dispatch => {
        dispatch({
            type: Types.USER_LOGIN
        })
        let dataStore = new DataStore()
        const params = {
            phone: username,
            email: username,
            password: password
        }
        let url = API.apiGetRSAKey
        dataStore.fetchNetData(url)
            .then((response, callBack) => {
                if (response.code === 0) {
                    params.password = RSAencrypt(params.password, response.data.publicKey)
                    params.keyToken = response.data.keyToken

                    url = API.apiLoginUser
                    dataStore.fetchPostData(url, params)
                        .then((response, callBack) => {
                            if (response.code === 0) {
                                dispatch({
                                    type: Types.USER_LOGIN_SUCCESS,
                                    user: response.data.user
                                })
                                if (typeof callBack === 'function') {
                                    callBack(response)
                                }
                            } else {
                                console.log(response.code)
                                console.log(callBack)
                                if (typeof callBack === 'function') {
                                    callBack('error')
                                }
                                dispatch({
                                    type: Types.USER_LOGIN_FAIL,
                                    error: response.code
                                })
                            }
                        }).catch((error) => {
                        dispatch({
                            type: Types.USER_LOGIN_FAIL,
                            error: error
                        })
                    })
                }
            })
    }
}