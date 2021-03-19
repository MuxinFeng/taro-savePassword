import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.less'
import { AtButton, AtGrid, AtSearchBar, AtFab } from 'taro-ui'

import PasswordCard from '../../components/PasswordCard/index'

const data = [
  {
    name: 'taobao',
    account: '123',
    password: '123'
  },
  {
    name: 'taobao',
    account: '123',
    password: '123'
  },
  {
    name: 'taobao',
    account: '123',
    password: '123'
  },
  {
    name: 'taobao',
    account: '123',
    password: '123'
  },
]

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.searchValue}
          onChange={(value) => {
            this.setState({
              searchValue: value
            })
            console.log(value)
          }}
        />
        <View>
          密码分类
        </View>
        <AtGrid data={
          [
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
              value: '领取中心'
            },
            {
              image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
              value: '找折扣'
            },
            {
              image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
              value: '领会员'
            },
            {
              image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
              value: '新品首发'
            },
            {
              image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
              value: '领京豆'
            },
            {
              image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
              value: '手机馆'
            }
          ]
        } />
        <View>
          常用密码
        </View>
        {/* <AtFab>
          <Text className='at-fab__icon at-icon at-icon-menu'>+</Text>
        </AtFab> */}
        {data.map(item => {
          return (
            <PasswordCard data={data}></PasswordCard>
          )
        })}
      </View>
    )
  }
}
