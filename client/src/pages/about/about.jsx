import React, { Component } from "react";
import LogoIMG from "../../assets/logoIcon/logo.png";
import { View, Image } from "@tarojs/components";
import "./about.less";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View>
        <Image className="logoImg" src={LogoIMG} />
        <View className="at-article__h1" style={{ textAlign: "center" }}>
          ☄️彗星密码本☄️
        </View>

        <View className="at-article__h2" style={{ marginTop: "64rpx" }}>
          📰应用介绍
        </View>
        <View className="at-article__p">
          首次使用小程序需要输入密钥，密钥是用来加密、解密用户数据的，为保证数据安全，数据库中只存储加密过后的密码，
          如果密钥遗失，所有密码都无法解析。
        </View>

        <View className="at-article__h2" style={{ marginTop: "64rpx" }}>
          💬开发者言
        </View>
        <View className="at-article__p">
          这是个用来折腾的仓库，是将各种技术和想法落到实处的媒介，如果有任何意见或建议，欢迎交流。
        </View>
        <View className="at-article__p">邮箱:a2944938071@163.com</View>
      </View>
    );
  }
}
