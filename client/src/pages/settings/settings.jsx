import React, { Component } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtModal, message } from "taro-ui";
import Taro from "@tarojs/taro";
import { handleSearch } from "../../model/api";
import { Decrypt } from "../../utils/util";

export default class Index extends Component {
  constructor() {
    super();
    this.tempFileURL = ""; //下载链接
    this.state = {
      searchValue: "",
      isExportExcelModalOpen: false
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
  handleForesee = () => {
    Taro.downloadFile({
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
    });
  };

  /**
   * 关闭所有模态窗
   * @returns void
   */
  handleCloseAllModal = () => {
    this.setState({
      isExportExcelModalOpen: false
    });
  };

  render() {
    const { isExportExcelModalOpen } = this.state;
    return (
      <View className="index">
        <AtList>
          <AtListItem
            title="安全设置"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "settings" }}
            onClick={() => {
              Taro.navigateTo({ url: "/pages/safeSettings/safeSettings" });
            }}
          />
          <AtListItem
            title="导出数据"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "download" }}
            onClick={() => {
              this.prepareExport();
              this.setState({
                isExportExcelModalOpen: true
              });
            }}
          />
          <AtListItem
            title="清空数据与还原"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "folder" }}
          />
          <AtListItem
            title="关于我们"
            arrow="right"
            iconInfo={{ size: 25, color: "#FF4949", value: "iphone" }}
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
      </View>
    );
  }
}
