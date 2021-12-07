import request from '@/uitls/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfoApi = () => {
  return request.get('/member/order/pre')
}
