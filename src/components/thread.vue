<template>
  <view
      class="thread p-6 max-w-[200px] mx-auto rounded-xl shadow-lg flex items-center space-x-4"
      @tap="handleNavigate"
  >
    <view class="flex items-center justify-center">123</view>
    <view class="info">
      <view>
        <image :src="member.avatar_large" class="avatar" />
      </view>
      <view class="middle">
        <view :class="usernameCls"> {{ member.username }}</view>
        <view class="replies">
          <text class="mr10">{{ time }}</text>
          <text>评论 {{ replies }}</text>
        </view>
      </view>
      <view class="node">
        <text class="tag">{{ node.title }}</text>
      </view>
    </view>
    <text class="title">{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
import {computed} from "vue";
import { eventCenter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { timeagoInst, Thread_DETAIL_NAVIGATE } from '../utils/api'
import './thread.css'

interface Props {
  title: string
  member: object
  last_modified: string
  replies: string
  node: object
  not_navi: boolean
  tid: string
}

const props = defineProps<Props>()
const time = computed(() => {
  return timeagoInst.format(last_modified * 1000, 'zh')
})
// export default {
//   props: ['title', 'member', 'last_modified', 'replies', 'node', 'not_navi', 'tid'],
//   computed: {
//     // time() {
//     //   return timeagoInst.format(this.last_modified * 1000, 'zh')
//     // },
//     usernameCls() {
//       return `author ${this.not_navi ? 'bold' : ''}`
//     },
//   },
//   // filters: {
//   //   url(val) {
//   //     return 'https:' + val
//   //   },
//   // },
//   methods: {
//     handleNavigate() {
//       const { tid, not_navi } = this.$props
//       if (not_navi) {
//         return
//       }
//       eventCenter.trigger(Thread_DETAIL_NAVIGATE, this.$props)
//       // 跳转到帖子详情
//       Taro.navigateTo({
//         url: '/pages/thread_detail/thread_detail',
//       })
//     },
//   },
// }
</script>
<style lang="scss">
.info > view > image.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
