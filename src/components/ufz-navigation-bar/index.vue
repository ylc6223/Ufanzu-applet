<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import Taro from '@tarojs/taro'

const emit = defineEmits(['init', 'change'])

export interface Props {
  //NavigationBar标题
  title?: string
  //NavigationBar标题颜色
  color?: string
  //NavigationBar背景颜色,不支持rgb
  backgroundColor?: string
  //是否需要分割线
  splitLine?: boolean
  //是否设置不透明度
  isOpacity?: boolean
  //不透明度最大值 0-1
  maxOpacity?: number | string
  //背景透明 【设置该属性，则背景透明，只出现内容，isOpacity和maxOpacity失效】
  transparent?: boolean
  //滚动条滚动距离
  scrollTop?: number | string
  /*
     isOpacity 为true时生效
     opacity=scrollTop /windowWidth * scrollRatio
    */
  scrollRatio?: number | string
  //是否自定义header内容
  isCustom?: boolean
  //是否沉浸式
  isImmersive?: boolean
  isFixed?: boolean
  //是否开启高斯模糊效果[仅在支持的浏览器有效果]
  backdropFilter?: boolean
  //下拉隐藏NavigationBar，主要针对有回弹效果ios端
  dropDownHide?: boolean
  //z-index设置
  zIndex?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  color: '#333',
  backgroundColor: '#fff',
  splitLine: false,
  isOpacity: true,
  maxOpacity: 1,
  transparent: false,
  scrollTop: 0,
  scrollRatio: 0.3,
  isCustom: false,
  isImmersive: true,
  isFixed: true,
  backdropFilter: false,
  dropDownHide: false,
  zIndex: 996,
})
watch(
  () => props.scrollTop,
  (newValue, oldValue) => {
    if (props.isOpacity && !props.transparent) {
      opacityChange()
    }
  }
)
watch(
  () => props.backgroundColor,
  (newValue, oldValue) => {
    if (newValue) {
      if (props.isOpacity) {
        background.value = hexToRgb(newValue)
      } else {
        background.value = props.transparent ? 'rgba(0, 0, 0, 0)' : newValue
      }
    }
  }
)
const width = ref(375) //header宽度
const left = ref(375) //小程序端 左侧距胶囊按钮距离
const height = ref(44) //header高度
const top = ref(0)
const scrollH = ref(1) //滚动总高度,计算opacity
const opacity = ref(1) //0-1
const statusBarHeight = ref(0) //状态栏高度
const background = ref('255,255,255') //header背景色
const dropDownOpacity = ref(1)

dropDownOpacity.value = props.backdropFilter && 0
opacity.value = props.isOpacity || props.transparent ? 0 : (props.maxOpacity as any)
if (props.isOpacity) {
  background.value = hexToRgb(props.backgroundColor)
} else {
  background.value = props.transparent ? 'rgba(0, 0, 0, 0)' : props.backgroundColor
}
// let obj = {}
let obj = Taro.getMenuButtonBoundingClientRect()

Taro.getSystemInfo({
  success: (res) => {
    statusBarHeight.value = res.statusBarHeight
    width.value = res.windowWidth
    left.value = obj.left || res.windowWidth
    if (props.isImmersive) {
      height.value = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44
    }
    scrollH.value = res.windowWidth * (props.scrollRatio as any)
    top.value = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6
    emit('init', {
      width: width.value,
      height: height.value,
      left: left.value,
      top: top.value,
      statusBarHeight: statusBarHeight.value,
      opacity: opacity.value,
      windowHeight: res.windowHeight,
    })
  },
})

function hexToRgb(hex) {
  let rgb = '255,255,255'
  if (hex && ~hex.indexOf('#')) {
    if (hex.length === 4) {
      let text = hex.substring(1, 4)
      hex = '#' + text + text
    }
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      rgb = `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    }
  }
  return rgb
}

// eslint-disable-next-line complexity
function opacityChange() {
  if (props.dropDownHide) {
    if (props.scrollTop < 0) {
      if (dropDownOpacity.value > 0) {
        dropDownOpacity.value = 1 - Math.abs(props.scrollTop as number) / 30
      }
    } else {
      dropDownOpacity.value = 1
    }
  }

  let scroll = props.scrollTop <= 1 ? 0 : props.scrollTop
  let opacityy = (scroll as number) / scrollH.value
  if (
    (opacity.value >= props.maxOpacity && opacityy >= props.maxOpacity) ||
    (opacity.value === 0 && opacityy === 0)
  ) {
    return
  }
  opacity.value = opacityy > props.maxOpacity ? (props.maxOpacity as any) : opacityy
  if (props.backdropFilter) {
    dropDownOpacity.value = opacity.value >= props.maxOpacity ? 1 : props.opacity
  }
  emit('change', {
    opacity: opacity.value,
  })
}
</script>

<template>
  <view
    class="ufz-navigation-bar"
    :class="{
      'ufz-bar-line': opacity > 0.85 && splitLine,
      'ufz-navbar-fixed': isFixed,
      'ufz-backdrop__filter': backdropFilter && dropDownOpacity > 0,
    }"
    :style="{
      height: height + 'px',
      background: isOpacity ? `rgba(${background},${opacity})` : background,
      opacity: dropDownOpacity,
      zIndex: isFixed ? zIndex : 'auto',
    }"
  >
    <view
      class="ufz-status-bar"
      :style="{ height: statusBarHeight + 'px' }"
      v-if="isImmersive"
    ></view>
    <view
      class="ufz-navigation_bar-title"
      :style="{
        opacity: transparent || opacity >= maxOpacity ? 1 : opacity,
        color: color,
        paddingTop: top - statusBarHeight + 'px',
      }"
      v-if="title && !isCustom"
    >
      {{ title }}
    </view>
    <slot></slot>
  </view>
</template>

<style lang="scss">
.ufz-navigation-bar {
  width: 100%;
  transition: opacity 0.4s;
}

.ufz-backdrop__filter {
  /* Safari for macOS & iOS */
  -webkit-backdrop-filter: blur(15px);
  /* Google Chrome */
  backdrop-filter: blur(15px);
}

.ufz-navbar-fixed {
  position: fixed;
  left: 0;
  top: 0;
}

.ufz-status-bar {
  width: 100%;
}

.ufz-navigation_bar-title {
  width: 100%;
  font-size: 17px;
  line-height: 17px;
  /* #ifndef APP-PLUS */
  font-weight: 500;
  /* #endif */
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ufz-bar-line::after {
  content: '';
  position: absolute;
  border-bottom: 1rpx solid #eaeef1;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
}
</style>