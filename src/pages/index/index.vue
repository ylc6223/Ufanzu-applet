<template>
  <view class="container">
    <nut-config-provider :theme-vars="themeVars">
      <view class="max-w-full h-full bg-white">
        <view class="w-full" :class="{ 'navbar-fixed': true }">
          <view class="status-bar bg-white" :style="{ height: statusBarHeight + 'px' }"></view>
          <nut-navbar
            @on-click-back="drawerVisible"
            @on-click-title="title"
            @on-click-right="rightClick"
            :border="true"
            desc=""
          >
            <template #left>
              <view class="flex items-center">
                <Horizontal size="24px" color="#20bf6b"></Horizontal>
              </view>
            </template>
            <template #content>
              <view class="bg-[#EEF3EF] rounded-xl w-full h-[60px] mx-0 relative">
                <view class="relative flex items-center h-full ml-[20px]">
                  <Search size="20px" color="#9EA39F"></Search>
                  <text class="ml-1 text-[#9EA39F]">查找心仪房源</text>
                </view>
              </view>
            </template>
          </nut-navbar>
        </view>
        <view class="placeholder" :style="{ height: statusBarHeight + 44 + 'px' }"></view>
        <view class="w-full">
          <nut-swiper
            :init-page="page"
            :pagination-visible="true"
            pagination-color="#426543"
            auto-play="3000"
          >
            <nut-swiper-item>
              <img src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg" alt="" />
            </nut-swiper-item>
            <nut-swiper-item>
              <img src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg" alt="" />
            </nut-swiper-item>
            <nut-swiper-item>
              <img src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg" alt="" />
            </nut-swiper-item>
            <nut-swiper-item>
              <img src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg" alt="" />
            </nut-swiper-item>
          </nut-swiper>
        </view>
        <nut-grid :column-num="5" :gutter="10" reverse :border="false">
          <nut-grid-item text="合租">
            <Home />
          </nut-grid-item>
          <nut-grid-item text="整租">
            <Home />
          </nut-grid-item>
          <nut-grid-item text="公寓">
            <Home />
          </nut-grid-item>
          <nut-grid-item text="求租">
            <Home />
          </nut-grid-item>
          <nut-grid-item text="优选">
            <Home />
          </nut-grid-item>
        </nut-grid>
        <view class="px-4">
          <view class="mb-4" v-for="(tItem, tIdx) in descList" :key="tIdx">
            <text class="text-2xl text-neutral-950">{{ tItem.title }}</text>
            <text class="block text-neutral-700 my-2">{{ tItem.desc }}</text>
            <view class="grid grid-cols-2 gap-2">
              <view
                v-for="(item, idx) in listings"
                :key="idx"
                class="overflow-hidden bg-white border border-gray-200 rounded-2xl shadow dark:border-gray-700"
              >
                <view class="thumbnail w-full">
                  <image class="w-full" :src="item.imgUrl"></image>
                </view>
                <view class="desc px-4 py-2 flex flex-col">
                  <view class="flex items-center truncate">
                    <nut-tag type="success" class="shrink-0">
                      <text class="text-neutral-800 text-sm method">{{ item.method }}</text>
                    </nut-tag>
                    <text class="region w-full">{{ item.region }}</text>
                  </view>
                  <view class="flex items-center truncate">
                    <text class="text-neutral-800 text-sm address shrink-0"
                      >{{ item.address }}
                    </text>
                    <text class="text-neutral-800 text-sm price shrink-0"
                      >￥{{ item.price }}/月
                    </text>
                  </view>
                  <view class="flex items-center">
                    <text class="text-neutral-800 text-sm houseType">{{ item.type }}</text>
                    <text class="text-neutral-800 text-sm floorArea">{{ item.floorArea }}m²</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </nut-config-provider>
    <nut-popup
      position="left"
      :zIndex="9999"
      duration="0.5"
      v-model:visible="showDrawer"
      :style="{ width, height }"
    >
      <nut-side-navbar>
        <view class="px-4 pb-4" :style="{ paddingTop: statusBarHeight + 44 + 'px' }">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eveniet quidem sit
          vitae? Asperiores aut deserunt distinctio ducimus ea eaque eligendi est, eveniet labore
          laborum modi nemo officia perferendis quos velit veniam vero!
        </view>
      </nut-side-navbar>
    </nut-popup>
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
import { reactive, ref, onMounted, computed } from 'vue'
import { Locationg3, Horizontal, Search, Home } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

Taro.hideTabBar()
import { useStore } from '../../stores'

const store = useStore()
const statusBarHeight: any = ref(0)
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)
const page = ref(0)
const showDrawer = ref(false)
const width = ref('500rpx')
const height = ref('100vh')
const themeVars = reactive({
  navbarBackground: '#FFF',
  navbarMarginBottom: 0,
  navbarBoxShadow: 'none',
  navbarTitleWidth: '100px',
  // navbarTitleIconMargin: '0',
})
const descList = reactive([
  {
    title: '找室友',
    desc: '房东直租、找室友、个人转租',
  },
  {
    title: '整租房源',
    desc: '房东直租、真人签约、安全无忧',
  },
  {
    title: '品质公寓',
    desc: '专人管理、高效省心、拎包入住',
  },
  {
    title: '热门推荐',
    desc: '根据目标意向推荐心仪房源',
  },
])
const listings = reactive([
  {
    imgUrl: 'https://img.js.design/assets/img/64b9eeb8f84878073f1d6640.png',
    region: '上海市浦东新区',
    method: '整租',
    address: '华侨城',
    price: '3200',
    type: '2室1厅',
    floorArea: 89,
  },
  {
    imgUrl: 'https://img.js.design/assets/img/64b9eebe998332c0eb150808.png',
    region: '北京市朝阳区',
    method: '整租',
    address: '望京soho',
    price: '2200',
    type: '4室2厅',
    floorArea: 125,
  },
])

function tabSwitch(item, index) {
  store.switchTab(index)
}

onMounted(() => {
  Taro.getSystemInfo({
    success: function (res) {
      console.log(res)
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

Taro.usePageScroll((res) => {})

Taro.usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})

function drawerVisible() {
  showDrawer.value = true
}

function title() {
  console.log('Click Title')
}

function rightClick() {
  console.log('Click Right')
}
</script>

<style lang="scss">
.navbar-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9998;
}

//@import './index.scss';
//:slotted(.nut-navbar__title) {
//  margin: 0;
//}
.nut-navbar .nut-navbar__title {
  margin: 0 !important;
}

.nut-swiper-item {
  line-height: 300px;
}

.nut-swiper-item img {
  width: 100%;
  height: 100%;
}
</style>