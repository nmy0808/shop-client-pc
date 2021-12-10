import request from '@/uitls/request'
// 订单api
/**
 * 获取结算信息
 */
export const findCheckoutInfoApi = () => {
  return request.get('/member/order/pre')
}
/**
 * 提交订单
 * @returns {*}
 */
export const submitOrderApi = (params) => {
  return request.post('/member/order', params)
}

/**
 * 根据id查看订单详情
 * @param {Object} id
 * @returns {*}
 */
export const getOrderInfoByIdApi = ({ id }) => {
  return request.get('/member/order/' + id, {})
}

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const findOrderListApi = ({ orderState, page, pageSize }) => {
  return request.get('/member/order', { orderState, page, pageSize })
}
