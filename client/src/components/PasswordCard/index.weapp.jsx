import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtCard, AtIcon, AtDivider, AtAvatar, AtModal } from "taro-ui";
import "./index.less";
import IMG from "../../assets/toBarIcon/home.png";

const db = Taro.cloud.database();

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      isPasswordVisible: true,
      copied: false,
      copyValue: "123",
      confirmDeleteModal: false //是否确认删除
    };
  }

  //阻止事件冒泡
  preventBubble = e => {
    window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
  };

  //删除密码
  handleDelete = data => {
    Taro.showModal({
      title: "提示",
      cancelText: "我再想想",
      confirmText: "确认删除",
      content: "请确认删除？",
      confirmColor: "#e64340",
      success: res => {
        if (res.confirm) {
          db.collection("table-password")
            .where({
              _id: data._id
            })
            .remove()
            .then(res => {
              this.props.getPassword();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    });
  };

  //复制密码
  handleCopy = data => {
    Taro.setClipboardData({
      data: data.password
    });
  };

  render() {
    const { data } = this.props;
    const { isPasswordVisible, confirmDeleteModal } = this.state;
    return (
      <View className="index">
        <View className="passwordCard">
          <View className="cardImg">
            <AtAvatar circle size="small" image={IMG}></AtAvatar>
          </View>
          <View className="cardContent">
            <View className="upCardContent">
              <View className="bigFont">名称: {data.describe}</View>
              <View className="upCardContentIcon">
                {isPasswordVisible ? (
                  <View
                    className="fa fa-eye"
                    onClick={e => {
                      this.preventBubble(e);
                      this.setState({ isPasswordVisible: false });
                    }}
                  ></View>
                ) : (
                  <View
                    className="fa fa-eyeTrash"
                    onClick={e => {
                      this.preventBubble(e);
                      this.setState({ isPasswordVisible: true });
                    }}
                  ></View>
                )}
                <View
                  className="fa fa-trash"
                  onClick={e => {
                    this.preventBubble(e);
                    this.handleDelete(data);
                  }}
                ></View>
                <View
                  id={`${data.password}123`}
                  className="fa fa-copy"
                  onClick={e => {
                    this.preventBubble(e);
                    this.handleCopy(data);
                  }}
                ></View>
              </View>
            </View>
            <hr />
            <View className="downCardContent">
              <View className="smallFont">账号:{data.account}</View>
              <View className="smallFont">
                密码:{isPasswordVisible ? data.password : "********"}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
