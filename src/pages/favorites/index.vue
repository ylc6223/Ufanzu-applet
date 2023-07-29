<template>
  <view class="container">
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
    <view class="panel_1" v-show="true">
      <view class="box-border">
        <text class="block">10套收藏房源 </text>
        <nut-swipe v-for="item in 10">
          <nut-cell round-radius="0" >
            <view class="flex">
              <view class="w-[300px] h-[150px]">
                <image class="w-full" src="https://img.js.design/assets/img/64b9eeb8f84878073f1d6640.png"></image>
              </view>
              <view class="flex flex-col">
                <text>白云区·三元里</text>
                <text class="text-lg font-bold">整租·1卧1卫·逸居公馆三元里旗舰店</text>
              </view>
            </view>
          </nut-cell>
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger">删除</nut-button>
          </template>
        </nut-swipe>
      </view>
    </view>
    <view class="panel_2" v-show="false"></view>

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
  },
  // {
  //   name: '禁用状态',
  //   disabled: true,
  // },
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
