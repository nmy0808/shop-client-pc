<template>
  <div class='sub-sort'>
    <div class='sort'>
      <a href='javascript:;'>默认排序</a>
      <a href='javascript:;'>最新商品</a>
      <a href='javascript:;'>最高人气</a>
      <a href='javascript:;'>评论最多</a>
      <a href='javascript:;'>
        价格排序
        <i class='arrow up' />
        <i class='arrow down' />
      </a>
    </div>
    <div class='check'>
      <c-checkbox v-model='subSortSearch.inventory'>仅显示有货商品</c-checkbox>
      <c-checkbox v-model='subSortSearch.onlyDiscount'>仅显示特惠商品</c-checkbox>
    </div>
  </div>
</template>
<script>
import CCheckbox from '@/components/library/c-checkbox'
import { reactive } from 'vue'

export default {
  name: 'SubSort',
  components: { CCheckbox },
  setup() {
    const subSortSearch = reactive({
      inventory: false, // 是否有库存
      onlyDiscount: false // 只显示特惠
    })
    return {
      subSortSearch
    }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;

      &.active {
        background: @mainColor;
        border-color: @mainColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @mainColor;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @mainColor;
          }
        }
      }
    }
  }

  .check {
    .c-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
