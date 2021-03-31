import Taro from "@tarojs/taro";
const CryptoJS = require("crypto-js"); //引用AES源码js

const uniqueKey = Taro.getStorage("key");
const key = CryptoJS.enc.Utf8.parse(uniqueKey);
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量

//解密
Decrypt = rawData => {
  console.log("解密");
  let encryptedHexStr = CryptoJS.enc.Hex.parse(rawData);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  console.log(decryptedStr.toString());
  return decryptedStr.toString();
};

//加密
Encrypt = dbData => {
  console.log("加密");
  let srcs = CryptoJS.enc.Utf8.parse(dbData);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  console.log(encrypted.ciphertext.toString().toUpperCase());
  return encrypted.ciphertext.toString().toUpperCase();
};

export default {
  Decrypt,
  Encrypt
};
