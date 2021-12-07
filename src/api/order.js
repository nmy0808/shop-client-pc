import request from '@/uitls/request'

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
