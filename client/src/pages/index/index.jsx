import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

import Login from "../../components/login/index";

class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  // //退出后5min清除密钥
  // onSaveExitState() {
  //   const exitState = { key: Taro.getStorageSync("key") }; // 需要保存的数据
  //   return {
  //     data: exitState,
  //     expireTimeStamp: Date.now() + 5 * 60 * 1000 // 超时时刻
  //   };
  // }

  render() {
    return (
      <View className="index">
        <Login />
        <button
          onClick={() => {
            Taro.switchTab({ url: "/pages/home/home" });
          }}
        >
          主页
        </button>
        <button
          onClick={() => {
            Taro.navigateTo({ url: "/pages/writeKey/writeKey" });
          }}
        >
          填写key
        </button>
      </View>
    );
  }
}

export default Index;
