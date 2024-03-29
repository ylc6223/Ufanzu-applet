import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './app.scss'
import './custom_theme.scss'
const App = createApp({
  onShow(options) {
    console.log(options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  // render(h) {
  //   // this.$slots.default 是将要会渲染的页面
  //   return h('block', this.$slots.default)
  // },
})
const pinia = createPinia()
App.use(pinia)
App.use(createPinia())

export default App
