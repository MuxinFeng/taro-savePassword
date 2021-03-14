import React, { Component } from "react";
import Taro from "@tarojs/taro";

import "./app.less";
import index from "./pages/index/index";

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init();
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    // return this.props.children;
    return <Index />;
  }
}

export default App;
