import React, { Component } from "react";
import { View, Image, Text } from "@tarojs/components";
import "./index.less";
import LogoIMG from "../../assets/logoIcon/logo.png";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;
    return (
      <View>
        {loading ? (
          <View>
            <Image className="logoImg" src={LogoIMG} />
            <Text className="textStyle">Loading...</Text>
          </View>
        ) : (
          <View>{this.props.children}</View>
        )}
      </View>
    );
  }
}
