import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./writeKey.less";
import { AtInput, AtButton, AtToast } from "taro-ui";
import LogoIMG from "../../assets/logoIcon/logo.png";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      key1: "",
      key2: "",
      showSame: false,
      showDifferent: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  saveKey = () => {
    const { key1, key2 } = this.state;
    if (key1 !== key2) {
      this.setState({ showDifferent: true });
    } else {
      Taro.setStorageSync("key", key1);
      console.log(key1);
    }
    // this.setState({ showDifferent: false });
  };

  render() {
    const { key1, key2, showDifferent, showSame } = this.state;
    return (
      <View className="index">
        <Image className="logoImg" src={LogoIMG} />
        <AtInput
          name="key1"
          title="密钥"
          type="password"
          placeholder="输入密钥"
          value={key1}
          onChange={value => {
            this.setState({ key1: value });
          }}
        />
        <AtInput
          name="key2"
          title="确认密钥"
          type="password"
          placeholder="再次输入密钥"
          value={key2}
          onChange={value => {
            this.setState({ key2: value });
          }}
        />
        <AtButton
          circle={true}
          type="primary"
          onClick={() => {
            this.saveKey();
          }}
        >
          确认密钥
        </AtButton>
        <AtToast
          isOpened={showDifferent}
          text="两次输入的密钥不同"
          icon="close"
        ></AtToast>
        <AtToast isOpened={showSame} text="保存成功" icon="check"></AtToast>
      </View>
    );
  }
}
