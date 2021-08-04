import Taro from "@tarojs/taro";
import { Base16 } from "base-coding";

const AES = require("./aes");
const userkey = Taro.getStorageSync("key"); //取缓存的key
const uniqueKey = Base16.encode(userkey); //用户自己的密钥，转化为16进制
const iv = AES.CryptoJS.enc.Utf8.parse("123456789abcdefe");

/**
 * 对16进制密钥进行长度检测，要确保满足16位
 * @param {String} uniqueKey
 * @returns {String} 16位的16进制数
 */
const handleKey = (uniqueKey) => {
  if (uniqueKey.length >= 15) {
    return uniqueKey.subString(0, 15);
  } else {
    const count = 15 - uniqueKey.length;
    for (let i = 0; i <= count; i++) {
      uniqueKey = uniqueKey + "1";
    }
    return uniqueKey;
  }
};

/**
 * 对用户密码数据进行加密
 * @param {String} rawData
 * @return {String}  大写的十六进制加密结果
 */
export const Encrypt = (rawData) => {
  const key = AES.CryptoJS.enc.Utf8.parse(handleKey(uniqueKey));
  const srcs = AES.CryptoJS.enc.Utf8.parse(rawData);
  const encrypted = AES.CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: AES.CryptoJS.mode.ECB,
    padding: AES.CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

/**
 * 对云端获取的密码数据进行解密
 * @param {String} dbData
 * @return {String} 返回用户存储的原始密码数据
 */
export const Decrypt = (dbData) => {
  const key = AES.CryptoJS.enc.Utf8.parse(handleKey(uniqueKey));
  const encryptedHexStr = AES.CryptoJS.enc.Hex.parse(dbData);
  const srcs = AES.CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = AES.CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: AES.CryptoJS.mode.ECB,
    padding: AES.CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(AES.CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
