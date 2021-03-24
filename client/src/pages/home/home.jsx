import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import "./home.less";
import {
  AtGrid,
  AtSearchBar,
  AtFab,
  AtFloatLayout,
  AtForm,
  AtInput,
  AtAvatar,
  AtList,
  AtListItem,
  AtIcon,
  AtToast
} from "taro-ui";
import PasswordCard from "../../components/PasswordCard/index";

const db = Taro.cloud.database();

const data = [
  {
    name: "taobao",
    account: "123",
    password: "123"
  },
  {
    name: "taobao",
    account: "123",
    password: "123"
  },
  {
    name: "taobao",
    account: "123",
    password: "123"
  },
  {
    name: "taobao",
    account: "123",
    password: "123"
  }
];
const classify = ["APP", "学习", "游戏", "工作", "生活", "其它"];

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
      isAtFloatLayoutOpen: false,
      account: "",
      password: "",
      describe: "",
      passwordClassify: "其它",
      hasAdded: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  addPassWord = async () => {
    const { account, password, describe, passwordClassify } = this.state;
    db.collection("table-password")
      .add({
        data: {
          // openid: wxContext.OPENID,
          account: account,
          password: password,
          describe: describe,
          passwordClassify: passwordClassify
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      isAtFloatLayoutOpen: false,
      hasAdded: true,
      account: "",
      password: "",
      describe: "",
      passwordClassify: "其它"
    });
  };

  render() {
    const {
      isAtFloatLayoutOpen,
      account,
      password,
      describe,
      passwordClassify,
      hasAdded
    } = this.state;
    return (
      <View className="index">
        <AtSearchBar
          value={this.state.searchValue}
          onChange={value => {
            this.setState({
              searchValue: value
            });
            console.log(value);
          }}
        />
        <View className="titleStyle">密码分类</View>
        <AtGrid
          data={[
            {
              image:
                "cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/APP.png",
              value: "APP"
            },
            {
              image:
                "cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/study.png",
              value: "学习"
            },
            {
              image:
                "cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/game.png",
              value: "游戏"
            },
            {
              image:
                "cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/work.png",
              value: "工作"
            },
            {
              image:
                "cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/lifeService.png",
              value: "生活"
            },
            {
              image:
                "cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/others.png",
              value: "其它"
            }
          ]}
        />

        <View className="fixedButton">
          <AtFab
            onClick={() => {
              this.setState({ isAtFloatLayoutOpen: true, hasAdded: false });
              console.log("添加密码");
            }}
          >
            <Text className="fixedButtonText">+</Text>
          </AtFab>
        </View>

        <AtToast isOpened={hasAdded} text="保存成功" icon="check"></AtToast>

        <AtFloatLayout
          isOpened={isAtFloatLayoutOpen}
          onClose={() => {
            this.setState({ isAtFloatLayoutOpen: false, hasAdded: flase });
          }}
        >
          <View className="iconButton">
            <AtIcon
              value="close"
              size="24"
              color="gray"
              onClick={() => {
                this.setState({
                  isAtFloatLayoutOpen: false,
                  hasAdded: false,
                  account: "",
                  password: "",
                  describe: "",
                  passwordClassify: "其它"
                });
              }}
            ></AtIcon>
            <AtIcon
              value="check"
              size="24"
              color="#f38031"
              className="confirmIconButton"
              onClick={() => {
                this.setState({ isAtFloatLayoutOpen: false });

                this.addPassWord();
              }}
            ></AtIcon>
          </View>
          <AtForm>
            <AtInput
              name="describe"
              title="描述"
              type="text"
              placeholder="请输入密码描述"
              value={describe}
              onChange={value => {
                this.setState({ describe: value });
              }}
            />
            <AtInput
              name="account"
              title="账号"
              type="text"
              placeholder="请输入账号/用户名/卡号"
              value={account}
              onChange={value => {
                this.setState({ account: value });
              }}
            />
            <AtInput
              name="password"
              title="密码"
              type="text"
              placeholder="请输入密码"
              value={password}
              onChange={value => {
                this.setState({ password: value });
              }}
            />
            <Picker
              mode="selector"
              range={classify}
              onChange={event => {
                this.setState({
                  passwordClassify: classify[event.detail.value]
                });
              }}
            >
              <AtList>
                <AtListItem title="密码分类" extraText={passwordClassify} />
              </AtList>
            </Picker>
            {/* <View className="formIconButton">
              <AtAvatar
                circle
                size="normal"
                image="https://jdc.jd.com/img/200"
              ></AtAvatar>
              <AtAvatar
                circle
                size="normal"
                image="https://jdc.jd.com/img/200"
              ></AtAvatar>
            </View> */}
          </AtForm>
        </AtFloatLayout>

        <View className="titleStyle">常用密码</View>
        {data.map(item => {
          return <PasswordCard data={data}></PasswordCard>;
        })}
      </View>
    );
  }
}
