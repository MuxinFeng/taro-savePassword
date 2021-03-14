export default {
  pages: ["pages/index/index", "pages/home/home"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    color: "#333",
    selectedColor: "#f03d37",
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
        pagePath: "pages/home/home",
        text: "设置",
        iconPath: "./assets/toBarIcon/setting.png",
        selectedIconPath: "./assets/toBarIcon/settingSelected.png"
      }
    ]
  },
  cloud: true
};
