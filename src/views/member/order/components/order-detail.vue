<template>
  <div class='order-detail'>
    <order-detail-action @cancel-order='handleDeleteOrder' />
    <order-info />
    <teleport to='body'>
      <order-cancel ref='cancelCom' />
    </teleport>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { deleteOrderApi, getOrderInfoByIdApi } from '@/api/order'
import { provide, ref } from 'vue'
import OrderDetailAction from '@/views/member/order/components/detail-action'
import OrderInfo from '@/views/member/order/components/order-info'
import OrderCancel from '@/views/member/order/components/order-cancel'
import Confirm from '@/components/library/confirm'

export default {
  name: 'order-list',
  components: { OrderCancel, OrderInfo, OrderDetailAction },
  setup() {
    const route = useRoute()
    // 值: 订单ID
    const orderId = route.params.id
    // 对象: 订单详情
    const orderInfo = ref(null)
    // provide: 订单详情
    provide('orderInfo', orderInfo)
    // provide: 设置订单状态
    provide('setOrderSate', setOrderSate)
    // 组件: 取消订单
    const cancelCom = ref(null)
    // 初始化: 获取订单详情
    getOrderInfo()
    // 事件: 删除订单
    const handleDeleteOrder = (order) => {
      cancelCom.value.open(order)
    }

    // 请求: 获取订单详情
    async function getOrderInfo() {
      orderInfo.value = await getOrderInfoByIdApi({ id: orderId })
    }

    // provide: 设置订单状态
    function setOrderSate(order) {
      orderInfo.value = order
    }

    return {
      orderInfo,
      cancelCom,
      handleDeleteOrder
    }
  }
}
</script>

<style scoped>
.order-detail {
  background: white;
}
</style>
