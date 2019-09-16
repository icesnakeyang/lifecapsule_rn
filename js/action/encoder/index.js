import Types from "../types";
import DataStore from "../../expand/dao/DataStore";
import {API} from "../../api/api";


export function getRSA() {
    const url = API.apiGetRSAKey
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.fetchNetData(url)
            .then((data) => {
                dispatch({
                    type: Types.RSA_GET_SUCCESS,
                    RSA:data.data
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: Types.RSA_GET_FAIL,
                    error
                })
            })
    }
}
