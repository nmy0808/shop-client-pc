<template>
  <div class='cart-sku' ref='target'>
    <div class='attrs' @click='handToggle()'>
      <span class='ellipsis'>{{ attrsText }}</span>
      <i class='iconfont icon-angle-down'></i>
    </div>
    <div class='layer' v-if='visible'>
      <div v-if='loading' class='loading'></div>
      <GoodsSku v-else @change='changeSku' :skuId='skuId' :goodDetail='goodsCopy' />
      <CButton @click='submit' v-if='!loading' type='primary' size='mini' style='margin-left:60px'>确认</CButton>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getGoodSkuApi } from '@/api'
import { useStore } from 'vuex'

export default {
  name: 'CartSku',
  components: {},
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    },
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const visible = ref(false)
    const loading = ref(false)
    const goodsCopy = ref(null)
    const target = ref(null)
    const store = useStore()
    const currentSku = ref(null)
    const handToggle = () => {
      visible.value = !visible.value
    }
    const handHide = () => {
      visible.value = false
    }
    const changeSku = (newSku) => {
      if (!newSku.skuId) {
        currentSku.value = null
        return
      }
      const params = {}
      params.oldSkuId = props.skuId
      params.newSku = newSku
      currentSku.value = params
    }
    watch(visible, async (val) => {
      if (!goodsCopy.value) {
        loading.value = true
        await getGoodSku(props.skuId)
        loading.value = false
      }
      if (val) {
        currentSku.value = null
      }
    })
    const submit = () => {
      if (currentSku.value !== null) {
        store.dispatch('cart/updateCartSku', currentSku.value)
      }
      handHide()
    }
    onClickOutside(target, handHide)

    /**
     * 根据skuId 获取商品信息
     * @param skuId
     * @returns {Promise<void>}
     */
    async function getGoodSku(skuId) {
      const { specs, skus } = await getGoodSkuApi({ id: skuId })
      goodsCopy.value = JSON.parse(JSON.stringify(props.goods))
      goodsCopy.value.specs = specs
      goodsCopy.value.skus = skus
    }

    return { target, visible, changeSku, goodsCopy, loading, handToggle, handHide, submit }
  }
}
</script>
<style scoped lang='less'>
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;

  .attrs {
    line-height: 24px;
    display: flex;

    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }

    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }

  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @mainColor;
    box-shadow: 2px 2px 4px lighten(@mainColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @mainColor;
      border-top: 1px solid @mainColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8, 1) rotate(45deg);
    }

    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
