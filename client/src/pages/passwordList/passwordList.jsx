import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
// import './index.less'
import { AtList, AtListItem } from "taro-ui";
import IMG from "../../assets/toBarIcon/home.png";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <AtList>
          <AtListItem
            title="安全设置"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "settings" }}
          />
          <AtListItem
            title="导出数据"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "download" }}
          />
          <AtListItem
            title="清空数据与还原"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "folder" }}
          />
          <AtListItem
            title="关于我们"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "iphone" }}
          />
        </AtList>
      </View>
    );
  }
}
