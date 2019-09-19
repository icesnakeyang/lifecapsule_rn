const host = 'http://192.168.1.247:8088'
export const API = {
    apiGetRSAKey: `${host}/security/requestRSAPublicKey`,
    apiListNote:`${host}/note/listNoteByUserToken`,
    apiGetNoteDetailByNoteId:`${host}/note/getNoteDetailByNoteId`,
    apiUpdateNote:`${host}/note/updateNote`
}