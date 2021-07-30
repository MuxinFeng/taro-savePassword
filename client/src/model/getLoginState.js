import React, { Component } from "react";
import Taro from "@tarojs/taro";

export const getLoginState = () => {
  Taro.cloud
    .callFunction({
      name: "login",
      data: {}
    })
    .then(res => {
      console.log("获取登录状态", res.result);
      return res.result;
    });
};
