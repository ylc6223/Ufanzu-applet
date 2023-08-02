<template>
  <view class="container">
    <ufz-navigation-bar
      splitLine
      @init="initNavigation"
      @change="opacityChange"
      :scrollTop="scrollTop"
      title=""
      backgroundColor="#fff"
      color="#333"
    >
      <view class="ufz-header-icon" :style="{ marginTop: top + 'px' }">
        <Horizontal
          size="24px"
          :color="opacity > 0.85 ? '#20bf6b' : '#fff'"
          @click="drawerVisible"
        ></Horizontal>
      </view>
    </ufz-navigation-bar>
    <view class="ufz-header-bg">
      <!--      <image-->
      <!--        src="https://raw.githubusercontent.com/dingyong0214/ThorUI-uniapp/master/static/images/my/mine_bg_3x.png"-->
      <!--        class="ufz-header-img"-->
      <!--      />-->
      <view class="ufz-header-img bg-[#20bf6b]"></view>
    </view>
    <view>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti excepturi
      exercitationem? Aliquam aperiam autem distinctio dolor earum eos ex id laboriosam natus,
      neque, nesciunt nihil nostrum officia officiis, omnis recusandae similique sunt veniam.
      Accusantium architecto distinctio ea enim et id, impedit iure natus nostrum officiis quod,
      repellat repudiandae similique sint tenetur? Accusamus amet cupiditate delectus dolorem earum
      laborum magnam mollitia nobis obcaecati pariatur porro praesentium provident quam quasi
      quibusdam repellendus, saepe sapiente unde veritatis voluptate. Atque mollitia perferendis
      quae repellat unde, vero voluptatibus? Blanditiis eaque excepturi hic iste provident
      voluptate? Ad alias animi aperiam assumenda, consequuntur, distinctio dolorum ea iusto
      molestias optio provident quaerat quasi reiciendis veniam voluptatibus! Eius ipsa labore,
      laboriosam quia quidem rem voluptatum. Dolorem ducimus, eius enim illum magnam rem saepe sequi
      tempore veniam voluptate? Autem eligendi exercitationem laboriosam molestiae nihil nostrum
      officiis quam repellat sapiente sint. Hic quos saepe sit vero? Adipisci aspernatur aut autem
      consequuntur debitis dicta dignissimos dolorum ducimus earum eos error eum excepturi facilis
      fuga id illo in, iste laborum laudantium minus nam natus nisi non nulla officia officiis
      possimus praesentium quaerat quas quasi recusandae reprehenderit soluta suscipit vel velit
      voluptate voluptates! Blanditiis consequatur debitis exercitationem, expedita inventore iste
      maxime molestias nihil odio quae quia ratione reiciendis sint soluta totam! A adipisci atque,
      corporis culpa debitis, deserunt dignissimos doloribus et facilis incidunt ipsa iusto minima
      modi officia officiis possimus provident reiciendis repellat saepe sequi ut veniam voluptatum.
      Consequatur, corporis harum iste minus officia sequi? Asperiores aut consectetur debitis esse
      molestiae nam suscipit. Asperiores, dolor earum eum eveniet magnam molestiae quod vero! Ab ad
      beatae error libero modi nemo pariatur quis rem veritatis, voluptas. Assumenda, aut cum dicta
      dolorem ducimus, facilis fugiat hic impedit incidunt ipsum magni modi natus nihil, omnis optio
      perferendis placeat provident quas quidem quos rerum sapiente similique totam. Quibusdam.
    </view>
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
import Taro from '@tarojs/taro'
import ufzNavigationBar from '../../components/ufz-navigation-bar/index.vue'
import { Horizontal } from '@nutui/icons-vue-taro'

Taro.hideTabBar()
import { useStore } from '../../stores'

const store = useStore()
const tabs = computed(() => store.tabs)
const active = computed(() => store.activeIndex)
const statusBarHeight: any = ref(0)
const top = ref(0) //标题图标距离顶部距离
const opacity = ref(1)
const scrollTop = ref(0.5)
const width = ref('500rpx')
const height = ref('100vh')
const showDrawer = ref(false)
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

function tabSwitch(item, index) {
  console.log(item)
  store.switchTab(index)
}

function initNavigation(e) {
  opacity.value = e.opacity
  top.value = e.top
}

function opacityChange(e) {
  opacity.value = e.opacity
}

function drawerVisible() {
  showDrawer.value = true
}

Taro.usePageScroll((res) => {
  scrollTop.value = res.scrollTop
})
</script>

<style lang="scss">
.ufz-header-bg {
  width: 100%;
  margin: 0;
}

.ufz-header-img {
  width: 100%;
  height: 440rpx;
  display: block;
}

.ufz-header-icon {
  width: 100%;
  position: fixed;
  top: 0;
  padding: 0 64rpx;
  display: flex;
  align-items: center;
  height: 32px;
  transform: translateZ(0);
  z-index: 99999;
  box-sizing: border-box;
}

.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>