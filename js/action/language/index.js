import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

const LAN_KEY = 'language_locale'

export function changeLanguage(lan) {
    console.log(1)
    return dispatch => {
        let dataStore = new DataStore()
        console.log(2)
        dataStore.saveData(LAN_KEY, lan)
        console.log(3)
        dispatch({
            type: Types.LANGUAGE_SAVE_SUCCESS,
            language: lan
        })
    }
}

export function loadLanguage(callback) {
    console.log(4)
    return dispatch => {
        let dataStore = new DataStore()
        console.log(5)
        dataStore.fetchLocalData(LAN_KEY)
            .then((response) => {
                console.log(response.data)
                dispatch({
                    type: Types.LANGUAGE_LOAD_SUCCESS,
                    language: response.data
                })
                callback(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}