import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtCard, AtIcon, AtDivider, AtAvatar } from "taro-ui";
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
      copyValue: "123"
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  //删除密码
  handleDelete = data => {
    db.collection("table-password")
      .where({
        _id: data._id
      })
      .remove()
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //复制密码
  handleCopy = data => {
    Taro.setClipboardData({
      data: data.password,
      success(res) {
        Taro.getClipboardData({
          success(res) {
            console.log("复制成功");
          }
        });
      }
    });
  };

  render() {
    const { data } = this.props;
    const { isPasswordVisible } = this.state;
    return (
      <View className="index">
        <View className="passwordCard">
          <View className="cardImg">
            <AtAvatar circle size="small" image={IMG}></AtAvatar>
          </View>
          <View className="cardContent">
            <View className="upCardContent">
              <View className="bigFont">名称: {data.name}</View>
              <View className="upCardContentIcon">
                {isPasswordVisible ? (
                  <View
                    className="fa fa-eye"
                    onClick={() => {
                      this.setState({ isPasswordVisible: false });
                    }}
                  ></View>
                ) : (
                  <View
                    className="fa fa-eyeTrash"
                    onClick={() => {
                      this.setState({ isPasswordVisible: true });
                    }}
                  ></View>
                )}
                <View
                  className="fa fa-trash"
                  onClick={() => {
                    this.handleDelete(data);
                  }}
                ></View>
                <View
                  id={`${data.password}123`}
                  className="fa fa-copy"
                  onClick={() => {
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
