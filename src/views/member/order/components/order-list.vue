<template>
  <div class='order-list'>
    <order-item
      :order='item'
      v-for='item in list'
      :key='item.id'
      @cancel-order='handleCancelOrder'
      @delete-order='handleDeleteOrder'
      @find-logistics='handleFindLogistics'
    />
    <teleport to='body'>
      <order-cancel ref='cancelCom' />
      <order-logistics ref='logCom' />
    </teleport>
  </div>
</template>
<script>
import OrderItem from '@/views/member/order/components/order-item'
import OrderCancel from '@/views/member/order/components/order-cancel'
import Confirm from '@/components/library/confirm'
import { inject, ref } from 'vue'
import { deleteOrderApi } from '@/api/order'
import OrderLogistics from '@/views/member/order/components/order-logistics'

export default {
  name: 'order-list',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: { OrderLogistics, OrderCancel, OrderItem },
  setup() {
    // reject: 获取订单列表
    const findOrderList = inject('findOrderList')
    // 获取组件: 取消dialog组件
    const cancelCom = ref(null)
    // 获取组件: 物流dialog组件
    const logCom = ref(null)
    // 事件: 打开取消订单弹窗
    const handleCancelOrder = (order) => {
      cancelCom.value.open(order)
    }
    // 事件: 删除订单
    const handleDeleteOrder = (order) => {
      Confirm({ title: '删除订单', text: '确认删除订单吗?' })
        .then(async (res) => {
          // 请求: 删除该订单
          await deleteOrderApi([order.id])
          // 请求: 获取最新订单列表
          findOrderList()
        })
        .catch(res => {
        })
    }
    // 事件: 查看物流
    const handleFindLogistics = (order) => {
      logCom.value.open(order)
    }
    return {
      cancelCom,
      logCom,
      handleCancelOrder,
      handleDeleteOrder,
      handleFindLogistics
    }
  }
}
</script>
<style lang='less' scoped>
.order-list {
  background: #fff;
  padding: 20px;
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: @mainColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: @priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: @mainColor;
          }
        }
      }
    }
  }
}
</style>
