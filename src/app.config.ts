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
        iconPath: '',
        selectedIconPath: '',
        text: '',
      },
      {
        iconPath: '',
        selectedIconPath: '',
        pagePath: 'pages/favorites/index',
        text: '',
      },
      {
        iconPath: '',
        selectedIconPath: '',
        pagePath: 'pages/form/index',
        text: '',
      },
      {
        iconPath: '',
        selectedIconPath: '',
        pagePath: 'pages/message/index',
        text: '',
      },
      {
        iconPath: '',
        selectedIconPath: '',
        pagePath: 'pages/profile/index',
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
    navigationBarTitleText: 'V2EX',
    navigationBarTextStyle: 'black',
  },
})
