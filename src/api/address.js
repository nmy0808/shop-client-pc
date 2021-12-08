import request from '@/uitls/request'

/**
 * 获取收货地址列表
 * @returns {*}
 */
export function getAddressListApi() {
  return request.get('/member/address')
}

/**
 * 更新收货地址
 * @param data 收货地址
 * @returns {*}
 */
export function updateAddressApi(data) {
  return request.put('/member/address/' + data.id, { ...data })
}

/**
 * 添加收货地址
 * @param address {Object} 详情看api文档
 * @returns {*}
 */
export function insertAddressApi(address) {
  return request.post('/member/address', address)
}

/**
 * 删除收货地址
 * @returns {string} 收货地址id
 */
export function deleteAddressApi(id) {
  return request.delete('/member/address/' + id)
}
