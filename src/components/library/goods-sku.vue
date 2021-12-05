<template>
  <div class='goods-sku'>
    <!--    disabled | selected -->
    <dl v-for='item in specs' :key='item.name'>
      <dt>{{ item.name }}</dt>
      <dd>
        <template
          v-for='val in item.values'
          :key='val.name'>
          <img
            @click='handleSpecSelect(item,val)'
            :class='{selected:val.selected, disabled:val.disabled}'
            v-if='val.picture'
            :src='val.picture' :title='val.name'
          />
          <span
            @click='handleSpecSelect(item,val)'
            :class='{selected:val.selected, disabled:val.disabled}'
            v-else>
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import { computed, inject, reactive, ref } from 'vue'
import bwPowerSet from '@/vender/power-set'

const SPLITER = '☆'
export default {
  name: 'GoodsSku',
  props: {
    skuId: {
      type: String,
      default: ''
    },
    goodDetail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { specs, skus } = props.goodDetail
    // sku路径字典
    const calcSkus = reactive({})
    // 当前选中的规格
    const filterSelected = reactive([])
    // 初始化sku路径字典
    initSkuMap()
    // 初始化prop的skuid
    initSkuSelectedById()

    // 事件: 选择规格
    const handleSpecSelect = (group, item) => {
      const index = specs.findIndex(it => it.name === group.name)
      if (item.disabled) {
        return
      }
      if (item.selected) {
        item.selected = false
        filterSelected[index] = undefined
        judgeSpecState()
        emit('change', {})
        return
      }
      // 排它
      group.values.forEach(it => {
        it.selected = false
      })
      item.selected = true
      filterSelected[index] = item.name
      judgeSpecState()
      // 向父级传值
      if (specs.length === filterSelected.length) {
        const skuIds = calcSkus[filterSelected.join(SPLITER)]
        if (!skuIds) return
        const skuId = skuIds[0]
        const sku = skus.find(it => it.id === skuId)
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      }
    }

    // 如果用户传入了skuId, 则初始化默认选中
    function initSkuSelectedById() {
      if (props.skuId) {
        const sku = skus.find(it => it.id === props.skuId)
        const currentSpecs = sku.specs
        currentSpecs.forEach(it => {
          const target = specs.find(s => s.name === it.name).values.find(val => val.name === it.valueName)
          target.selected = true
        })
      }
    }

    // 初始化sku路径字典
    function initSkuMap() {
      const arr = skus.filter(item => item.inventory > 0)
      arr.forEach(item => {
        const target = item.specs.map(it => it.valueName)
        const calc = bwPowerSet(target)
        calc.forEach(it => {
          const key = it.join(SPLITER)
          if (Array.isArray(calcSkus[key])) {
            calcSkus[key].push(item.id)
          } else {
            calcSkus[key] = [item.id]
          }
        })
      })
      judgeSpecState()
    }

    // 判断当前所有规格的状态
    function judgeSpecState() {
      specs.forEach((item, index) => {
        const cp = [...filterSelected]
        item.values.forEach(it => {
          if (it.selected) return
          cp[index] = it.name
          const key = cp.filter(cp => cp).join(SPLITER)
          if (calcSkus[key]) {
            it.disabled = false
          } else {
            it.disabled = true
          }
        })
      })
    }

    return {
      specs,
      handleSpecSelect
    }
  }
}
</script>
<style scoped lang='less'>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @mainColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
