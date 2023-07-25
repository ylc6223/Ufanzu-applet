<template>
  <view class="index">
    <thread-list :threads="threads" :loading="loading"/>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import ThreadList from '../../components/thread_list.vue'
const loading = ref(true)
const threads = ref([])
onMounted(async () => {
  try {
    const res = await Taro.request({
      //获取最新帖子
      url: api.getLatestTopic(),
    })
    loading.value = false
    threads.value = res.data
  } catch (error) {
    Taro.showToast({
      title: '载入远程数据错误',
    })
  }
})
</script>
<style scoped lang="scss">
.index{
  min-height: 100vh;
}
</style>
