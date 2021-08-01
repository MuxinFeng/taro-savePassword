import Taro from "@tarojs/taro";

const db = Taro.cloud.database();
const _ = db.command;
const context = Taro.getStorageSync("userInfo");

/**
 * 处理搜索密码事件,如果两个参数都为空，则返回所有密码
 * @param {String} classify  根据密码所属种类搜索
 * @param {String} keyWord  根据关键字搜索
 * @return {Array} 返回密码数组
 */
export const handleSearch = async (classify, keyWord) => {
  const searchObj = {};
  searchObj._openid = context !== undefined ? context.openid : "";
  let result;

  //处理模糊搜索
  if (keyWord) {
    await db
      .collection("table-password")
      .where(
        _.or([
          {
            _openid: context.openid,
            account: {
              $regex: ".*" + keyWord + ".*",
              $options: "i"
            }
          },
          {
            _openid: context.openid,
            describe: {
              $regex: ".*" + keyWord + ".*",
              $options: "i"
            }
          },
          {
            _openid: context.openid,
            password: {
              $regex: ".*" + keyWord + ".*",
              $options: "i"
            }
          },
          {
            _openid: context.openid,
            passwordClassify: {
              $regex: ".*" + keyWord + ".*",
              $options: "i"
            }
          }
        ])
      )
      .get()
      .then(res => {
        result = res;
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    //处理分类搜索和无条件搜索
    if (classify) {
      searchObj.passwordClassify = classify;
    }
    await db
      .collection("table-password")
      .where(searchObj)
      .get()
      .then(res => {
        result = res;
      })
      .catch(error => {
        console.log(error);
      });
  }
  return result;
};
