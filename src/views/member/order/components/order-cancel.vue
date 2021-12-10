<template>
  <CDialog title='取消订单'
           v-model='visibleDialog'
           @cancel='handleCancel'
           @confirm='handleConfirm'
  >
    <!-- 组件内容 -->
    <div class='cancel-info'>
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class='tip'>请选择取消订单的原因（必选）：</p>
      <div class='btn'>
        <!--        .active  -->
        <a
          v-for='item in cancelReason'
          :key='item'
          href='javascript:;'
          @click='handleSelectedText(item)'
          :class='{active: currText === item}'
        >
          {{ item }}
        </a>
      </div>
    </div>
  </CDialog>
</template>
<script>
import { inject, ref } from 'vue'
import { cancelReason } from '@/api/constants'
import message from '@/components/library/message'
import { cancelOrderApi } from '@/api/order'
import confirm from '@/components/library/confirm'

export default {
  name: 'OrderCancel',
  emits: ['cancel-order'],
  setup() {
    // reject: 修改订单状态
    const setOrderSate = inject('setOrderSate')
    // 属性: 显示
    const visibleDialog = ref(false)
    // 属性: 当前选择的退货原因
    const currText = ref('')
    // 属性: 当前order
    const order = ref(null)
    // 方法: 打开窗口
    const open = (orderInfo) => {
      order.value = orderInfo
      visibleDialog.value = true
    }
    // 事件: 选择退货原因
    const handleSelectedText = (item) => {
      currText.value = item
    }
    // 事件: 关闭窗口
    const handleCancel = () => {
      currText.value = ''
    }
    // 事件: 确认退货
    const handleConfirm = async () => {
      // 判断: 是否选择退款原因
      if (!currText.value) {
        return message.warn({ text: '请选择退货原因' })
      }
      // 对象: 请求取消订单的参数对象
      const params = {}
      params.id = order.value.id
      params.cancelReason = currText.value
      // 请求: 取消订单
      const cancelOrder = await cancelOrderApi(params)
      // reject: 修改订单状态
      setOrderSate(cancelOrder)
      message.success({ text: '订单取消成功' })
      currText.value = ''
    }
    return {
      cancelReason,
      visibleDialog,
      currText,
      open,
      handleCancel,
      handleConfirm,
      handleSelectedText
    }
  }
}
</script>
<style scoped lang='less'>
.c-dialog ::v-deep .wrapper {
  width: 620px;
}

.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;

    &.tip {
      color: #999;
    }
  }

  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;

    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;

      &:nth-child(2n) {
        margin-right: 0;
      }

      &:hover, &.active {
        background-color: #e3f9f4;
        border-color: @mainColor;
      }
    }
  }
}
</style>
