export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/focuson/focuson',
    'pages/nodes/nodes',
    'pages/hot/hot',
    'pages/node_detail/node_detail',
    'pages/thread_detail/thread_detail',
  ],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "static/home.png",
        selectedIconPath: "static/home-fill.png",
        text: '最新',
      },
      {
        "iconPath": "static/sever.png",
        "selectedIconPath": "static/sever-fill.png",
        pagePath: 'pages/hot/hot',
        text: '热门',
      },
      {
        "iconPath": "static/user.png",
        "selectedIconPath": "static/user-fill.png",
        pagePath: 'pages/nodes/nodes',
        text: '节点',
      },
    ],
    color: '#333',
    selectedColor: '#008c8c',
    backgroundColor: '#FFF',
    borderStyle: 'black',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'V2EX',
    navigationBarTextStyle: 'black',
  },
})
