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
    <order-list></order-list>
  </div>
</template>

<script>
import CTabs from '@/components/library/c-tab'
import CTabsPanel from '@/components/library/c-tab-panel'
import { ref } from 'vue'
import OrderList from '@/views/member/order/components/order-list'

export default {
  name: 'order-home',
  components: { OrderList, CTabsPanel, CTabs },
  setup() {
    const currentMenu = ref('all')
    //
    const handleMenuChange = ({ name, index }) => {
      console.log(name, index)
    }
    return {
      currentMenu,
      handleMenuChange
    }
  }
}
</script>

<style scoped>

</style>
