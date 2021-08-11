import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Picker, Button, Image } from "@tarojs/components";
import "./home.less";
import {
  AtGrid,
  AtSearchBar,
  AtFab,
  AtFloatLayout,
  AtForm,
  AtInput,
  AtList,
  AtListItem,
  AtIcon,
  AtToast
} from "taro-ui";
import PasswordCard from "../../components/PasswordCard/index";
import { Encrypt, Decrypt } from "../../utils/util";
import { handleSearch } from "../../model/api";
import noData from "../../assets/logoIcon/noData.png";

const db = Taro.cloud.database();
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
      hasAdded: false,
      hasNullData: false,
      context: {},
      passwordList: [],
      modifyStatus: false, //正在修改密码，区别于添加状态
      modifyData: {}, //待修改的密码
      loading: false
    };
  }

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
    this.getPassword();
  }

  onPullDownRefresh = async () => {
    this.setState({
      loading: true
    });
    await this.getPassword();
    this.setState({
      loading: false
    });
    Taro.stopPullDownRefresh();
  };

  //添加密码
  addPassWord = async () => {
    const {
      account,
      password,
      describe,
      passwordClassify,
      modifyStatus,
      modifyData
    } = this.state;
    if (account == "" || password == "") {
      this.setState({ hasNullData: true });
    } else {
      this.setState({
        loading: true
      });
      if (modifyStatus) {
        db.collection("table-password")
          .where({
            _id: modifyData._id
          })
          .update({
            data: {
              account: account,
              password: Encrypt(password),
              describe: describe,
              passwordClassify: passwordClassify
            }
          })
          .then(res => {
            this.getPassword();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        Taro.cloud.init();
        Taro.cloud
          .callFunction({
            name: "addData",
            data: {
              account: account,
              password: Encrypt(password),
              describe: describe,
              passwordClassify: passwordClassify
            }
          })
          .then(res => {
            this.getPassword();
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.setState({
        loading: false,
        isAtFloatLayoutOpen: false,
        hasAdded: true,
        account: "",
        password: "",
        describe: "",
        passwordClassify: "其它",
        modifyStatus: false
      });
    }
  };

  //获取密码
  getPassword = async () => {
    const res = await handleSearch("", "");
    const passwordList = res.data.map(item => {
      return { ...item, password: Decrypt(item.password) };
    });
    this.setState({
      passwordList: passwordList
    });
  };

  //分类获取密码
  getClassifyPassword = (item, index) => {
    Taro.navigateTo({
      url: `/pages/passwordList/passwordList?classify=${item.value}`
    });
  };

  //查询密码
  getSearchData = () => {
    Taro.navigateTo({
      url: `/pages/passwordList/passwordList?search=${this.state.searchValue}`
    });
  };

  render() {
    const {
      isAtFloatLayoutOpen,
      account,
      password,
      describe,
      passwordClassify,
      hasAdded,
      hasNullData,
      passwordList,
      loading
    } = this.state;
    return (
      <View className="index">
        <AtSearchBar
          style={{ zIndex: "2" }}
          value={this.state.searchValue}
          onChange={value => {
            this.setState({
              searchValue: value
            });
          }}
          onActionClick={() => {
            this.getSearchData();
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
          onClick={(item, index) => {
            this.getClassifyPassword(item, index);
          }}
        />

        <View className="fixedButton">
          <AtFab
            onClick={() => {
              this.setState({
                isAtFloatLayoutOpen: true,
                hasAdded: false,
                hasNullData: false
              });
            }}
          >
            <Text className="fixedButtonText">+</Text>
          </AtFab>
        </View>

        <AtToast
          duration="1000"
          isOpened={hasAdded}
          text="保存成功"
          icon="check"
          onClose={() => {
            this.setState({
              hasAdded: false
            });
          }}
        ></AtToast>
        <AtToast
          duration="1000"
          isOpened={hasNullData}
          text="信息填写不完整"
          icon="close"
          onClose={() => {
            this.setState({
              hasNullData: false
            });
          }}
        ></AtToast>
        <AtToast
          isOpened={loading}
          duration={0}
          text="加载中"
          status={"loading"}
        ></AtToast>

        <AtFloatLayout
          isOpened={isAtFloatLayoutOpen}
          onClose={() => {
            this.setState({
              isAtFloatLayoutOpen: false,
              hasAdded: false,
              hasNullData: false,
              modifyStatus: false
            });
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
                  passwordClassify: "其它",
                  modifyStatus: false
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
          </AtForm>
        </AtFloatLayout>

        <View className="titleStyle">常用密码</View>
        {passwordList.length === 0 ? (
          <>
            <Image className="noDataImg" src={noData} />
          </>
        ) : (
          <>
            {passwordList.map(item => {
              return (
                <View
                  onClick={() => {
                    this.setState({
                      modifyStatus: true,
                      modifyData: item,
                      isAtFloatLayoutOpen: true,
                      hasAdded: false,
                      hasNullData: false,
                      account: item.account,
                      password: item.password,
                      describe: item.describe,
                      passwordClassify: item.passwordClassify
                    });
                  }}
                >
                  <PasswordCard
                    data={item}
                    getPassword={this.getPassword}
                  ></PasswordCard>
                </View>
              );
            })}
          </>
        )}
      </View>
    );
  }
}
