<template>
  <div class='xtx-goods-page'>
    <div class='container' v-if='goodDetail'>
      <!-- 面包屑 -->
      <CBread>
        <CBreadItem to='/'>首页</CBreadItem>
        <CBreadItem :to='{name:"category", params: {id:goodDetail.categories[1].id }}'>{{ goodDetail.categories[1].name
          }}
        </CBreadItem>
        <CBreadItem :to='{name:"categorySub", params: {id:goodDetail.categories[0].id }}'>
          {{ goodDetail.categories[0].name }}
        </CBreadItem>
        <CBreadItem>{{ goodDetail.name }}</CBreadItem>
      </CBread>
      <!-- 商品信息 -->
      <div class='goods-info'>
        <div class='media'>
          <!--商品图片-->
          <goods-image :images='goodDetail.mainPictures'></goods-image>
          <goods-sales></goods-sales>
        </div>
        <div class='spec'>
          <!--标题,城市-->
          <good-name :good-detail='goodDetail'></good-name>
          <goods-sku :good-detail='goodDetail' @change='handleChangeSku'></goods-sku>
          <c-numbox label='数量' v-model='num' :max='goodDetail.inventory'></c-numbox>
          <c-button type='primary'
                    @click='handleInsertCart'
                    style='margin-top: 20px;'>加入购物车
          </c-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class='goods-footer'>
        <div class='goods-article'>
          <!-- 商品+评价 -->
          <div class='goods-tabs'>
            <goods-tabs></goods-tabs>
          </div>
          <!-- 商品详情 -->
          <!-- 注意事项 -->
          <div class='goods-warn'>
            <goods-warn></goods-warn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class='goods-aside'>
          <goods-hot :type='1'></goods-hot>
          <goods-hot :type='2'></goods-hot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from '@/views/goods/components/goods-image'
import GoodsSales from '@/views/goods/components/goods-sales'
import GoodName from '@/views/goods/components/goods-name'
import GoodsSku from '@/components/library/goods-sku'
import GoodsTabs from '@/views/goods/components/goods-tabs'
import GoodsHot from '@/views/goods/components/goods-hot'
import GoodsWarn from '@/views/goods/components/goods-warn'
import { computed, provide, reactive, ref, watchEffect } from 'vue'
import { getGoodDetailApi, getGoodEvaluateApi, getGoodEvaluatePageApi } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import message from '@/components/library/message'
import { useStore } from 'vuex'

export default {
  name: 'GoodsPage',
  components: { GoodsWarn, GoodsHot, GoodsTabs, GoodsSku, GoodName, GoodsSales, GoodsImage, GoodsRelevant },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const goodDetail = ref(null)
    const id = ref(null)
    const currentSku = ref(null)
    provide('goodDetail', goodDetail)
    // 商品数量
    const num = ref(1)
    // 初始化请求数据
    watchEffect(async () => {
      goodDetail.value = null
      num.value = 1
      id.value = route.params.id
      if (route.name !== 'product' || id.value === 'undefined' || !id.value) return
      goodDetail.value = await getGoodDetailApi({ id: id.value })
    })
    // 事件: sku改变触发
    const handleChangeSku = (sku) => {
      goodDetail.value.price = sku.price
      goodDetail.value.oldPrice = sku.oldPrice
      goodDetail.value.inventory = sku.inventory
      currentSku.value = sku
    }
    const handleInsertCart = () => {
      if (!currentSku.value) {
        return message.warn({ text: '请先选择商品规格' })
      }
      if (num.value > currentSku.value.inventory) {
        return message.warn({ text: '超过库存, 请重新选择' })
      }
      // id skuId name picture price nowPrice count attrsTest selected stock isEffective
      const good = goodDetail.value
      const { id, name, mainPictures, price, inventory: stock } = good
      const { specsText: attrsTest, skuId } = currentSku.value
      // 商品图片
      let picture = null
      if (mainPictures && Array.isArray(mainPictures) && mainPictures.length > 0) {
        picture = mainPictures[0]
      }
      const param = {
        id,
        skuId,
        name,
        picture,
        price,
        nowPrice: price,
        count: num.value,
        attrsTest,
        stock,
        selected: true,
        isEffective: true
      }
      store.dispatch('cart/insertCart', param).then(res => {
        message.success({ text: '添加成功' })
        // router.push({ name: 'cart' })
      })
    }
    return {
      goodDetail,
      handleChangeSku,
      num,
      handleInsertCart
    }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
