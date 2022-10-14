import CryptoJS from 'crypto-js';

var key = CryptoJS.enc.Hex.parse("9EC66CE4C109633D65AE88FD7B03B3B72374C40E77FD337EB5BFB0F4BB52411F");
var iv = CryptoJS.enc.Hex.parse("0A010B05040F070917030106080C0D5B");

function encrypData(str: string) {
    var encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function decryptData(str: string) {

    var decrypted = CryptoJS.AES.decrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    var result = CryptoJS.enc.Utf8.stringify(decrypted).toString();
    return JSON.parse(result);
}

export default {
    enc: encrypData,
    dec: decryptData,
};