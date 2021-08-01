import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    };
  }

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
