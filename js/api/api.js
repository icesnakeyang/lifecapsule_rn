const host = 'http://192.168.1.247:8088'
// const host = 'http://192.168.43.29:8088'
// const host = 'http://192.168.0.104:8088'
export const API = {
    apiGetRSAKey: `${host}/security/requestRSAPublicKey`,
    apiListNote: `${host}/note/listNoteByUserToken`,
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
    apiLoginUser: `${host}/user/loginUser`
}