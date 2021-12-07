<template>
  <div class='c-cart-page'>
    <div class='container'>
      <CBread>
        <CBreadItem to='/'>首页</CBreadItem>
        <CBreadItem>购物车</CBreadItem>
      </CBread>
      <div class='cart'>
        <table>
          <thead>
          <tr>
            <th width='120'>
              <CCheckbox :model-value='isSelectAll' @change='handleSelectAllValid'>全选</CCheckbox>
            </th>
            <th width='400'>商品信息</th>
            <th width='220'>单价</th>
            <th width='180'>数量</th>
            <th width='180'>小计</th>
            <th width='140'>操作</th>
          </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
          <tr v-for='item in validList' :key='item.skuId'>
            <td>
              <CCheckbox :model-value='item.selected' @change='(flag)=>handleChangeValidItem(flag,item)' />
            </td>
            <td>
              <div class='goods'>
                <RouterLink :to='{name:"product", params:{id:item.id}}'>
                  <img :src='item.picture'
                       alt=''>
                </RouterLink>
                <div>
                  <p class='name ellipsis'>{{ item.name }}</p>
                  <!-- 选择规格组件 -->
                  <cart-sku :sku-id='item.skuId' :attrsText='item.attrsTest' :goods='item' />
                </div>
              </div>
            </td>
            <td class='tc'>
              <p>&yen;{{ item.nowPrice }}</p>
              <p v-if='item.price - item.nowPrice >= 0'>比加入时降价 <span class='red'>&yen;{{ item.price - item.nowPrice
                }}</span></p>
            </td>
            <td class='tc'>
              <CNumbox :max='item.stock' :model-value='item.count'
                       @update:modelValue='(num)=>handleChangeItemNum(num,item)' />
            </td>
            <td class='tc'><p class='f16 red'>&yen;{{ (Math.round(item.nowPrice * item.count * 100) / 100).toFixed(2)
              }}</p></td>
            <td class='tc'>
              <p><a href='javascript:;'>移入收藏夹</a></p>
              <p><a @click='handleDeleteItem(item)' class='green' href='javascript:;'>删除</a></p>
              <p><a href='javascript:;'>找相似</a></p>
            </td>
          </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
          <tr>
            <td colspan='6'><h3 class='tit'>失效商品</h3></td>
          </tr>
          <tr v-for='item in invalidList' :key='item'>
            <td>
              <CCheckbox @change='(flag)=>handleChangeInvalidItem(flag,item)' style='color:#eee;' />
            </td>
            <td>
              <div class='goods'>
                <RouterLink :to='{name:"product", params:{id:item.id}}'><img
                  src='https://yanxuan-item.nosdn.127.net/13ab302f8f2c954d873f03be36f8fb03.png'
                  alt=''></RouterLink>
                <div>
                  <p class='name ellipsis'>和手足干裂说拜拜 ingrams手足皲裂修复霜</p>
                  <p class='attr'>颜色：粉色 尺寸：14cm 产地：中国</p>
                </div>
              </div>
            </td>
            <td class='tc'><p>&yen;200.00</p></td>
            <td class='tc'>1</td>
            <td class='tc'><p>&yen;200.00</p></td>
            <td class='tc'>
              <p><a class='green' href='javascript:;'>删除</a></p>
              <p><a href='javascript:;'>找相似</a></p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class='action'>
        <div class='batch'>
          <!--          validList.length === validTotal-->
          <CCheckbox :model-value='isSelectAll' @change='handleSelectAllValid'>全选</CCheckbox>
          <a href='javascript:;' @click='handleClearCartList'>删除商品</a>
          <a href='javascript:;'>移入收藏夹</a>
          <a href='javascript:;' @click='handleClearInvalidCartList'>清空失效商品</a>
        </div>
        <div class='total'>
          共 {{ validTotal }} 件商品，已选择 {{ selectedTotal }} 件，商品合计：
          <span class='red'>¥{{ selectedAmount }}</span>
          <CButton type='primary' @click='$router.push({name: "pay-checkout"})'>下单结算</CButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant'
import { computed } from 'vue'
import { useStore } from 'vuex'
import CartSku from '@/views/cart/components/cart-sku'

export default {
  name: 'CCartPage',
  components: { CartSku, GoodRelevant },
  setup() {
    const store = useStore()
    const validList = computed(() => store.getters['cart/validList'])
    const invalidList = computed(() => store.getters['cart/invalidList'])
    // 有效商品总数
    const validTotal = computed(() => store.getters['cart/validTotal'])
    // 有效商品总价
    const validAmount = computed(() => store.getters['cart/validAmount'])
    // 已选中商品列表
    const selectedList = computed(() => store.getters['cart/selectedList'])
    // 已选中商品总价
    const selectedAmount = computed(() => store.getters['cart/selectedAmount'])
    // 已选中商品总数
    const selectedTotal = computed(() => store.getters['cart/selectedTotal'])
    // 已选中商品总数
    const isSelectAll = computed(() => store.getters['cart/isSelectAll'])

    // 事件: 有效全选
    const handleSelectAllValid = (flag) => {
      store.dispatch('cart/updateCartAll', flag)
    }
    // 事件: 改变单一有效商品的状态
    const handleChangeValidItem = (flag, item) => {
      store.dispatch('cart/updateCart', { ...item, selected: !item.selected })
    }
    // 事件: 改变单一无效商品的状态
    const handleChangeInvalidItem = (flag, item) => {
      store.dispatch('cart/updateCart', { ...item, selected: !item.selected })
    }
    // 事件: 改变商品数量
    const handleChangeItemNum = (num, item) => {
      store.dispatch('cart/updateCart', { ...item, count: num })
    }
    // 事件: 删除商品
    const handleDeleteItem = (item) => {
      store.dispatch('cart/deleteCart', item)
    }
    // 事件: 删除所有选中商品
    const handleClearCartList = () => {
      store.dispatch('cart/deleteCartAll', 'valid')
    }
    // 事件: 清除无效商品
    const handleClearInvalidCartList = () => {
      store.dispatch('cart/deleteCartAll', 'invalid')
    }
    return {
      validList,
      invalidList,
      validTotal,
      validAmount,
      selectedList,
      selectedAmount,
      isSelectAll,
      selectedTotal,
      handleSelectAllValid,
      handleChangeValidItem,
      handleChangeInvalidItem,
      handleChangeItemNum,
      handleDeleteItem,
      handleClearCartList,
      handleClearInvalidCartList
    }
  }
}
</script>
<style scoped lang='less'>
.tc {
  text-align: center;

  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}

.red {
  color: @priceColor;
}

.green {
  color: @mainColor
}

.f16 {
  font-size: 16px;
}

.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;

    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}

.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;

  .xtx-checkbox {
    color: #999;
  }

  .batch {
    a {
      margin-left: 20px;
    }
  }

  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}

.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}

.c-cart-page {
  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th, td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
