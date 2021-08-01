import React, { Component } from "react";
import { getCurrentInstance } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./passwordList.less";
import { Decrypt } from "../../utils/util";
import { handleSearch } from "../../model/api";
import PasswordCard from "../../components/PasswordCard/index";
import noData from "../../assets/logoIcon/noData.png";
import Spin from "../../components/Spin/index";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      passwordList: [],
      loading: true
    };
  }

  componentWillMount() {}

  componentDidMount() {
    if (getCurrentInstance().router.params.classify !== undefined) {
      this.getPasswordList();
    } else if (getCurrentInstance().router.params.search !== undefined) {
      this.getSearchList();
    }
  }

  //根据分类展示密码
  getPasswordList = async () => {
    const res = await handleSearch(
      getCurrentInstance().router.params.classify,
      ""
    );
    const passwordList = res.data.map(item => {
      return { ...item, password: Decrypt(item.password) };
    });
    this.setState({
      passwordList: passwordList,
      loading: false
    });
  };

  //根据关键字检索密码
  getSearchList = async () => {
    const res = await handleSearch(
      "",
      getCurrentInstance().router.params.search
    );
    const passwordList = res.data.map(item => {
      return { ...item, password: Decrypt(item.password) };
    });
    this.setState({
      passwordList: passwordList,
      loading: false
    });
  };

  render() {
    const { passwordList, loading } = this.state;
    return (
      <View className="index">
        <Spin loading={loading}>
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
        </Spin>
      </View>
    );
  }
}
