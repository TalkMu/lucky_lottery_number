export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/k8/index',
    'pages/push/index',
    'pages/twoColorBall/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  // tabBar:{
  //   color:"#3d3d3d",
  //   selectedColor:'#3cc51f',
  //   list:[
  //     {
  //       pagePath:"pages/home/index",
  //       iconPath:"assets/tabBar/home.png",
  //       selectedIconPath:"assets/tabBar/home_selected.png",
  //       text:"首页",
  //     },
  //     {
  //       pagePath:"pages/me/index",
  //       iconPath:"assets/tabBar/me.png",
  //       selectedIconPath:"assets/tabBar/me_selected.png",
  //       text:"我的",
  //     }
  //   ]
  // }
})
