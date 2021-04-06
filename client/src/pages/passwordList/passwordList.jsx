import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { getCurrentInstance } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./passwordList.less";
import { Encrypt, Decrypt } from "../../utils/handlePassword";
import PasswordCard from "../../components/PasswordCard/index";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      classify: "",
      passwordList: [],
      context: {}
    };
  }

  componentWillMount() {}

  componentDidMount() {
    Taro.cloud.init();
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        this.setState({
          context: res.result
        });
      });
    this.getPasswordList();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getPasswordList = () => {
    const { context } = this.state;
    const db = Taro.cloud.database();
    db.collection("table-password")
      .where({
        _openid: context._openid,
        passwordClassify: getCurrentInstance().router.params.classify
      })
      .get()
      .then(res => {
        const passwordList = res.data.map(item => {
          return { ...item, password: Decrypt(item.password) };
        });
        this.setState({
          passwordList: passwordList
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { passwordList } = this.state;
    return (
      <View className="index">
        {passwordList.map(item => {
          return <PasswordCard data={item}></PasswordCard>;
        })}
      </View>
    );
  }
}
