import request from '@/uitls/request'

/**
 * 获取购物车列表
 * @returns {*}
 */
export function getCartListApi() {
  return request.get('/home/brand', {})
}
