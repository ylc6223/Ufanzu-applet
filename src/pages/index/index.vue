<template>
  <view class="index">
    <Thread-List :threads="threads" :loading="loading"/>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import ThreadList from '../../components/thread_list.vue'
const loading = ref(true)
const threads = ref([])
try {
  Taro.request({
    //获取最新帖子
    url: api.getLatestTopic(),
    success(res) {
      loading.value = false
      threads.value = JSON.parse(JSON.stringify(res.data))
    },
  })
} catch (error) {
  Taro.showToast({
    title: '载入远程数据错误',
  })
}
</script>
<style scoped lang="scss">
.index {
  min-height: 100vh;
}
</style>
