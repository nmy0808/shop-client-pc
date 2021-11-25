import request from '@/uitls/request'

/**
 * 根据商品id获取商品详情
 * @param params {Object} { id:string }
 * @returns {Promise}
 */
export function getGoodDetailApi(params) {
  return request.get('/goods', params)
}

/**
 * 同类推荐(也支持猜你喜欢)
 * @param params  {Object} { id:string 商品ID, limit: number 数量限制 }
 * @returns {Promise}
 */
export function getGoodRelevantWithLikeApi(params) {
  return request.get('/goods/relevant', params)
}

/**
 * 商品热销推荐
 * @param params  {Object} { id:string 商品ID, limit: number 数量限制, type:热销类型，1为24小时，2为周榜，3为总榜，默认为1 }
 * @returns {Promise}
 */
export function getGoodHotApi(params = { type: 1 }) {
  return request.get('/goods/relevant', params)
}

/**
 * 商品的评价信息
 * @param  {Object} {id :商品ID}
 * @returns {Promise}
 */
export function getGoodEvaluateApi({ id }) {
  return request.get(`/goods/${id}/evaluate`, {}, { mock: true })
}

/**
 * 评价分页数据
 * @param {Object}   详情见api文档
 * @returns {Promise}
 */
export function getGoodEvaluatePageApi({ id, ...params }) {
  return request.get(`/goods/${id}/evaluate/page`, params, { mock: true })
}

/**
 * 商品信息-sku
 * @param {String}  商品id
 * @returns {Promise}
 */
export function getGoodSkuApi({ id }) {
  return request.get(`/goods/sku/${id}`, {})
}
