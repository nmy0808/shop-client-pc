import request from '@/uitls/request'

export function getCategoryListApi() {
  return request.get('/home/category/head')
}

// 根据id获取一级类目
export function getTopCategoryApi(id) {
  return request.get('/category', { id })
}

// 根据id获取二级类目-筛选条件
export function getSubCategoryApi(id) {
  return request.get('/category/sub/filter', { id })
}

// 商品列表--分页查询 具体参数在文档 (目前是临时api)
export function getGoodsByFilterApi(filter) {
  return request.post('/category/goods/temporary', filter)
}
