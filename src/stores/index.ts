// https://pinia.esm.dev/introduction.html
import {h} from 'vue'
import {defineStore} from 'pinia'
import Taro from '@tarojs/taro'
import {Home, Follow, Uploader, Message, My} from '@nutui/icons-vue-taro'

export const useStore = defineStore('store', {
    state: () => {
        return {
            count: 0,
            activeName: 'home',
            activeIndex: 0,
            tabs: [
                {
                    title: '房子',
                    icon: h(Home),
                    name: 'home',
                    url: '/pages/index/index',
                },
                {
                    title: '收藏',
                    icon: h(Follow),
                    name: 'fellow',
                    url: '/pages/favorites/index',
                },
                {
                    title: '发布',
                    icon: h(Uploader),
                    name: 'uploader',
                    url: '/pages/form/index',
                },
                {
                    title: '消息',
                    icon: h(Message),
                    name: 'message',
                    url: '/pages/message/index',
                },
                {
                    title: '我的',
                    icon: h(My),
                    name: 'my',
                    url: '/pages/profile/index',
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
            const url = this.tabs[index].url
            this.activeName = this.tabs[index].name
            this.activeIndex = index
            Taro.switchTab({
                url: url,
            })
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
