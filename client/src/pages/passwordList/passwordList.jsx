import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { getCurrentInstance } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./passwordList.less";
import { Decrypt } from "../../utils/util";
import PasswordCard from "../../components/PasswordCard/index";
import noData from "../../assets/logoIcon/noData.png";

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
    if (getCurrentInstance().router.params.classify !== undefined) {
      this.getPasswordList();
    } else if (getCurrentInstance().router.params.search !== undefined) {
      this.getSearchList();
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  //根据分类展示密码
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

  //根据关键字检索密码
  getSearchList = () => {
    const { context } = this.state;
    const db = Taro.cloud.database();
    const _ = db.command;
    db.collection("table-password")
      .where(
        _.or([
          {
            _openid: context._openid,
            account: {
              $regex: ".*" + getCurrentInstance().router.params.search + ".*",
              $options: "i"
            }
          },
          {
            _openid: context._openid,
            describe: {
              $regex: ".*" + getCurrentInstance().router.params.search + ".*",
              $options: "i"
            }
          },
          {
            _openid: context._openid,
            password: {
              $regex: ".*" + getCurrentInstance().router.params.search + ".*",
              $options: "i"
            }
          },
          {
            _openid: context._openid,
            passwordClassify: {
              $regex: ".*" + getCurrentInstance().router.params.search + ".*",
              $options: "i"
            }
          }
        ])
      )
      .get()
      .then(res => {
        console.log(res);
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
        {passwordList.length === 0 ? (
          <>
            <Image className="noDataImg" src={noData} />
          </>
        ) : (
          <>
            {passwordList.map(item => {
              return <PasswordCard data={item}></PasswordCard>;
            })}
          </>
        )}
      </View>
    );
  }
}
