import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

// const KEY = CryptoJS.enc.Base64.parse("4525ba31a83e0b3a19ba2cbbafecf679de87dda749766b4e911e2d4cc7d25032")
// const KEY = CryptoJS.enc.Base64.parse("ZGIyMTM5NTYxYzlmZTA2OA==")
// const KEY = CryptoJS.enc.Base64.parse("icesnakeyang")
// const IV = CryptoJS.enc.Base64.parse("icesnakeyang")

export function Encrypt(word, keyStr, ivStr) {
    let key
    let iv

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr)
        iv = CryptoJS.enc.Utf8.parse(ivStr)
    }


    var encrypted = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    let ciphertext = encrypted.ciphertext.toString()
    return ciphertext
}

export function Decrypt(cipherText, keyStr, ivStr) {
    let cipherTextHexStr = CryptoJS.enc.Hex.parse(cipherText)
    let cipherTextBase64Str = CryptoJS.enc.Base64.stringify(cipherTextHexStr)
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let iv = CryptoJS.enc.Utf8.parse(ivStr)
    let decrypt = CryptoJS.AES.decrypt(cipherTextBase64Str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr
}

export function DecryptAES(words, keyStr) {
    // // let encrypted1 = CryptoJS.enc.Base64.parse(encrypted);
    // let decrypted = CryptoJS.AES.decrypt(words, CryptoJS.enc.Utf8.parse(keyStr), {
    //   iv: CryptoJS.enc.Utf8.parse(keyStr),
    //   mode: CryptoJS.mode.CBC,
    //   padding: CryptoJS.pad.NoPadding
    // });
    // decrypted = CryptoJS.enc.Utf8.stringify(decrypted);// 转换为 utf8 字符串
    // // decrypted = CryptoJS.enc.Base64.stringify(decrypted)
    // return decrypted

    let decrypted = CryptoJS.AES.decrypt(words, CryptoJS.enc.Base64.parse(keyStr), {
        iv: CryptoJS.enc.Base64.parse(keyStr),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.NoPadding
    })
    decrypted = CryptoJS.enc.Base64.stringify(decrypted)
    return decrypted

}

export function GenerateKey() {
    const uuidstr = (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5)
    return uuidstr
}

export function GenerateRandomString16() {
    let x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    let tmp = "";
    let timestamp = new Date().getTime();
    for (let i = 0; i < 16; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    // return timestamp + tmp;
    return tmp;
}


//加密方法
export function RSAencrypt(content, publicKey) {
    //实例化jsEncrypt对象
    let jse = new JSEncrypt();
    //设置公钥
    jse.setPublicKey(publicKey);

    const result = jse.encrypt(content);
    return result
}

//解密方法
export function RSAdecrypt(content, privateKey) {
    let jse = new JSEncrypt();
    // 私钥
    jse.setPrivateKey(privateKey)
    return jse.decrypt(content);
}

export function Decrypt2(word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr)

    let decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })

    return CryptoJS.enc.Utf8.stringify(decrypt).toString()

}
