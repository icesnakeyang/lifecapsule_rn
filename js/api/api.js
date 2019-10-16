// const host = 'http://192.168.1.247:8088'
// const host = 'http://192.168.0.105:8088'
// const host = 'http://gogorpg.com:8088'
const host = 'http://192.168.43.29:8088'
// const host = 'http://192.168.1.100:8088'
// const host = 'http://10.10.7.162:8088'

export const API = {
    apiGetRSAKey: `${host}/security/requestRSAPublicKey`,
    apiListNote: `${host}/note/listNoteByUserToken`,
    apiListNoteByCategory: `${host}/note/listNoteByCategory`,
    apiGetNoteDetailByNoteId: `${host}/note/getNoteDetailByNoteId`,
    apiUpdateNote: `${host}/note/updateNote`,
    apiListCategory: `${host}/category/listCategory`,
    apiGetCategory: `${host}/category/getCategory`,
    apiUpdateCategory: `${host}/category/updateCategory`,
    apiCreateCategory: `${host}/category/createCategory`,
    apiCreateNote: `${host}/note/createNote`,
    apiCreateNewUser: `${host}/user/createNewUser`,
    apiResignUserToken: `${host}/user/resignUserToken`,
    apiLoginBlankUser: `${host}/user/loginBlankUser`,
    apiLoginUser: `${host}/user/loginUser`,
    apiSaveNickname: `${host}/user/saveNickname`,
    apiListGogoPublicKey: `${host}/admin/gogokey/listGogoPublicKey`,
    apiGetTriggerByNoteId: `${host}/trigger/getTriggerByNoteId`,
    apiGetGogoPublicKey: `${host}/admin/gogokey/getGogoPublicKey`,
    apiSaveGogoKey: `${host}/trigger/saveGogoKey`,
    apiUpdateRecipient: `${host}/trigger/updateRecipient`,
    apiSaveTriggerRemark: `${host}/trigger/saveTriggerRemark`,
    apiSaveRecipient: `${host}/trigger/saveRecipient`,
    apiListRecipientByTriggerId: `${host}/trigger/listRecipientByTriggerId`,
    apiDeleteRecipient: `${host}/trigger/deleteRecipient`,
    apiSaveLoginPassword: `${host}/user/saveLoginPassword`,
    apiBindPhone1: `${host}/user/bindPhone1`
}