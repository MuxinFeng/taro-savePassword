import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtCard, AtIcon, AtDivider, AtAvatar } from 'taro-ui'
import './index.less'
import IMG from '../../assets/toBarIcon/home.png'

export default class Index extends Component {

    state = {

        context: {}
    }



    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const { data } = this.props;
        return (
            <View className='index'>
                {data.map(item => {
                    return (
                        <View className="passwordCard">
                            <View className="cardImg">
                                <AtAvatar circle size='small' image={IMG}></AtAvatar>
                            </View>
                            <View className="cardContent">
                                <View className="upCardContent">
                                    <View className="bigFont">名称: {item.name}

                                    </View>
                                    <View className="upCardContentIcon">
                                        <AtIcon value='money' size='20' color='gray'></AtIcon>
                                        <AtIcon value='eye' size='20' color='gray'></AtIcon>
                                        <AtIcon value='trash' size='20' color='gray'></AtIcon>
                                    </View>
                                </View>
                                <hr />
                                <View className="downCardContent">
                                    <View className="smallFont">账号:{item.account}</View>
                                    <View className="smallFont">密码:{item.password}</View>
                                </View>
                            </View>
                        </View>
                    )
                })}

            </View>
        )
    }
}
