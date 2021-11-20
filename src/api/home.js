import request from '@/uitls/request'

/**
 * 首页-热门品牌
 * @param {String|Number} limit 数量限制
 * @returns {Promise}
 */
export function getHotBrandsApi (limit) {
  return request.get('/home/brand', { limit })
}
