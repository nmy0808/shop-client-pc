<template>
  <div class='detail-action' v-if='orderInfo'>
    <div class='state'>
      <span class='iconfont icon-order-unpay'></span>
      <p>{{ orderStatus[orderInfo.orderState].label }}</p>
    </div>
    <div class='info'>
      <p>订单编号：{{ orderInfo.id }}</p>
      <p>下单时间：{{ orderInfo.createTime }}</p>
    </div>
    <div class='btn'>
      <div class='btn'>
        <!-- 待付款 -->
        <template v-if='orderInfo.orderState === 1'>
          <CButton @click="$router.push({name:'pay',query:{orderId:orderInfo.id}})" type='primary' size='small'>立即付款
          </CButton>
          <CButton type='gray' size='small' @click='handleCancel'>取消订单</CButton>
        </template>
        <!-- 待发货 -->
        <template v-if='orderInfo.orderState === 2'>
          <CButton type='primary' size='small'>再次购买</CButton>
        </template>
        <!-- 待收货 -->
        <template v-if='orderInfo.orderState === 3'>
          <CButton type='primary' size='small'>确认收货</CButton>
          <CButton type='plain' size='small'>再次购买</CButton>
        </template>
        <!-- 待评价 -->
        <template v-if='orderInfo.orderState === 4'>
          <CButton type='primary' size='small'>再次购买</CButton>
          <CButton type='plain' size='small'>评价商品</CButton>
          <CButton type='gray' size='small'>申请售后</CButton>
        </template>
        <!-- 已完成 -->
        <template v-if='orderInfo.orderState === 5'>
          <CButton type='primary' size='small'>再次购买</CButton>
          <CButton type='plain' size='small'>查看评价</CButton>
          <CButton type='gray' size='small'>申请售后</CButton>
        </template>
        <!-- 已取消 -->
      </div>
    </div>
  </div>
</template>
<script>

import { inject } from 'vue'
import { orderStatus } from '@/api/constants'

export default {
  name: 'OrderDetailAction',
  emits: ['cancel-order'],
  setup(props, { emit }) {
    // inject: 订单详情
    const orderInfo = inject('orderInfo')
    // 事件: 取消订单
    const handleCancel = () => {
      emit('cancel-order', orderInfo.value)
    }
    return {
      orderInfo,
      orderStatus,
      handleCancel
    }
  }
}
</script>
<style scoped lang='less'>
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;

  .state {
    width: 220px;
    text-align: center;

    .iconfont {
      font-size: 40px;
      color: @mainColor;
    }

    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }

  .info {
    width: 240px;
    line-height: 30px;

    p {
      color: #999;
    }
  }

  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;

    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
