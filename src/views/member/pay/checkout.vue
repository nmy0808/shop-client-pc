<template>
  <div class='c-pay-checkout-page'>
    <div class='container'>
      <CBread>
        <CBreadItem to='/'>首页</CBreadItem>
        <CBreadItem to='/cart'>购物车</CBreadItem>
        <CBreadItem>填写订单</CBreadItem>
      </CBread>
      <div class='wrapper'>
        <!-- 收货地址 -->
        <h3 class='box-title'>收货地址</h3>
        <div class='box-body'>
          <checkout-address />
        </div>
        <!-- 商品信息 -->
        <h3 class='box-title'>商品信息</h3>
        <div class='box-body'>
          <table class='goods'>
            <thead>
            <tr>
              <th width='520'>商品信息</th>
              <th width='170'>单价</th>
              <th width='170'>数量</th>
              <th width='170'>小计</th>
              <th width='170'>实付</th>
            </tr>
            </thead>
            <tbody v-if='goods'>
            <tr v-for='item in goods' :key='item.skuId'>
              <td>
                <a href='javascript:;' class='info'>
                  <img :src='item.picture' alt=''>
                  <div class='right'>
                    <p>{{ item.name }}</p>
                    <p>{{ item.attrsText }}</p>
                  </div>
                </a>
              </td>
              <td>&yen;{{ item.price }}</td>
              <td>{{ item.count }}</td>
              <td>&yen;{{ item.totalPrice }}</td>
              <td>&yen;{{ item.totalPayPrice }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class='box-title'>配送时间</h3>
        <div class='box-body'>
          <a class='my-btn active' href='javascript:;'>不限送货时间：周一至周日</a>
          <a class='my-btn' href='javascript:;'>工作日送货：周一至周五</a>
          <a class='my-btn' href='javascript:;'>双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class='box-title'>支付方式</h3>
        <div class='box-body'>
          <a class='my-btn active' href='javascript:;'>在线支付</a>
          <a class='my-btn' href='javascript:;'>货到付款</a>
          <span style='color:#999'>货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class='box-title'>金额明细</h3>
        <div class='box-body' v-if='summary'>
          <div class='total'>
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class='price'>¥{{ summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class='submit'>
          <CButton @click='submitOrder' type='primary'>提交订单</CButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckoutAddress from '@/views/member/pay/components/checkout-address'
import { findCheckoutInfoApi, findCheckoutInfoByOrderApi, submitOrderApi } from '@/api/order'
import { computed, provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import message from '@/components/library/message'
import { useStore } from 'vuex'

export default {
  name: 'CPayCheckoutPage',
  components: { CheckoutAddress },
  setup() {
    const order = ref(null)
    // 商品列表
    const goods = ref(null)
    // 金额明细
    const summary = ref(null)
    // 地址列表
    const userAddresses = ref(null)
    // order参数: {goods, summary, userAddresses}
    provide('order', order)
    provide('getOrderInfo', getOrderInfo)
    const router = useRouter()
    const store = useStore()
    // 初始化获取订单信息
    getOrderInfo()
    // 点击提交订单并跳转
    const submitOrder = async () => {
      const addressId = userAddresses.value?.find(it => it.isDefault === 0)?.id
      if (!addressId) {
        message.warn({ text: '请选择一个默认地址' })
        return
      }
      const params = {}
      params.addressId = addressId
      // [{skuId,count}, ...]
      params.goods = JSON.parse(JSON.stringify(goods.value)).map(it => ({ skuId: it.skuId, count: it.count }))
      params.deliveryTimeType = 1
      params.payType = 1
      params.payChannel = 1
      params.buyerMessage = ''
      const { id: orderId } = await submitOrderApi(params)
      if (orderId) {
        // 清除购物车
        store.commit('cart/setCart', [])
        router.push({ name: 'pay', query: { orderId } })
      }
    }

    /**
     * 获取收货地址列表
     * @returns {Promise<void>}
     */
    async function getOrderInfo() {
      // route: 获取当前 orderId
      const orderId = router.currentRoute.value.query.orderId
      // 判断: 当前地址栏是否有orderId, 如果有就是再次购买
      if (orderId) {
        // 请求: 根据orderID获取订单信息
        order.value = await findCheckoutInfoByOrderApi(orderId)
      } else {
        // 请求: 根据当前选中商品获取订单信息
        order.value = await findCheckoutInfoApi()
      }
      goods.value = order.value.goods
      summary.value = order.value.summary
      userAddresses.value = order.value.userAddresses
    }

    return {
      goods,
      summary,
      submitOrder
    }
  }
}
</script>
<style scoped lang='less'>
.c-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: @mainColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td, th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active, &:hover {
    border-color: @mainColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
