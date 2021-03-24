const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const tablePassword = db.collection("table-password");
const wxContext = cloud.getWXContext();

exports.main = async (event, context) => {
  console.log(event);
  console.log(context);
  tablePassword
    .add({
      data: {
        openid: wxContext.OPENID,
        account: event.account,
        password: event.password,
        describe: event.describe,
        passwordClassify: event.passwordClassify,
      },
    })
    .then((res) => {
      console.log(res);
    });
};
