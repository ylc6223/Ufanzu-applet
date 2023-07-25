// https://pinia.esm.dev/introduction.html
import {h} from 'vue'
import {defineStore} from 'pinia'
import {Home, Follow, Uploader, Message, My} from '@nutui/icons-vue-taro'

export const useStore = defineStore('store', {
  state: () => {
    return {
      count: 0,
      activeName: 'home',
      tabs: [
        {
          title: '房子',
          icon: h(Home),
          name: 'home',
        },
        {
          title: '收藏',
          icon: h(Follow),
          name: 'fellow',
        },
        {
          title: '发布',
          icon: h(Uploader),
          name: 'uploader',
        },
        {
          title: '消息',
          icon: h(Message),
          name: 'message',
        },
        {
          title: '我的',
          icon: h(My),
          name: 'my',
        },
      ],
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
    switchTab(index) {
    },
  },
})

// You can even use a function (similar to a component setup()) to define a Store for more advanced use cases:
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//
//   function increment() {
//     count.value++
//   }
//
//   return {count, increment}
// })
