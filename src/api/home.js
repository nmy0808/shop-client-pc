import request from '@/uitls/request'

/**
 * 首页-热门品牌
 * @param {String|Number} limit 数量限制
 * @returns {Promise}
 */
export function getHotBrandsApi (limit) {
  return request.get('/home/brand', { limit })
}

/**
 * 首页-广告区域(pc-小程序)
 * @returns {*}
 */
export function getBannersApi () {
  return request.get('/home/banner')
}

/**
 * 首页-新鲜好物
 * @returns {*}
 */
export function getNewApi () {
  return request.get('/home/new')
}
/**
 * 首页-人气推荐
 * @returns {*}
 */
export function getHotApi () {
  return request.get('/home/hot')
}

/**
 * 首页-产品区块
 * @returns {*}
 */
export function getGoodsApi () {
  return request.get('/home/goods')
}

/**
 * 首页-最新专题
 * @returns {*}
 */
export function getSpecialApi () {
  return request.get('/home/special')
}
