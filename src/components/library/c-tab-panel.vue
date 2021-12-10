<template>
  <!-- 装载是内容 -->
  <div class='c-tabs-panel' v-show='activeName===name'>
    <slot />
  </div>
</template>
<script>
import { inject } from 'vue'

export default {
  name: 'CTabsPanel',
  props: {
    // 标签页标题文章
    label: {
      type: String,
      default: ''
    },
    // 唯一标识
    name: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 当前组件该不该显示，取决于c-tabs组件的activeName数据是否和props.name一样
    const activeName = inject('activeName')
    return { activeName }
  }
}
</script>
<style scoped lang='less'></style>
