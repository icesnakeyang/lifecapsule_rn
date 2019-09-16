const host = 'http://localhost:8088'
export const API = {
    apiGetRSAKey: `${host}/security/requestRSAPublicKey`,
    apiListNote:`${host}/note/listNoteByUserToken`,
    apiGetNoteDetailByNoteId:`${host}/note/getNoteDetailByNoteId`
}