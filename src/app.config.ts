export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/favorites/index',
    'pages/form/index',
    'pages/message/index',
    'pages/profile/index',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        // iconPath: '',
        // selectedIconPath: '',
        text: '',
      },
      {
        pagePath: 'pages/favorites/index',
        // iconPath: '',
        // selectedIconPath: '',
        text: '',
      },
      {
        pagePath: 'pages/form/index',
        // iconPath: '',
        // selectedIconPath: '',
        text: '',
      },
      {
        pagePath: 'pages/message/index',
        // iconPath: '',
        // selectedIconPath: '',
        text: '',
      },
      {
        pagePath: 'pages/profile/index',
        // iconPath: '',
        // selectedIconPath: '',
        text: '',
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
    navigationBarTitleText: '有房住',
    navigationBarTextStyle: 'black',
  },
})
