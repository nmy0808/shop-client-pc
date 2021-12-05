import request from '@/uitls/request'

/**
 * 获取购物车列表
 * @returns {*}
 */
export function getCartListApi() {
  return request.get('/member/cart', {})
}

/**
 * 增加购物车
 * @returns {*}
 */
export function insertCartApi({ skuId, count }) {
  return request.post('/member/cart', { skuId, count })
}

/**
 * 合并购物车
 * @returns {*}
 */
export function mergeCartApi(data) {
  return request.post('/member/cart/merge', data)
}

/**
 * 删除购物车
 * @returns {*}
 */
export function deleteCartApi(ids) {
  return request.delete('/member/cart', { ids })
}

/**
 * 更新购物车
 * @param skuId
 * @param selected
 * @param count
 * @returns {*}
 */
export function updateCartApi({ skuId, selected, count }) {
  return request.put('/member/cart/' + skuId, { selected, count })
}
