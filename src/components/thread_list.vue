<template>
  <view className="thread-list">
    <loading v-if="loading"/>
    <thread
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

<script>
</script>
<script setup lang="ts">
import Thread from './thread.vue'
import loading from "./loading.vue";
const props = defineProps<{
  // threads:Array
  loading:boolean
}>()

// {
//   threads: {
//     type: Array,
//   default: () => [],
//   },
//   loading: {
//     type: Boolean,
//   default: true,
//   },
// }
</script>
