import * as aes from "aes-js";
import CryptoJS from 'crypto-js'

export default class EncodeUtil {
    static encryption(data) {
        let strs = [];
        for (let i in data) {
            strs.push(i + '=' + data[i]);
        }
        strs.sort();  // 数组排序
        strs = strs.join('&'); // 数组变字符串
        let endData = strs + '&sign=' + CryptoJS.MD5(strs + 'ADfj3kcadc2349akvm1CPFFCD84f')
            .toString(); // MD5加密
        let key = CryptoJS.enc.Utf8.parse("0880076B18D7EE81"); // 加密秘钥
        let iv = CryptoJS.enc.Utf8.parse("CB3EC842D7C69578");  //  矢量
        let encryptResult = CryptoJS.AES.encrypt(endData, key, {   //  AES加密
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7  // 后台用的是pad.Pkcs5,前台对应为Pkcs7
        });
        return encodeURIComponent(CryptoJS.enc.Base64.stringify(encryptResult.ciphertext));  // Base64加密再 encode;
    }

    static decryption(data) {
        let key = CryptoJS.enc.Utf8.parse("0880076B18D7EE81");  // 加密秘钥
        let iv = CryptoJS.enc.Utf8.parse("CB3EC842D7C69578");   //  矢量
        let baseResult = CryptoJS.enc.Base64.parse(data);   // Base64解密
        let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
        let decryptResult = CryptoJS.AES.decrypt(ciphertext, key, {    //  AES解密
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();

        return resData
        // return JSON.parse(resData);

    }

    static AESEncrypt(text, _key, _iv) {
        console.log(1)
        let textBytes = aes.utils.utf8.toBytes(text)
        console.log(2)
        console.log(textBytes)
        console.log(_key / 16)
        if (_key / 16 !== 0) {
            console.log('key error')
        }
        let aesOfb = new aes.ModeOfOperation.ofb(_key, _iv)
        console.log(3)
        let encryptedBytes = aesOfb.encrypt(textBytes)
        console.log(4)
        const aesText = aes.utils.hex.fromBytes(encryptedBytes)
        console.log(5)
        return aesText
    }

    static AESDecrypt(text, _key, _iv) {
        let encryptedBytes = aes.utils.hex.toBytes(text)
        let aesOfb = new aes.ModeOfOperation.ofb(_key, _iv)
        let decryptedBytes = aesOfb.decrypt(encryptedBytes)
        return aes.utils.utf8.fromBytes(decryptedBytes)
    }
}