import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.less'
import { AtButton, AtGrid, AtSearchBar, AtFab } from 'taro-ui'

import PasswordCard from '../../components/PasswordCard/index'
import IMG1 from '../../assets/toBarIcon/home.png'

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
        <View className="titleStyle">
          密码分类
        </View>
        <AtGrid data={
          [
            {
              image: 'cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/APP.png',
              value: 'APP'
            },
            {
              image: 'cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/study.png',
              value: '学习'
            },
            {
              image: 'cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/game.png',
              value: '游戏'
            },
            {
              image: 'cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/work.png',
              value: '工作'
            },
            {
              image: 'cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/lifeService.png',
              value: '生活'
            },
            {
              image: 'cloud://huixing-database-4fdkxs57829ce87.6875-huixing-database-4fdkxs57829ce87-1305276273/others.png',
              value: '其它'
            }
          ]
        } />
        <View className="titleStyle">
          常用密码
        </View>
        {data.map(item => {
          return (
            <PasswordCard data={data}></PasswordCard>
          )
        })}
      </View>
    )
  }
}
