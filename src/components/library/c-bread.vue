<script>
import { createVNode } from 'vue'

export default {
  name: 'CBread',
  render() {
    const childless = []
    this.$slots.default().forEach(slot => {
      childless.push(slot)
      childless.push(createVNode('i', { class: 'iconfont icon-angle-right' }))
    })
    return createVNode('div', { class: 'xtx-bread' }, childless.slice(0, -1))
  }
}
</script>
<!-- 去掉scoped全局作用 -->
<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all .4s;

      &:hover {
        color: @mainColor;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
