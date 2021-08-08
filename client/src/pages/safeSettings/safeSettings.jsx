import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";

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
            title="修改密钥"
            note="重新设置用来加密密码的密钥"
            arrow="right"
            onClick={() => {
              Taro.navigateTo({ url: "/pages/writeKey/writeKey" });
            }}
          />
          <AtListItem
            title="页面禁止截屏"
            note="禁止对彗星密码本的所有页面截屏"
            isSwitch
          />
          <AtListItem
            title="进入后台立即清除密钥"
            note="每次打开应用需要重新输入密钥"
            isSwitch
          />
        </AtList>
      </View>
    );
  }
}
