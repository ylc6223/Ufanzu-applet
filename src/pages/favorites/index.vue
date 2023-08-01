<template>
  <view class="container overflow-hidden">
    <nut-config-provider v-if="true" :theme-vars="themeVars"></nut-config-provider>
    <ufz-tabs
      :tabs="tabss"
      :isFixed="true"
      itemWidth="50%"
      :currentTab="currentTab"
      @change="change"
      :padding="0"
      sliderBgColor="#20bf6b"
      selectedColor="#20bf6b"
    ></ufz-tabs>
    <view class="whitespace h-[80px]"></view>
    <view class="panel_1" v-show="currentTab === 0">
      <view class="box-border">
        <text class="block p-4">10套收藏房源</text>
        <nut-swipe v-for="item in 2">
          <nut-cell round-radius="0">
            <view class="flex justify-between">
              <view class="w-[250px] h-[200px] rounded-lg overflow-hidden">
                <image
                  class="w-full h-full"
                  src="https://img.js.design/assets/img/64b9eeb8f84878073f1d6640.png"
                ></image>
              </view>
              <view class="ml-2 flex flex-col">
                <text>白云区·三元里</text>
                <text class="font-bold">整租·1卧1卫·逸居公馆三元里旗舰店</text>
                <view class="flex items-center">
                  <nut-tag class="mx-0.5" color="#E9E9E9" textColor="#999999">急速预约</nut-tag>
                  <nut-tag class="mx-0.5" color="#E9E9E9" textColor="#999999">近地铁</nut-tag>
                  <nut-tag class="mx-0.5" color="#E9E9E9" textColor="#999999">独卫</nut-tag>
                </view>
                <view class="flex items-center">
                  <text>￥</text>
                  <text>2298</text>
                  <text>/月</text>
                </view>
              </view>
            </view>
          </nut-cell>
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger">删除</nut-button>
          </template>
        </nut-swipe>
      </view>
    </view>
    <view class="panel_2" v-show="currentTab === 1"></view>

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
import { useStore } from '../../stores'

const store = useStore()
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)
const currentTab = ref(0)
const themeVars = reactive({
  tabsHorizontalTabLineColor: 'var(--nut-primary-color)',
})
const tabss = reactive([
  {
    name: '找房',
  },
  {
    name: '找室友',
    //   disabled: true,
  },
])

//切换tabbar
function tabSwitch(item, index) {
  console.log(item)
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