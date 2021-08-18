<h1 style="text-align:center">☄️彗星密码本☄️</h1>

*已选入官方示例仓库[awesom-taro](https://github.com/NervJS/awesome-taro#%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE)*

## 简介
- 功能
    
    彗星密码本是一个的密码存储工具，核心在于密码存取过程中都会根据独特的密钥进行加密，该密钥由使用者设定，并且只存在客户端本地。

- 技术栈
  
  采用Taro和微信云开发结合的方式，前者是因为本人技术栈是React，并且想在此基础上进一步探索，而Taro提供了使用React等框架开发小程序的解决方案；后者是因为云开发是一种简单、低成本的数据交互选择。

    - Taro3
    - Taro-ui@next 
    - 微信云开发2.10.4



## 如何运行
- clone
``` 
git clone https://github.com/MuxinFeng/taro-savePassword.git
```
- 安装依赖
```
cd .\client\

yarn     
```
- 运行
```
cd .\client\

npm run dev:weapp
```
[⬆️ 返回顶部](#简介)
## 代码结构
```
#业务代码

client
├──config  #taro框架的配置信息，如果仅在微信平台运行，可无视此部分
└──src 
|  ├── app.config.js #小程序配置文件，配置页面、导航栏等信息
|  ├── app.js
|  ├── app.less
|  ├── app.scss #项目中用到了特殊的icon，在该文件做引入处理
|  ├── index.html
|  ├── assets #资源文件
|  |  ├── fonts #字体文件
|  |  ├── kindIcon #分类图标
|  |  ├── logoIcon 
|  |  ├── settingsIcon #设置页图标
|  |  └── toBarIcon 
|  ├── components #通用组件
|  |  ├── PasswordCaed #密码卡片
|  |  └── Spin #加载状态
|  ├── model
|  |  └── api.js #数据交互方法封装
|  ├── pages
|  |  ├── about #关于页面
|  |  ├── home #主页（toBar）
|  |  ├── index #初始页
|  |  ├── passwordList #纯展示密码页
|  |  ├── safeSettings #安全设置页
|  |  ├── settings #设置页（toBar）
|  |  └── writeKey #设置密钥页
|  └── utils
|     ├── aes.js #加解密类库，用到了AES
|     └── util.js #通用函数封装

```
[⬆️ 返回顶部](#简介)
## 功能
### 已完成
- [x] 密码的添加、修改、删除
- [x] 密码的关键字搜索、分类查找
- [x] 用户密码数据加密、解密  
- [x] 导出密码文件
- [x] 清空个人数据

### 待完成
- [ ] 用户管理
- [ ] 自定义密钥有效期
- [ ] 程序内禁止截图
- [ ] 自定义密码卡片的avatar

[⬆️ 返回顶部](##简介)

## 效果

![效果图](https://user-images.githubusercontent.com/46584765/129559046-748be938-07d5-42a5-98d7-a0cba6bac076.png)

---

![二维码](https://user-images.githubusercontent.com/46584765/129651481-30d17dea-4d58-4b52-b9fe-4903e91b7546.png)

[⬆️ 返回顶部](#简介)

## 参考资料
- [Taro官方文档](https://taro.aotu.io/)
- [Taro-ui](https://taro-ui.jd.com/#/)
- [Taro项目问答社区](https://github.com/NervJS/taro/issues)
- [微信开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [有本密码-小程序](https://github.com/arleyGuoLei/wechat-1password)

[⬆️ 返回顶部](##简介)
