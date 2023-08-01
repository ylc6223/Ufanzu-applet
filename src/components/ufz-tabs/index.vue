<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import Taro from '@tarojs/taro'

const emit = defineEmits(['change'])

export interface Props {
  //标签页
  tabs?: Array<object>
  //tabs宽度，不传值则默认使用windowWidth，单位px
  width?: number
  //rpx
  height?: number
  //rpx 只对左右padding起作用，上下为0
  padding?: number
  //背景色
  backgroundColor?: string
  //是否固定
  isFixed?: boolean
  //px
  top?: number
  //是否去掉底部线条
  unlined?: boolean
  //当前选项卡
  currentTab?: number
  isSlider?: boolean
  //滑块宽度
  sliderWidth?: number
  //滑块高度
  sliderHeight?: number
  //滑块背景颜色
  sliderBgColor?: string
  sliderRadius?: string
  //滑块bottom
  bottom?: string
  //标签页宽度
  itemWidth?: string
  //字体颜色
  color?: string
  //选中后字体颜色
  selectedColor?: string
  //字体大小
  size?: number
  //选中后 是否加粗 ，未选中则无效
  bold?: boolean
  //2.3.0+
  scale?: number | string
  //角标字体颜色
  badgeColor?: string
  //角标背景颜色
  badgeBgColor?: string
  zIndex?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  width: 0,
  height: 80,
  padding: 30,
  backgroundColor: '#FFFFFF',
  isFixed: false,
  top: 0,
  unlined: false,
  currentTab: 0,
  isSlider: true,
  sliderWidth: 68,
  sliderHeight: 6,
  sliderBgColor: '',
  sliderRadius: '50rpx',
  bottom: '0',
  itemWidth: '',
  color: '#666',
  selectedColor: '',
  size: 28,
  bold: false,
  scale: 1,
  badgeColor: '#fff',
  badgeBgColor: '',
  zIndex: 996,
})

watch(
  () => props.currentTab,
  (newValue, oldValue) => {
    checkCor()
  }
)
watch(
  () => props.tabs,
  (newValue, oldValue) => {
    checkCor()
  }
)
watch(
  () => props.width,
  (newValue, oldValue) => {
    tabsWidth.value = newValue
    checkCor()
  }
)
const getItemWidth = computed(() => {
  let width = 100 / (props.tabs.length || 4) + '%'
  return props.itemWidth ? props.itemWidth : width
})
const getSliderBgColor = computed(() => {
  return props.sliderBgColor || '#5677fc'
})
const getSelectedColor = computed(() => {
  return props.selectedColor || '#5677fc'
})
const getBadgeBgColor = computed(() => {
  return props.badgeBgColor || '#f74d54'
})
const winWidth = ref(0)
const tabsWidth = ref(0)
const scrollLeft = ref(0)
onBeforeMount(() => {
  console.log('onBeforeMount —— 组件挂载前执行')
  // 高度自适应
  setTimeout(() => {
    Taro.getSystemInfo({
      success: (res) => {
        winWidth.value = res.windowWidth
        // eslint-disable-next-line eqeqeq
        tabsWidth.value = props.width == 0 ? winWidth.value : props.width
        checkCor()
      },
    })
  }, 0)
})

function checkCor() {
  let tabsNum = props.tabs.length
  let padding = (winWidth.value / 750) * props.padding
  let width = tabsWidth.value - props.padding * 2
  let left = (width / tabsNum - (winWidth.value / 750) * props.sliderWidth) / 2 + padding
  let scrollLeftt = left
  if (props.currentTab > 0) {
    scrollLeftt = scrollLeftt + (width / tabsNum) * props.currentTab
  }
  scrollLeft.value = scrollLeftt
}

// 点击标题切换当前页时改变样式
function swichTabs(index) {
  let item = props.tabs[index]
  if (item && item.disabled) return
  // eslint-disable-next-line eqeqeq
  if (props.currentTab == index) {
    return false
  } else {
    emit('change', {
      index: Number(index),
    })
  }
}
</script>

<template>
  <view
    class="ufz-tabs-view"
    :class="[isFixed ? 'ufz-tabs-fixed' : 'ufz-tabs-relative', unlined ? 'ufz-unlined' : '']"
    :style="{
      width: tabsWidth + 'px',
      height: height + 'rpx',
      padding: `0 ${padding}rpx`,
      background: backgroundColor,
      top: isFixed ? top + 'px' : 'auto',
      zIndex: isFixed ? zIndex : 'auto',
    }"
    v-if="tabsWidth > 0"
  >
    <view
      v-for="(item, index) in tabs"
      :key="index"
      class="ufz-tabs-item"
      :style="{ width: getItemWidth, height: height + 'rpx' }"
      @tap.stop="swichTabs(index)"
    >
      <view
        class="ufz-tabs-title"
        :class="{ 'ufz-tabs-disabled': item.disabled }"
        :style="{
          color: currentTab == index ? getSelectedColor : color,
          fontSize: size + 'rpx',
          fontWeight: bold && currentTab == index ? 'bold' : 'normal',
          transform: `scale(${currentTab == index ? scale : 1})`,
        }"
      >
        {{ item.name }}
        <view
          :class="[item.isDot ? 'ufz-badge__dot' : 'ufz-tabs__badge']"
          :style="{ color: badgeColor, backgroundColor: getBadgeBgColor }"
          v-if="item.num || item.isDot"
        >
          {{ item.isDot ? '' : item.num }}
        </view>
      </view>
    </view>
    <view
      v-if="isSlider"
      class="ufz-tabs-slider"
      :style="{
        transform: 'translateX(' + scrollLeft + 'px)',
        width: sliderWidth + 'rpx',
        height: sliderHeight + 'rpx',
        borderRadius: sliderRadius,
        bottom: bottom,
        background: getSliderBgColor,
        marginBottom: bottom == '50%' ? '-' + sliderHeight / 2 + 'rpx' : 0,
      }"
    ></view>
  </view>
</template>

<style lang="scss">
.ufz-tabs-view {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ufz-tabs-relative {
  position: relative;
}

.ufz-tabs-fixed {
  position: fixed;
  left: 0;
}

.ufz-tabs-fixed::before,
.ufz-tabs-relative::before {
  content: '';
  position: absolute;
  border-bottom: 1rpx solid #eaeef1;
  -webkit-transform: scaleY(0.5) translateZ(0);
  transform: scaleY(0.5) translateZ(0);
  transform-origin: 0 100%;
  bottom: 0;
  right: 0;
  left: 0;
}

.ufz-unlined::before {
  border-bottom: 0 !important;
}

.ufz-tabs-item {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}

.ufz-tabs-disabled {
  opacity: 0.6;
}

.ufz-tabs-title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  overflow: visible;
  transition: all 0.15s ease-in-out;
}

.ufz-tabs-slider {
  position: absolute;
  left: 0;
  transition: all 0.15s ease-in-out;
  z-index: 1;
  transform-style: preserve-3d;
}

.ufz-tabs__badge {
  position: absolute;
  font-size: 24rpx;
  height: 32rpx;
  min-width: 20rpx;
  padding: 0 6rpx;
  border-radius: 40rpx;
  right: 0;
  top: 0;
  transform: translate(88%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 4;
  font-weight: normal !important;
}

.ufz-badge__dot {
  position: absolute;
  height: 16rpx;
  width: 16rpx;
  border-radius: 50%;
  right: -10rpx;
  top: -10rpx;
  z-index: 4;
}
</style>