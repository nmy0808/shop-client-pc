<template>
  <!-- 筛选区 -->
  <div class='sub-filter'>
    <div class='item'>
      <div class='head'>品牌</div>
      <div class='body'>
        <a href='javascript:;'
           :class='{active: item.selected}'
           @click='handleChangeBrand(item)'
           v-for='item in calcBrands' :key='item.id'>
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class='item' v-for='item in calcSaleProperties' :key='item.id'>
      <div class='head'>{{ item.name }}</div>
      <div class='body'>
        <a href='javascript:;'
           :class='{active: prop.selected}'
           @click='handleChangeProp(item,prop)'
           v-for='prop in item.properties' :key='prop.id'>
          {{ prop.name }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, watch } from 'vue'

export default {
  name: 'SubFilter',
  props: {
    brands: {
      type: Array,
      default: () => []
    },
    saleProperties: {
      type: Array,
      default: () => []
    }
  },
  emits: ['filter-change'],
  setup(props, { emit }) {
    const filterSearch = reactive({
      brandId: null,
      attrs: [
        // {
        //   groupName: null,
        //   propertyName: null
        // }
      ]
    })
    // 带有激活状态的
    const calcBrands = computed(() => {
      const copy = JSON.parse(JSON.stringify(props.brands))
      copy.unshift({ id: null, name: '全部' })
      const target = copy.find(item => item.id === filterSearch.brandId)
      target && (target.selected = true)
      return copy
    })
    const calcSaleProperties = computed(() => {
      const copy = JSON.parse(JSON.stringify(props.saleProperties))
      copy.forEach(item => item.properties.unshift({ id: null, name: '全部', selected: true }))
      filterSearch.attrs.forEach(i => {
        copy.forEach(j => {
          // 匹配是否有选中的筛选类
          if (j.name === i.groupName) {
            // 找到该类中匹配的prop
            const result = j.properties.find(item => item.name === i.propertyName)
            if (result) {
              // 先清空该类内所有prop选中状态
              j.properties.forEach(prop => {
                prop.selected = false
              })
              // 增加该prop的选中样式
              result.selected = true
            }
          }
        })
      })
      return copy
    })
    // 点击事件
    const handleChangeBrand = (brand) => {
      filterSearch.brandId = brand.id
    }
    const handleChangeProp = (parent, item) => {
      const attr = filterSearch.attrs.find(item => item.groupName === parent.name)
      if (attr) {
        attr.propertyName = item.name
      } else {
        filterSearch.attrs.push({
          groupName: parent.name,
          propertyName: item.name
        })
      }
    }
    // 监听并向外发送事件
    watch(filterSearch, () => {
      const copy = JSON.parse(JSON.stringify(filterSearch))
      const attrs = copy.attrs.filter(item => item.propertyName !== '全部')
      emit('filter-change', { ...copy, attrs })
    })
    return {
      calcBrands,
      calcSaleProperties,
      handleChangeBrand,
      handleChangeProp,
      filterSearch
    }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @mainColor;
        }
      }
    }
  }
}
</style>
