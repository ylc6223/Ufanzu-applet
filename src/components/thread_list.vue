<template>
  <view className="thread-list">
    <Loading v-if="loading"/>
    <thread-item
      v-else
      v-for="t in threads"
      :key="t.id"
      :node="t.node"
      :title="t.title"
      :last_modified="t.last_modified"
      :replies="t.replies"
      :tid="t.id"
      :member="t.member"
    />
  </view>
</template>

<script setup lang="ts">
import ThreadItem from './thread-item.vue'
import Loading from './loading.vue'

interface Props {
  threads: Array<object>
  loading: boolean
}

const props = defineProps<Props>()
// const props = withDefaults(defineProps<Props>(), {
//   // threads: () => [],
//   loading: true,
// })
console.log(props.threads, '@@@@')
</script>
