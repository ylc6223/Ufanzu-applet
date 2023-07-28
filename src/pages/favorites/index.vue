<template>
  <view class="container">
    <nut-config-provider v-if="true" :theme-vars="themeVars"></nut-config-provider>
    <ufz-tabs :tabs="tabss" :currentTab="currentTab" @change="change"></ufz-tabs>
    <nut-swipe v-if="false">
      <nut-cell round-radius="0" title="左滑删除"/>
      <template #right>
        <nut-button shape="square" style="height: 100%" type="danger">删除</nut-button>
      </template>
    </nut-swipe>
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
import { reactive, ref, computed } from 'vue'
import Taro from '@tarojs/taro'
import ufzTabs from '../../components/ufz-tabs/index.vue'

Taro.hideTabBar()
import {useStore} from '../../stores'

const store = useStore()
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)
const currentTab = ref(0)
const themeVars = reactive({
  tabsHorizontalTabLineColor: 'var(--nut-primary-color)',
})
const tabss = reactive([
  {
    name: '今日特拼',
  },
  {
    name: '全部',
  },
  {
    name: '新品',
  },
  {
    name: '禁用状态',
    disabled: true,
  },
])

//切换tabbar
function tabSwitch(item, index) {
  store.switchTab(index)
}

function change(e) {
  currentTab.value = e.index
}
</script>

<style lang="scss">
.nut-tab-pane {
  padding-left: 0;
  padding-right: 0;
}
</style>
