<h1 style="text-align:center">☄️彗星密码本☄️</h1>

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

打开微信开发工具,将编译好的文件导入即可
```
## 代码结构
```
├── animate.wxss
├── app.js
├── app.json
├── app.wxss
├── components #公用组件
|  ├── header #全局header
|  ├── home-add-tips #首页添加到我的小程序提示
|  ├── input #全局下划线输入框
|  └── validatePwd #没有指纹验证设备的主密码验证
├── images
├── model
|  ├── base.js #小程序端操作云开发数据库的基类
|  ├── password.js #password集合的model层
|  └── user.js #用户model集合层
├── pages
|  ├── about #关于页面
|  ├── accountDetail #数据详情页面
|  ├── addAccount #添加/修改密码页面
|  ├── home #首页
|  ├── list #搜索/全部记录页
|  ├── mine #偏好设置页面
|  └── register #主密码设置页
├── sitemap.json
└── utils
   ├── cryptojs #加解密类库，用到了sha256 和 AES
   |  ├── README.md
   |  ├── cryptojs.js
   |  ├── lib
   |  ├── package.json
   |  └── test
   ├── log.js #日志操作
   ├── pageScript.wxs
   ├── router.js #全局路由
   ├── tool.js #全局SDK，封装了复用性较多的函数
   └── util.js #工具类函数

```
[⬆️ 返回顶部](##简介)
## 功能
- 已完成

- [x] 登录  
- [x] 注册  
- [x] 文章列表
- [x] 文章归档
- [x] 标签  
- [x] 关于  
- [x] 点赞与评论
- [x] 留言
- [x] 历程
- [x] 文章详情（支持代码语法高亮）
- [x] 文章详情目录
- [x] 移动端适配
- [x] github 授权登录
- 待完成
[⬆️ 返回顶部](##简介)
## 效果

- 运行截图
- 二维码


## 致谢

[⬆️ 返回顶部](##简介)
