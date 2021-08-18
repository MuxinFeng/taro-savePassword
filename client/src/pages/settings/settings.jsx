import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtModal, AtToast, AtDivider } from "taro-ui";
import Taro from "@tarojs/taro";
import "./settings.less";

export default class Index extends Component {
  constructor() {
    super();
    this.tempFileURL = ""; //下载链接
    this.state = {
      searchValue: "",
      isExportExcelModalOpen: false,
      isClearAllDataModalOpen: false,
      hasClearAllData: false, //控制toast，正在清除数据
      failForesee: false, //控制toast，预览失败
      loading: false //控制toast，正在加载
    };
  }

  /**
   * 准备导出文件，由于处理过程较长，所以在打开模态框的同时就开始准备待下载的文件
   */
  prepareExport = () => {
    Taro.cloud.init();
    Taro.cloud
      .callFunction({
        name: "handleExportData",
        data: { key: Taro.getStorageSync("key") }
      })
      .then(res => {
        this.tempFileURL = res.result.fileList[0].tempFileURL;
      });
  };

  /**
   * 导出所有密码,将下载链接放到剪切板
   * @returns  void
   */
  handleExportExcel = () => {
    Taro.setClipboardData({
      data: this.tempFileURL
    });
    this.handleCloseAllModal();
  };

  /**
   * 预览密码文件
   * @returns  void
   */
  handleForesee = async () => {
    this.setState({
      loading: true
    });
    await Taro.downloadFile({
      url: this.tempFileURL,
      success(res) {
        if (res.statusCode === 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success(res) {
              const savedFilePath = res.savedFilePath;
              wx.openDocument({
                filePath: savedFilePath
              });
            }
          });
        }
      }
    }).catch(error => {
      this.setState({});
      console.log(error);
    });
    this.setState({
      loading: false
    });
  };

  /**
   * 清除所有数据
   * @returns void
   */
  handleClearAllData = async () => {
    this.setState({
      loading: true
    });
    Taro.cloud.init();
    await Taro.cloud
      .callFunction({
        name: "handleClearAllData",
        data: {}
      })
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          hasClearAllData: true
        });
      });
    this.handleCloseAllModal();
  };

  /**
   * 关闭所有模态窗
   * @returns void
   */
  handleCloseAllModal = () => {
    this.setState({
      isExportExcelModalOpen: false,
      isClearAllDataModalOpen: false,
      loading: false
    });
  };

  render() {
    const {
      isExportExcelModalOpen,
      isClearAllDataModalOpen,
      hasClearAllData,
      loading,
      failForesee
    } = this.state;
    return (
      <View className="index">
        <View className="userInfo">
          <open-data type="userAvatarUrl" className="avatar"></open-data>
          <open-data type="userNickName" className="userName"></open-data>
        </View>
        <View style={{ backgroundColor: "#F7F7F7", height: "16rpx" }}></View>
        <AtList>
          <AtListItem
            title="安全设置"
            arrow="right"
            thumb="cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/safeSettings.png"
            onClick={() => {
              Taro.navigateTo({ url: "/pages/safeSettings/safeSettings" });
            }}
          />
          <AtListItem
            title="导出数据"
            arrow="right"
            thumb="cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/export.png"
            onClick={() => {
              this.prepareExport();
              this.setState({
                isExportExcelModalOpen: true
              });
            }}
          />
          <AtListItem
            title="清空数据"
            arrow="right"
            thumb="cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/clear.png"
            onClick={() => {
              this.setState({
                isClearAllDataModalOpen: true
              });
            }}
          />
          <AtListItem
            title="关于我们"
            arrow="right"
            thumb="cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/about.png"
            onClick={() => {
              Taro.navigateTo({ url: "/pages/about/about" });
            }}
          />
        </AtList>
        <AtModal
          isOpened={isExportExcelModalOpen}
          title="提示"
          cancelText="预览"
          confirmText="下载"
          onClose={this.handleCloseAllModal}
          onCancel={this.handleForesee}
          onConfirm={this.handleExportExcel}
          content="由于无法在小程序内直接下载文件，如果您同意，系统会将下载链接放在您的剪贴板，打开浏览器即可下载"
        />
        <AtModal
          isOpened={isClearAllDataModalOpen}
          title="提示"
          cancelText="取消"
          confirmText="确认"
          onClose={this.handleCloseAllModal}
          onCancel={this.handleCloseAllModal}
          onConfirm={this.handleClearAllData}
          content="该操作会清除所有个人数据，并且清除的数据后无法恢复"
        />
        <AtToast
          isOpened={loading}
          duration={0}
          text="加载中"
          status={"loading"}
        />
        <AtToast
          isOpened={hasClearAllData}
          text="数据已清除"
          duration={1500}
          icon="check"
          onClose={() => {
            this.setState({ hasClearAllData: false });
          }}
        />
        <AtToast
          isOpened={failForesee}
          text="预览失败"
          duration={1500}
          icon="close"
          onClose={() => {
            this.setState({ failForesee: false });
          }}
        />
      </View>
    );
  }
}
