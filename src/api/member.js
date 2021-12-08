import request from '@/uitls/request'

/**
 * 获取收藏列表
 * @returns {Object} {page,pageSize,collectType}
 */
export const getCollectApi = (params) => {
  return request.get('/member/collect', params)
}
/**
 * 获取我的足迹
 * @returns {Object} {page,pageSize}
 */
export const getBrowseHistoryApi = (params) => {
  return request.get('/member/browseHistory', params)
}
