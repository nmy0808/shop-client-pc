<template>
  <div class='sub-sort'>
    <div class='sort'>
      <a href='javascript:;' :class='{active: subSortSearch.sortField === null}'
         @click='handleFieldChange(null)'>默认排序</a>
      <a href='javascript:;' :class='{active: subSortSearch.sortField === "publishTime"}'
         @click='handleFieldChange("publishTime")'>最新商品</a>
      <a href='javascript:;' :class='{active: subSortSearch.sortField === "orderNum"}'
         @click='handleFieldChange("orderNum")'>最高人气</a>
      <a href='javascript:;' :class='{active: subSortSearch.sortField === "evaluateNum"}'
         @click='handleFieldChange("evaluateNum")'>评论最多</a>
      <a href='javascript:;' :class='{active: subSortSearch.sortField === "price"}' @click='handleFieldChange("price")'>
        价格排序
        <i class='arrow up'
           :class='{active: subSortSearch.sortMethod === "desc"}'
        />
        <i class='arrow down'
           :class='{active: subSortSearch.sortMethod === "asc"}'
        />
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
import { reactive, watch } from 'vue'

export default {
  name: 'SubSort',
  components: { CCheckbox },
  emits: ['sort-change'],
  setup(props, { emit }) {
    const subSortSearch = reactive({
      inventory: false, // 是否有库存
      onlyDiscount: false, // 只显示特惠
      sortField: null, // 排序字段，取值范围：[publishTime,orderNum,price,evaluateNum]
      sortMethod: null // 排序规则，asc为正序，desc为倒序，默认为desc
    })
    const PRICE_TYPE = ['desc', 'asc']
    const handleFieldChange = (rule) => {
      if (rule === 'price' && subSortSearch.sortField === 'price') {
        const method = PRICE_TYPE.find(item => item !== subSortSearch.sortMethod)
        subSortSearch.sortMethod = method
      }
      if (rule === 'price' && subSortSearch.sortField !== 'price') {
        subSortSearch.sortMethod = 'asc'
      }
      if (rule !== 'price') {
        subSortSearch.sortMethod = null
      }
      subSortSearch.sortField = rule
    }
    // 监听排序对象改变
    watch(subSortSearch, () => {
      emit('sort-change', JSON.parse(JSON.stringify(subSortSearch)))
    })
    return {
      subSortSearch,
      handleFieldChange
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
            border-bottom-color: #fff;
          }
        }

        &.down {
          top: 15px;
          border-top-color: #bbb;

          &.active {
            border-top-color: #fff;
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
