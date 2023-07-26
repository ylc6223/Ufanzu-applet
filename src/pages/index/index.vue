<template>
  <view class="container">
    <nut-config-provider :theme-vars="themeVars">
      <view class="max-w-full h-full bg-[#20bf6b]">
        <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
        <nut-navbar
            @on-click-back="back"
            @on-click-title="title"
            @on-click-right="rightClick"
            desc=""
        >
          <template #left>
            <view class="flex items-center">
              <Locationg3 size="28px" color="white"></Locationg3>
            </view>
          </template>
          <template #content>
            <view class="w-full h-[60px] pt-[5px] rounded-full bg-white"></view>
          </template>
        </nut-navbar>
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
import {reactive, ref, onMounted, computed} from 'vue'
import {Locationg3} from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

Taro.hideTabBar()
import {useStore} from '../../stores'

const store = useStore()
const statusBarHeight: any = ref(0)
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)
const themeVars = reactive({
  navbarBackground: '#20bf6b',
  navbarMarginBottom: 0,
  navbarBoxShadow: 'none',
  navbarTitleWidth: '200px',
  navbarTitleIconMargin: '0',
})

function tabSwitch(item, index) {
  store.switchTab(index)
}

onMounted(() => {
  Taro.getSystemInfo({
    success: function (res) {
      statusBarHeight.value = res.statusBarHeight
      console.log(res.model)
      console.log(res.pixelRatio)
      console.log(res.windowWidth)
      console.log(res.windowHeight)
      console.log(res.language)
      console.log(res.version)
      console.log(res.platform)
    },
  })
})

function back() {
  console.log('Click Back')
}

function title() {
  console.log('Click Title')
}

function rightClick() {
  console.log('Click Right')
}
</script>

<style lang="scss" scoped>
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

//:deep(.nut-navbar__title) {
//  margin: 0;
//}
.nut-navbar .nut-navbar__title {
  margin: 0;
}
</style>
