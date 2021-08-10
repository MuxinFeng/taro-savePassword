import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./writeKey.less";
import { AtInput, AtButton, AtToast, AtModal } from "taro-ui";
import LogoIMG from "../../assets/logoIcon/logo.png";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      key1: "",
      key2: "",
      showSame: false,
      showDifferent: false,
      isDescribeModalOpen: false
    };
  }

  /**
   * 保存密钥
   */
  saveKey = () => {
    const { key1, key2 } = this.state;
    if (key1 !== key2) {
      this.setState({ showDifferent: true });
    } else {
      this.setState({ showSame: true });
      Taro.setStorageSync("key", key1);
      setTimeout(() => {
        Taro.switchTab({
          url: "/pages/home/home"
        });
      }, 1200);
    }
  };

  /**
   * 关闭所有模态窗
   */
  closeAllModal = () => {
    this.setState({
      isDescribeModalOpen: false
    });
  };

  render() {
    const {
      key1,
      key2,
      showDifferent,
      showSame,
      isDescribeModalOpen
    } = this.state;
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
            this.setState({
              key1: value,
              showDifferent: false,
              showSame: false
            });
          }}
        />
        <AtInput
          name="key2"
          title="确认密钥"
          type="password"
          placeholder="再次输入密钥"
          value={key2}
          onChange={value => {
            this.setState({
              key2: value,
              showDifferent: false,
              showSame: false
            });
          }}
        />
        <AtButton
          className="button-style"
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
          duration="1000"
          text="两次输入的密钥不同"
          icon="close"
        ></AtToast>
        <AtToast
          isOpened={showSame}
          duration="1000"
          text="保存成功"
          icon="check"
        ></AtToast>

        <View
          className="text-style"
          onClick={() => {
            this.setState({
              isDescribeModalOpen: true
            });
          }}
        >
          什么是密钥
        </View>
        <AtModal
          isOpened={isDescribeModalOpen}
          title="什么是密钥"
          cancelText="取消"
          confirmText="确认"
          onClose={this.closeAllModal}
          onCancel={this.closeAllModal}
          onConfirm={this.closeAllModal}
          content="密钥是用来加密、解密用户数据的，为保证数据安全，数据库中只存储加密过后的密码，
          如果密钥遗失，所有密码都无法解析。"
        />
      </View>
    );
  }
}
