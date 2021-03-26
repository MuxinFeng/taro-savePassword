export default {
  pages: [
  'pages/index/index', 

  'pages/home/home',

  'pages/settings/settings',

  'pages/writeKey/writeKey'
],
  window: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '彗星密码本',
    backgroundColor: '#eeeeee',
    backgroundTextStyle: 'light'
  },
  tabBar: {
    color:"#515151",
    selectedColor: "#f38031",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/home/home",
        text: "主页",
        iconPath: "./assets/toBarIcon/home.png",
        selectedIconPath: "./assets/toBarIcon/homeSelected.png"
      },
      {
        pagePath: "pages/settings/settings",
        text: "设置",
        iconPath: "./assets/toBarIcon/setting.png",
        selectedIconPath: "./assets/toBarIcon/settingSelected.png"
      }
    ]
  },
  cloud: true
};
