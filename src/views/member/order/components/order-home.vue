<template>
  <div>
    <c-tabs v-model='currentMenu' @change='handleMenuChange'>
      <CTabsPanel name='all' label='全部订单'>全部订单</CTabsPanel>
      <CTabsPanel name='unpay' label='待付款'>待付款</CTabsPanel>
      <CTabsPanel name='deliver' label='待发货'>待发货</CTabsPanel>
      <CTabsPanel name='receive' label='待收货'>待收货</CTabsPanel>
      <CTabsPanel name='comment' label='待评价'>待评价</CTabsPanel>
      <CTabsPanel name='complete' label='已完成'>已完成</CTabsPanel>
      <CTabsPanel name='cancel' label='已取消'>已取消</CTabsPanel>
    </c-tabs>
  </div>
  <div>
    <order-list :list='list' @currentChange='handlePageChange'></order-list>
  </div>
  <c-pagination v-if='total'
                :total='total'
                :current-page='listParams.page'
                @currentChange='handlePageChange' />
</template>

<script>
import CTabs from '@/components/library/c-tab'
import CTabsPanel from '@/components/library/c-tab-panel'
import { provide, ref, watch } from 'vue'
import OrderList from '@/views/member/order/components/order-list'
import CPagination from '@/components/library/c-pagination'
import { findOrderListApi } from '@/api/order'

export default {
  name: 'order-home',
  components: { CPagination, OrderList, CTabsPanel, CTabs },
  setup() {
    // provide: 设置订单项的状态
    provide('setOrderSate', setOrderSate)
    // provide: 获取订单列表
    provide('findOrderList', findOrderList)
    const currentMenu = ref('all')
    // orderState 订单状态: 1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
    // 获取订单列表参数对象
    const listParams = ref({
      orderState: 0,
      page: 1,
      pageSize: 10
    })
    const total = ref(0)
    // 属性: 订单列表
    const list = ref(null)

    // 初始化订单列表
    findOrderList()

    // 监听params变化
    watch(listParams, () => {
      findOrderList()
    }, { deep: true })

    // 事件: 切换tab标签
    const handleMenuChange = ({ name, index }) => {
      listParams.value.orderState = index
      listParams.value.page = 1
    }
    // 事件: 切换分页
    const handlePageChange = (page) => {
      listParams.value.page = page
    }

    // 请求: 获取订单列表
    async function findOrderList() {
      const { items, counts } = await findOrderListApi(listParams.value)
      list.value = items
      total.value = counts
    }

    // provide: 设置当前某一订单的状态
    function setOrderSate(order) {
      const target = list.value.find(it => it.id === order.id)
      if (target) {
        target.orderState = order.orderState
      }
    }

    return {
      currentMenu,
      total,
      list,
      handleMenuChange,
      handlePageChange,
      listParams
    }
  }
}
</script>

<style scoped>

</style>
