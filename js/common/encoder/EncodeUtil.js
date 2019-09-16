import * as aes from "aes-js";

export default class EncodeUtil {
    static AESEncrypt(text, _key, _iv) {
        let textBytes = aes.utils.utf8.toBytes(text)
        let aesOfb = new aes.ModeOfOperation.ofb(_key, _iv)
        let encryptedBytes = aesOfb.encrypt(textBytes)
        return aes.utils.hex.fromBytes(encryptedBytes)
    }

    static AESDecrypt(text, _key, _iv) {
        let encryptedBytes = aes.utils.hex.toBytes(text)
        let aesOfb = new aes.ModeOfOperation.ofb(_key, _iv)
        let decryptedBytes = aesOfb.decrypt(encryptedBytes)
        return aes.utils.utf8.fromBytes(decryptedBytes)
    }
}