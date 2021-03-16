import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'


import Login from '../../components/login/index'

class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  // keyi 
  render() {
    return (
      <View className='index'>
        <Login />
        <button onClick={() => { Taro.switchTab({ url: '/pages/home/home' }) }}>tiao</button>

      </View>
    )
  }
}

export default Index