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
    console.log('t1')
    let dataStore = new DataStore()
    console.log('t2')
    console.log('save token')
    dataStore.saveData(TOKEN_NAME, token)
    console.log('save token success')
}

function removeLocalStorageToken() {
    let dataStore = new DataStore()
    dataStore.removeData(TOKEN_NAME)
}

/**
 * 创建一个临时新用户
 */
function createBlankToken(deviceId) {
    console.log('create ' + deviceId)
    return new Promise((resolve, reject) => {
        const url = API.apiCreateNewUser
        let dataStore = new DataStore()
        console.log(url)
        dataStore.fetchPostData(url, {deviceId:deviceId})
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    resolve(response)
                } else {
                    reject(response.code)
                }
            })
            .catch((error) => {
                console.log(error)
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
export function loginUserAuto(deviceId, callback) {
    console.log(callback)
    console.log('设备id：' + deviceId)
    return dispatch => {
        dispatch({
            type: Types.USER_LOGIN
        })
        //获取本地token
        console.log('读取本地token')
        getLocalStorageToken()
            .then((token) => {
                if (token) {
                    console.log('token：' + token)
                    //获取到本地token，用token来获取用户数据
                    loginUserByToken(token)
                        .then((response) => {
                            console.log(response)
                            if (response.code === 0) {
                                console.log('成功获取用户数据')
                                //token有效，把用户数据写进redux
                                dispatch({
                                    type: Types.USER_LOGIN_SUCCESS,
                                    user: response.data.user
                                })
                                console.log(callback)
                                callback(true)
                            } else {
                                //token失效，让AI来处理

                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            dispatch({
                                type: Types.USER_LOGIN_FAIL,
                                error: error
                            })
                        })
                } else {
                    console.log('没有token，创建一个用户')
                    //本地没有token，创建一个新用户
                    createBlankToken()
                        .then((response) => {
                            console.log('新用户')
                            console.log(response)
                            //把新用户的token保存到localstorage
                            saveLocalStorageToken(response.user.token)
                            console.log('保存token:' + response.user.token)
                            dispatch({
                                type: Types.USER_LOGIN_SUCCESS,
                                user: response.data.user
                            })
                            callback(true)
                        })
                        .catch((error) => {
                            console.log(error)
                            dispatch({
                                type: Types.USER_CREATE_BLANK_USER_FAIL,
                                error: error
                            })
                        })
                }
            })
            .catch((error) => {
                console.log('读取本地tokgen失败')
                console.log(error)
                //创建一个新用户
                console.log('创建新用户')
                createBlankToken(deviceId)
                    .then((response) => {
                        console.log('创建了新用户')
                        console.log(response)
                        console.log('haha')
                        console.log(response.data.user.token)
                        saveLocalStorageToken(response.data.user.token)
                        console.log('保存了新用户的token:' + response.data.user.token)
                        dispatch({
                            type: Types.USER_LOGIN_SUCCESS,
                            user: response.data.user
                        })
                        callback(true)
                    })
                    .catch((error) => {
                        console.log('创建新用户失败')
                        console.log(error)
                        dispatch({
                            type: Types.USER_LOGIN_FAIL,
                            error: error
                        })
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
            .then((response) => {
                if (response.code === 0) {
                    params.password = RSAencrypt(params.password, response.data.publicKey)
                    params.keyToken = response.data.keyToken

                    url = API.apiLoginUser
                    dataStore.fetchPostData(url, params)
                        .then((response) => {
                            if (response.code === 0) {
                                dispatch({
                                    type: Types.USER_LOGIN_SUCCESS,
                                    user: response.data.user
                                })
                                console.log(1)
                                saveLocalStorageToken(response.data.user.token)
                                console.log(2)
                                callBack(true)
                            } else {
                                console.log(response.code)
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