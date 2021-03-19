import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import './index.less'
import { AtList, AtListItem } from 'taro-ui'

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
                <AtList>
                    <AtListItem
                        title='标题文字'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                    <AtListItem
                        title='标题文字'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                    <AtListItem
                        title='标题文字'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                    <AtListItem
                        title='标题文字'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                    <AtListItem
                        title='标题文字'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                </AtList>
            </View>
        )
    }
}
