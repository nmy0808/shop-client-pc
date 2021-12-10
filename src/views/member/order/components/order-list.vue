<template>
  <div class='order-list'>
    <order-item :order='item' v-for='item in list' :key='item.id'
                @open-cancel-dialog='handleOpenCancel'
    />
    <teleport to='body'>
      <order-cancel ref='cancelCom' />
    </teleport>
  </div>
</template>
<script>
import OrderItem from '@/views/member/order/components/order-item'
import OrderCancel from '@/views/member/order/components/order-cancel'
import { ref } from 'vue'

export default {
  name: 'order-list',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: { OrderCancel, OrderItem },
  setup() {
    const cancelCom = ref(null)
    // 事件: 打开取消订单弹窗
    const handleOpenCancel = (order) => {
      cancelCom.value.open(order)
    }
    return {
      cancelCom,
      handleOpenCancel
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
