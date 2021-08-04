// 云函数入口文件
const cloud = require("wx-server-sdk");
const Base = require("base-coding");
const xlsx = require("node-xlsx");
const AES = require("./aes");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();

  //1. 数据解密函数
  //以下是解密数据用到的参数
  const userkey = event.key; //取缓存的key
  const uniqueKey = Base.Base16.encode(userkey); //用户自己的密钥，转化为16进制
  const iv = AES.CryptoJS.enc.Utf8.parse("123456789abcdefe");

  /**
   * 对16进制密钥进行长度检测，要确保满足16位
   * @param {String} uniqueKey 用户key转换为16进制后的结果
   * @returns {String} 16位的16进制数
   */
  handleKey = (uniqueKey) => {
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
   * 对云端获取的密码数据进行解密
   * @param {String} dbData
   * @return {String} 返回用户存储的原始密码数据
   */
  Decrypt = (dbData) => {
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
  //2. 查询用户数据
  let result;
  await db
    .collection("table-password")
    .where({
      _openid: wxContext.OPENID,
    })
    .get()
    .then((res) => {
      result = res.data.map((item) => {
        return { ...item, password: Decrypt(item.password) };
      });
    })
    .catch((error) => {
      console.log(error);
    });

  //3. 导出excel
  let excelname = "彗星密码本.xlsx";
  let excelOption = [];
  let head = ["名称", "账号", "密码"];
  excelOption.push(head);
  result.map((item) => {
    excelOption.push([item.describe, item.account, item.password]);
  });
  let buffer = await xlsx.build([
    {
      name: excelname,
      data: excelOption,
    },
  ]);

  //4，把excel文件保存到云端，然后下载
  const cloudFileUrl = await cloud.uploadFile({
    cloudPath: excelname,
    fileContent: buffer,
  });
  const loaclFileUrl = await cloud.getTempFileURL({
    fileList: [{ fileID: cloudFileUrl.fileID, maxAge: 60 * 60 }],
  });
  return loaclFileUrl;
};
