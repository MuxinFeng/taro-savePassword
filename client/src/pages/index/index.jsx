import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./index.less";
import Spin from "../../components/Spin/index";

class Index extends Component {
  componentDidMount() {
    const key = Taro.getStorageSync("key");
    key === ""
      ? Taro.redirectTo({ url: "/pages/writeKey/writeKey" })
      : Taro.switchTab({ url: "/pages/home/home" });
  }

  render() {
    return <Spin loading={true}></Spin>;
  }
}

export default Index;
