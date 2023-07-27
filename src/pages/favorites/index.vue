<template>
  <view class="container">
    <nut-config-provider :theme-vars="themeVars">
      <view>
        <nut-tabs v-model="tab1value" background="#FFF">
          <nut-tab-pane title="钟意房源" :auto-height="true">
            <view class="px-4">
              <text class="text-neutral-800">2套收藏房源</text>
            </view>
            <view class="w-full box-border">
              <nut-swipe>
                <nut-cell round-radius="0" title="左滑删除"/>
                <template #right>
                  <nut-button shape="square" style="height: 100%" type="danger">删除</nut-button>
                </template>
              </nut-swipe>
            </view>
          </nut-tab-pane>
          <nut-tab-pane title="找室友"> Tab 2</nut-tab-pane>
        </nut-tabs>
      </view>
    </nut-config-provider>

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
import {reactive, ref, computed} from 'vue'
import Taro from '@tarojs/taro'

Taro.hideTabBar()
import {useStore} from '../../stores'

const store = useStore()
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)
const tab1value = ref(0)
const themeVars = reactive({
  tabsHorizontalTabLineColor: 'var(--nut-primary-color)',
})

function tabSwitch(item, index) {
  store.switchTab(index)
}
</script>

<style lang="scss">
.nut-tab-pane {
  padding-left: 0;
  padding-right: 0;
}
</style>
