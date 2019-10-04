import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

const LAN_KEY = 'language_locale'

export function changeLanguage(lan) {
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.saveData(LAN_KEY, lan)
        dispatch({
            type: Types.LANGUAGE_SAVE_SUCCESS,
            language: lan
        })
    }
}

export function loadLanguage(callback) {
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData(LAN_KEY)
            .then((response) => {
                dispatch({
                    type: Types.LANGUAGE_LOAD_SUCCESS,
                    language: response.data
                })
                callback(response.data)
            })
            .catch((error) => {
            })
    }
}