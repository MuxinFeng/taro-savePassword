const cloud = require("wx-server-sdk");
cloud.init();
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { account, describe, passwordClassify, password } = event;
  try {
    return await db.collection("table-password").add({
      data: {
        _openid: wxContext.OPENID,
        account: account,
        password: password,
        describe: describe,
        passwordClassify: passwordClassify,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
