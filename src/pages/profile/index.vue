<template>
  <view class="container">
    <text>我的</text>
    <nut-tabbar bottom safe-area-inset-bottom placeholder @tab-switch="tabSwitch" v-model="active">
      <nut-tabbar-item
          v-for="(item, idx) in tabs"
          :key="idx"
          :tab-title="item.title"
          :icon="item.icon"
      ></nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import Taro from '@tarojs/taro'

Taro.hideTabBar()
import {useStore} from '../../stores'

const store = useStore()
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)

function tabSwitch(item, index) {
  store.switchTab(index)
}
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
