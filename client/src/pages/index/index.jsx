import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import Login from '../../components/login/index'
// import Home from '../home/home'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
// keyi 
  render () {
    return (
      <View className='index'>
        {/* <Home/> */}
      <div>
        nihao
      </div>
      </View>
    )
  }
}
