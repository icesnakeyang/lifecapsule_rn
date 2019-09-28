import Types from "../types";
import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";

export function loadCategory(pageIndex, pageSize, token, callback) {
    return dispatch => {
        let url = API.apiListCategory
        let params = {
            pageIndex: pageIndex,
            pageSize: pageSize
        }
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, params, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.CATEGORY_LOAD_SUCCESS,
                        categoryList: response.data
                    })
                    callback(true)
                }
            })
    }
}