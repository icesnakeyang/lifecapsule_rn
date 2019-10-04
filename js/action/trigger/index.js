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
                        type: Types.TRIGGER_LOAD_PUBLICKEY_SUCCESS,
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